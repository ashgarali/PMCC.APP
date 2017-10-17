
import { Component } from '@angular/core';
import { NavController, SegmentButton, AlertController,LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {ByePage} from '../Bye/Bye';
import { counterRangeValidator } from '../../components/counter-input/counter-input';
import {ServiceHelper} from '../../services/serviceHelper';
import {Modules,Module,Offers,Offer} from './Modules.model';
import { JobGetsRequest} from '../../model/JobRequest';
import {JobType,ViewsType,Operators} from '../../model/appenums';
import {Filter} from '../../model/datasource.model';

@Component({
  selector: 'modules-page',
  templateUrl: 'modules.html'
})
export class ModulesPage {
     byePage : { component: any };
     loading :any;
     modules :Modules = new Modules();
     byeList: Module[] =[];
     Total:string="0.00";
     Offer:string="0.00";
     GrandTotal:string="0.00";
     enableBye:boolean=false;
     offers:Offers = new Offers();

constructor(public nav: NavController, 
  public alertCtrl: AlertController,
  public serviceHelper:ServiceHelper,
  public loadingCtrl :LoadingController
) {
    this.byePage = { component: ByePage };
    this.loading = this.loadingCtrl.create();
}

ionViewWillEnter()
{
    this.loading.present();
    this.serviceHelper
      .GetViews(this.ModuleMasterRequest())
      .then(response => {
         this.modules.modules = response.Value.Data;
        this.loading.dismiss();
      });
    this.serviceHelper
      .GetOffers(true)
      .then(response => {
         this.offers.offers = response.Value;
      });
}
private ModuleMasterRequest():JobGetsRequest
 {
    let request = new JobGetsRequest();
    request.JobType=JobType.ViewDocument;
    request.ViewId= ViewsType.ViewModuleMaster;
    request.Filters.push(new Filter("IsUsed",Operators.Equals,false))//Used Models
    return request;
 }
 AddToBye(item:Module){
   this.byeList.push(item);
   this.byeList = this.byeList.filter(t => t.Checked ==true);
   this.CallTotal();
   this.enableBye=true;
  }
  CallTotal(){
    let total=0;
    this.byeList.forEach((item) => { 
           total += item.Cost;
        });
    this.Total=total.toFixed(2);
    this.Offer =this.CallOffer().toFixed(2);
    let grandTotal=parseFloat(this.Total)- parseFloat(this.Total)*(parseFloat(this.Offer)/100);
    this.GrandTotal =grandTotal.toFixed(2);
  }
  CallOffer():number
  {
    let offer=0;
    let count=this.byeList.length;
    this.offers.offers.forEach((item) => { 
          if(count >=item.OfferCount)
                offer=item.OfferPercentage;
        });
        return offer;
  }
  onByeClick()
  {
    this.nav.push(this.byePage.component,{list:this.byeList,pay:this.GrandTotal});
  }
}