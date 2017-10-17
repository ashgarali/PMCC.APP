
import { Component } from '@angular/core';
import { NavController, SegmentButton, AlertController,Platform ,LoadingController,NavParams} from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {ThemeableBrowser} from '@ionic-native/themeable-browser'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {ServiceHelper} from '../../services/serviceHelper'
import {Status} from '../../model/status.model';
import {InItPayment} from '../../model/JobRequest'
import { counterRangeValidator } from '../../components/counter-input/counter-input';
import {Storage} from '@ionic/storage';
import {StoreKey,AppConfig} from '../../app.config';


@Component({
  selector: 'payment-page',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  loading:any;
  paymentOptions:InItPayment;
  private authKey :string;
  private errorMsg :string="Auth error";
  private isError :boolean =true;
constructor(
   public nav: NavController,
   public alertCtrl: AlertController,
   private iab: InAppBrowser,
   private loadingCtrl:LoadingController,
   private serviceHelper:ServiceHelper,
   public navParams :NavParams,
   private storage :Storage ,
 //  private themeableBrowser: ThemeableBrowser
     ) {
      this.loading = loadingCtrl.create();
      this.paymentOptions = this.navParams.get('payment');
       this.storage.get(StoreKey.AuthKey)
      .then((value) => this.authKey=value)
      .catch(() => {this.errorMsg = "Auntaction key not found!",this.isError=true});  
}
ionViewWillEnter()
{
    // this.loading.present();
    // this.serviceHelper
    //   .PaymentInIt(this.paymentOptions)
    //   .then(response => {
    //     this.loading.dismiss();
       this.LoadPayment();
    //   });
}
LoadPayment(){
  
  let options = {
			statusbar: {
				color: '#ffffffff'
			},
			toolbar: {
				height: 44,
				color: '#FF7A05'
			},
			title: {
				color: '#003264ff',
				showPageTitle: true
			},
			closeButton: {
				wwwImage: 'assets/img/close.png',
				wwwImageDensity: 2,
				align: 'left',
				event: 'closePressed'
			},
			menu: {
				wwwImage: 'assets/img/menu.png',
				wwwImageDensity: 2,
				align: 'right',
				title: 'Test',
				cancel: 'Cancel',
				items: [
					{
						event: 'helloPressed',
						label: 'Hello World!'
					},
					{
						event: 'testPressed',
						label: 'Test!'
					}
				]
			},
			backButtonCanClose: true
		};

	

// var pageContent = '<html><head></head><body>'+ status.FormData +'<script type="text/javascript">document.getElementById("PostForm").submit();</script></body></html>';
// var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);

let params=  "amount="+ this.paymentOptions.Amount+ "&Pinfo="+this.paymentOptions.ProductInfo+"&PIds="+this.paymentOptions.ProductIds.toString()+"&months="+this.paymentOptions.Months+"&auth="+this.authKey;
	//let browser = this.themeableBrowser.create( AppConfig.BaseUrl +'views/payU.html?'+params, '_blank', options);
 const browser = this.iab.create(
   AppConfig.BaseUrl +'views/payU.html?'+params,
   '_self',
   {location:'yes'}
  ); 
// var browserRef = window.cordova.InAppBrowser.open(
//     pageContentUrl ,
//     "_blank",
//     "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
// );
  
     //   const browser = this.iab.create('http://localhost:44300/views/pay.html','_self',{location:'no'}); 

        // browser.on("aa").subscribe(
        //  () => {
        //         console.log("Success");
        //         browser.close();
        //     },
        //     err => {
        //         console.log("InAppBrowser loadstart Event Error: " + err);
        //     }
        // );

}
 createEvent(){
  }
  onRespondClick()
  {
  }
}