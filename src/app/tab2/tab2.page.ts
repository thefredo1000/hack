import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import * as firebaseRef from 'firebase';
import { AngularFirestore,  AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, tap, map } from 'rxjs/operators';
import { TapticEngine } from '@ionic-native/taptic-engine/ngx';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PercentPipe } from '@angular/common';
// import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 0,
        height: 0
      })),
      state('closed', style({
        opacity: 1,
      })),
      transition('open => closed', [
        animate('.5s')
      ]),
      transition('closed => open', [
        animate('0.1s')
      ]),
    ]),
  ]
})

export class Tab2Page {
  collectionRef: AngularFirestoreDocument<any>;
  result$: Observable<any>;

  isOpen = false;
  isError = false;

  title: any;
  result: any;
  percentage: any;

  doc: any;
  isDisplayed = false;


  image: string;
  constructor(
    // public storage: Storage,
    private firestore: AngularFirestore,
    private platform: Platform,
    public camera: Camera,
    public loadingController: LoadingController,
    public taptic : TapticEngine
    ) {
      this.image = "./assets/eye-disease.png"
      
      // set a key/value
      
      
      // storage.get('name').then((val) => {
      //   val.array.forEach(element => {
      //     console.log(element)
      //   });
      // });
  }

  error(){
    this.isError = !this.isError;
  }
  async listenToData(key){
    const loading = await this.loadingController.create({
      message: 'Processing Image',
    });

    loading.present();
    this.collectionRef = this.firestore.collection("Results").doc(key);
    this.result$ = this.collectionRef.valueChanges().pipe(
      filter(data => !!data),
        tap((data) => {
          loading.dismiss();
          this.result = data.Results
          this.percentage = data.Threshold
         // this.percentage = (Math.round(this.percentage * 100)) + "%"
          if (this.result == "404" || this.result == ""){
            this.isError = true;
          }
          // else {
          //   this.storage.set(key, {
          //     Threshold: data.Threshold,
          //     Result: data.Results
          //   });
          // }
        }),
    );
    // this.value$ = this.collectionRef.valueChanges()
    // this.value$.subscribe(data=>{
    //   this.result = data.Results
    //   this.percentage = data.Threshold
    // })
  }
  open() {
    this.isOpen = false;
    this.isError = false;
    this.openGallery().then((image: any) => {
      this.image = image;
      this.post();
    });
  }
  async post() {
    const docID = this.firestore.createId();
    const loading = await this.loadingController.create({
      message: 'Uploading Image',
    });
    await loading.present();

    this.postPicture(this.image, '', docID).then((url: string) => {
      this.image = url;
      loading.dismiss();
      this.listenToData(docID);
      this.isOpen = true;
      // ESTO ES UN DESMADRE PERO DE AQUI EN ADELANTE SOLO TRABAJARA EN COSAS ESTETICAS
      this.taptic.impact({
        style: "heavy" // light | medium | heavy
      });
      this.title = "Results";
      this.result = "DISEASE_NAME"
      this.percentage = "PERCENTAGE"
    }).catch(err => {
      this.error ()
    });
  }

  openGallery() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    return new Promise((success, reject) => {
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        let base64Image = null;
        if (this.platform.is('ios')) {
          base64Image = 'data:image/jpeg;base64,' + imageData;
        } else {
          base64Image = imageData;
        }
        return success(base64Image);
      }).catch((err) => {
        console.log(err);
      });
    })
  };
  postPicture(url, path, key) {

    return new Promise((resolve, reject) => {
      const storageRef = firebaseRef.storage().ref().child(path).child(key);
      
      // this.doc = {
      //   key: {
      //     disease : "mi amor",
      //     percentage: 3
      //   }
      // }
      // this.firestore.collection("Results").add(this.doc)
      if (this.platform.is('ios')) {
        let parseUpload = storageRef.putString(url, firebaseRef.storage.StringFormat.DATA_URL);
        parseUpload.then(() => {
          return resolve(storageRef.getDownloadURL());
        }).catch((error) => {
          return reject(error);
        });
      } else {
        let parseUpload = storageRef.putString(url, 'base64', { contentType: 'image/jpeg' });
        parseUpload.then(() => {
          return resolve(storageRef.getDownloadURL());
        }).catch((error) => {
          return reject(error);
        });
      }
    });
  }
}
