import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { SettingsPage } from '../pages/settings/settings';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';

import {AddressPage} from '../pages/address/address';
import {NotificationPage} from '../pages/notification/notification';
import {PrintingPage} from '../pages/JobPrinting/Printing';
import {EnquiriesPage} from '../pages/Enquiries/Enquiries';
import {ResponedPage} from '../pages/Responed/responed';
import {ResponsesPage} from '../pages/Responses/Responses'
import { ModulesPage} from '../pages/Modules/Modules';
import {ByePage} from '../pages/Bye/Bye';
import {PaymentPage} from '../pages/Payment/Payment';
import {JobSelectionPage } from '../pages/JobSelection/JobSelection';
import {JobOffsetPage } from '../pages/JobOffset/JobOffset';

import { TermsOfServicePage } from '../pages/terms-of-service/terms-of-service';
import { PrivacyPolicyPage } from '../pages/privacy-policy/privacy-policy';

import { PreloadImage } from '../components/preload-image/preload-image';
import { BackgroundImage } from '../components/background-image/background-image';
import { ShowHideContainer } from '../components/show-hide-password/show-hide-container';
import { ShowHideInput } from '../components/show-hide-password/show-hide-input';
import { ColorRadio } from '../components/color-radio/color-radio';
import { CounterInput } from '../components/counter-input/counter-input';
import { Rating } from '../components/rating/rating';

import {ServiceHelper} from  '../services/serviceHelper';
import {LoginService} from '../services/loginService'

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {} from  '@ionic-native/core'
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {IonicStorageModule} from '@ionic/storage';
import {CallNumber} from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ProfilePage,
    TabsNavigationPage,
    SettingsPage,
    SignupPage,
    ForgotPasswordPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    AddressPage,
    NotificationPage,
    PrintingPage,
    ResponedPage,
    EnquiriesPage,
    ResponsesPage,
    ModulesPage,
    ByePage,
    PaymentPage,
    JobSelectionPage,
    JobOffsetPage,

    PreloadImage,
    BackgroundImage,
    ShowHideContainer,
    ShowHideInput,
    ColorRadio,
    CounterInput,
    Rating
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ProfilePage,
    TabsNavigationPage,
    SettingsPage,
    ForgotPasswordPage,
    SignupPage,
    TermsOfServicePage,
    PrivacyPolicyPage,
    AddressPage,
    NotificationPage,
    PrintingPage,
    ResponedPage,
    EnquiriesPage,
    ResponsesPage,
    ModulesPage,
    ByePage,
    PaymentPage,
    JobSelectionPage,
    JobOffsetPage

  ],
  providers: [
    ServiceHelper,
    LoginService,
    CallNumber,
    SplashScreen, 
    StatusBar,
    InAppBrowser
    ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
