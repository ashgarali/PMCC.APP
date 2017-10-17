
import { Component } from '@angular/core';
import { NavController, SegmentButton, AlertController,LoadingController ,NavParams,ModalController} from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {PaymentPage} from '../Payment/Payment';
import { counterRangeValidator } from '../../components/counter-input/counter-input';
import {Module} from '../Modules/Modules.model';
import {ServiceHelper} from '../../services/serviceHelper';
import {Offers,Offer} from './Bye.modul';
import {InItPayment} from '../../model/JobRequest'
@Component({
  selector: 'bye-page',
  templateUrl: 'Bye.html'
})
export class ByePage {
    event_form: FormGroup;
    paymentPage : { component: any };
    moduleList:Module[] =[];
    loading:any;
    offers:Offers = new Offers();
    byeList:Module[] =[];
    grandTotal:string;
    payAmount:string;
    forMonths:number=1;
constructor(public nav: NavController,
   public alertCtrl: AlertController,
   public loadingCtrl :LoadingController,
   public serviceHelper:ServiceHelper,
   public navParams :NavParams ,
   public modal: ModalController
) {
    this.paymentPage = { component: PaymentPage };
    this.loading=loadingCtrl.create();
    this.byeList = this.navParams.get('list');
    this.grandTotal = parseFloat(this.navParams.get('pay')).toFixed(2);
}
ionViewWillEnter()
{
    this.loading.present();
    this.serviceHelper
      .GetOffers(false)
      .then(response => {
        this.offers.offers = response.Value;
        this.ShortArray();
        this.CallOfferValues();
        this.loading.dismiss();
      });
}
ShortArray(){
  this.offers.offers =this.offers.offers.sort((obj1, obj2) => {
            if (obj1.OfferCount > obj2.OfferCount) {
                return 1;
            }
            if (obj1.OfferCount < obj2.OfferCount) {
                return -1;
            }
            return 0;
        });
}
CallOfferValues()
{
   this.offers.offers.forEach(element => {
     let total =(parseFloat(this.grandTotal) *element.OfferCount);
     element.OfferCost = (total - (total* element.OfferPercentage/100 )).toFixed(2);
     if(element.OfferCount==1){
            element.Checked=true;
            this.payAmount=element.OfferCost;
     }
        
   });
}
OfferSelected(item:Offer)
{
  this.payAmount=item.OfferCost;
  this.forMonths=item.OfferCount;
}
GotoPaymentModal(){
    let initPayment = new InItPayment();
    initPayment.Amount= parseFloat(parseFloat(this.payAmount).toFixed(2));
    initPayment.Months =this.forMonths;
    initPayment.ProductIds=[];
    let productInfo=[];
    this.byeList.forEach(element => {
      initPayment.ProductIds.push(element.Id);
      productInfo.push(element.Name);
    });
    initPayment.ProductInfo=productInfo.toString();
    this.nav.push(this.paymentPage.component,{"payment":initPayment});
    //let modal = this.modal.create(PaymentPage,{"payment":initPayment});
    //modal.present();
  }
}
 