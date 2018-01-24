
import { Component,OnInit  } from '@angular/core';
import { NavController, SegmentButton, AlertController,Platform ,LoadingController,NavParams} from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {ThemeableBrowser} from '@ionic-native/themeable-browser'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {ServiceHelper} from '../../services/serviceHelper'
import {Status} from '../../model/status.model';
import {InItPayment} from '../../model/JobRequest'
import { counterRangeValidator } from '../../components/counter-input/counter-input';
import { Localstorage } from "../../services/storageService";
import {StoreKey,AppConfig} from '../../app.config';
import {AppCommon} from '../../model/appcommon';


@Component({
  selector: 'payment-page',
  templateUrl: 'payment.html'
})
export class PaymentPage implements OnInit {
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
   public storage:Localstorage ,
   private themeableBrowser: ThemeableBrowser
     ) {
      this.loading = loadingCtrl.create();
	  this.paymentOptions = this.navParams.get('payment');
	  this.storage.GetValues(StoreKey.AuthKey)
      .then(
		(value) => this.StartPayment(value)
      );
}
ngOnInit() {
	
}

StartPayment(value:string)
{
   this.authKey=value
  
  if(AppCommon.IsCordovaAvailable()){
        this.LoadPayment();
	}
	this.LoadPayment();
}
LoadPayment(){
  
  let options = {
			statusbar: {
				color: '#ffffffff'
			},
			toolbar: {
				height: 44,
				color: '#3ea3bd'
			},
			title: {
				color: '#ffffffff',
				showPageTitle: true
			},
			closeButton: {
				wwwImage: 'assets/images/close.png',
				wwwImageDensity: 2,
				align: 'left',
				event: 'closePressed'
      },
    //   menu: {
	// 			wwwImage: 'assets/images/menu.png',
	// 			wwwImageDensity: 2,
	// 			align: 'right',
	// 			title: 'Test',
	// 			cancel: 'Cancel',
	// 			items: [
	// 				{
	// 					event: 'helloPressed',
	// 					label: 'Hello World!'
	// 				},
	// 				{
	// 					event: 'testPressed',
	// 					label: 'Test!'
	// 				}
	// 			]
	// 		},
			backButtonCanClose: true
		};

		let productInfo=this.paymentOptions.ProductInfo.replace("&","");
		let params=  "amount="+ this.paymentOptions.Amount+ "&Pinfo="+productInfo+"&PIds="+this.paymentOptions.ProductIds.toString()+"&months="+this.paymentOptions.Months+"&auth="+this.authKey;
//Old options
//  const browser = this.iab.create(
//    AppConfig.BaseUrl +'views/payU.html?'+params,
//    '_self',
//    {location:'yes'}
//   ); 
//New options
 let browser = this.themeableBrowser.create(AppConfig.BaseUrl +'views/payU.html?'+params, '_blank', options);

// browser.on('helloPressed').subscribe(x => {
// 			alert('Hello button pressed');
// 		});

// 		browser.on('testPressed').subscribe(x => {
// 			alert('Test button pressed');
// 		});

}
}