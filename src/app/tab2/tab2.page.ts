import { Component } from '@angular/core';
import { AngularFireStorageModule } from '@angular/fire/storage';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private storage: AngularFireStorageModule) {}

}
