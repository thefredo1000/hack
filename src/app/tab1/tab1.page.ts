import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  foo : any;
  imgUrl : string;
  constructor(public toastCtrl : ToastController) {
    this.foo = "pepe pica";
    this.imgUrl = "https://www.generadormemes.com/media/created/nn9px4aajz06ubdyvrahhnad151b0qlr3z8hi0n3ei82u2nhpt40g36ubnb04uf.jpg"
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    this.foo = 2;
    toast.present();
  }
  
}
