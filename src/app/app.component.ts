import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { LoginPage } from '../pages/login/login';

import { SettingsPage } from '../pages/settings/settings';
import { EnquiriesPage } from '../pages/Enquiries/Enquiries';
import { ProfilePage } from '../pages/profile/profile';
import { Localstorage } from "../services/storageService";
import {StoreKey} from '../app.config';

@Component({
  selector: 'app-root',
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make LoginPage the root (or first) page
  rootPage: any ;// = TabsNavigationPage;//LoginPage;

  pages: Array<{title: string, icon: string, component: any,index:number}>;
  pushPages: Array<{title: string, icon: string, component: any}>;

  constructor(
    platform: Platform,
    public menu: MenuController,
    public app: App,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public storage:Localstorage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });
     this.storage.GetValues(StoreKey.AuthKey)
      .then(
        (value) => this.setRootPage(value) 
      );
    this.pages = [
      { title: 'Notifications', icon: 'notifications', component: TabsNavigationPage , index: 0 },
      { title: 'Enquiries', icon: 'apps', component: TabsNavigationPage ,index: 1 },
      { title: 'Account', icon: 'person', component: TabsNavigationPage ,index: 2 },
    ];

    this.pushPages = [
      { title: 'Settings', icon: 'settings', component: SettingsPage },
      
    ];
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component, {id:page.index});
  }

  pushPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
    this.app.getRootNav().push(page.component);
  }
  setRootPage(value:string)
  {
     if(value!=null)
        this.rootPage =TabsNavigationPage;
     else
        this.rootPage =LoginPage
  }
}
