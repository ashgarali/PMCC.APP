import { Component } from '@angular/core';
import {Storage} from '@ionic/storage';
import {NavParams} from 'ionic-angular';
import {EnquiriesPage } from '../Enquiries/Enquiries';
import { ProfilePage } from '../profile/profile';
import { NotificationPage } from '../notification/notification';
import {ServiceHelper} from '../../services/serviceHelper';
import {StoreKey} from '../../app.config';
import {AppCommon} from '../../model/appcommon';

@Component({
  selector: 'tabs-navigation',
  templateUrl: 'tabs-navigation.html'
})

export class TabsNavigationPage {
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  currentTab:number=0;
  constructor(private storage:Storage, public serviceHelper: ServiceHelper,public navParams :NavParams,) {
    this.tab1Root = NotificationPage;
    this.tab2Root = EnquiriesPage;
    this.tab3Root =ProfilePage ;
    this.storage.get(StoreKey.AuthKey).then((val) => {
          console.log('Your key is', val);
         });
    let id = this.navParams.get('id');
    if(typeof id!='undefined' && id)
      this.currentTab=id;
  }
}
