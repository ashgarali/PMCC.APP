import { Component } from '@angular/core';
import { NavController, SegmentButton, LoadingController ,AlertController} from 'ionic-angular';
import 'rxjs/Rx';

import { NotificationModel ,NotificationList} from './notification.model';
import {JobGetsRequest} from '../../model/JobRequest';
import {JobType,ViewsType,Operators} from '../../model/appenums';
import {PrintingPage } from'../JobPrinting/Printing';
import {JobOffsetPage} from '../JobOffset/JobOffset';
import {BindingPage } from '../JobBinding/Binding';
import {DtpPage} from '../JobDTP/Dtp';
import {ICardPage} from '../JobICard/ICard';
import {FlexPage } from '../JobFlex/Flex';
import {ServiceHelper} from '../../services/serviceHelper';
import { Filter} from '../../model/datasource.model';
import {Msg,MsgType,AppConfig} from '../../app.config'
import {ModulesPage} from '../Modules/Modules';
import { Localstorage } from "../../services/storageService";
import {StoreKey} from '../../app.config';
import {LoginPage} from '../login/login';
@Component({
  selector: 'notification-page',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  segment: string;
  notifications: NotificationList = new NotificationList();
  loading: any;
  printingPage : { component: any };
  jobOffsetPage :{component:any};
  jobBindingPage:{component:any};
  jobdtpPage:{component:any};
  jobICardPage: {component:any};
  jobFlexPage:{component:any};
  modulesPage : { component: any };
  rootPage: any = LoginPage;
  connctionErrorCount:number=0;
  showBuyPanal:boolean =false;
  _refresher:any;
  _infiniteScroll:any;
  startIndex:number=0;
  lastLoadType:boolean=false;
  _gotoLogin=false;
  constructor(
    public nav: NavController,
    public serviceHelper: ServiceHelper,
    public loadingCtrl: LoadingController,
     public alertCtrl: AlertController,
     public storage:Localstorage
  ) {
    this.segment = "Active";
    this.loading = this.loadingCtrl.create();
    this.printingPage = { component: PrintingPage };
    this.jobOffsetPage ={component:JobOffsetPage};
     this.jobBindingPage ={component:BindingPage};
     this.jobdtpPage ={component:DtpPage};
     this.jobICardPage ={component:ICardPage};
     this.jobFlexPage = { component:FlexPage};
     this.modulesPage={component:ModulesPage};
     this.serviceHelper.LoadSessionKey();
     this.storage.GetValues(StoreKey.AuthKey)
      .then(
        (value) => {
           if(value==null){
              this.storage.ClearStorage();
              this.nav.setRoot(this.rootPage);
           }else
            {
                this.LoadViewWillEnter();
            }
        }
      );
  }
LoadViewWillEnter()
{
    this.startIndex=0;
    this.loading.present();
    this.notifications= new NotificationList();
    setTimeout(()=>{this.LoadNotification();},1000);
}
doRefresh(){
  this.startIndex=0;
  this.loading.present();
  this.notifications= new NotificationList();
  this.GetNotifications( this.lastLoadType);
}
doInfinite(infiniteScroll){
 this._refresher=infiniteScroll;
 this.GetNotifications(this.lastLoadType);
}
LoadNotification()
{
  this.GetNotifications();
}
public GetNotifications(isresponed:boolean=false)
{
   this.lastLoadType=isresponed;
    this.serviceHelper
      .GetViews(this.CreateNotificationsRequest(isresponed))
      .then(response => {
        if(response.Status==false){
          this.ShowAlert(MsgType.ErrorType,response.Message);
          this.loading.dismiss();
          this.loading = this.loadingCtrl.create();
          if(response.Message=="Invalid userid/password.")
          {
            this._gotoLogin =true;
          }
          return;
        }

        let didGetData=false;
        for(let note of response.Value.Data) {
            this.notifications.notifications.push(note);
            didGetData=true;
        }
          if(didGetData)
            this.startIndex +=AppConfig.RecordCount;
         if(!isresponed)
            this.showBuyPanal = response.Value.ResponedStatus==false?true:false;
        if(this._refresher!=undefined){
          this._refresher.complete();
          this._refresher=undefined;
        }
        this.loading.dismiss();
        this.loading = this.loadingCtrl.create();
      },error => this.OnError(error));
}
 public OnError(error:any)
  {
    this.loading.dismiss();
    if(this.connctionErrorCount==0)
      this.ShowAlert(MsgType.ErrorType,error.message);
    if(error.status==0)
      this.connctionErrorCount++;
    this.loading = this.loadingCtrl.create();
     if(this._refresher!=undefined)
          this._refresher.complete();
  }
  ShowAlert(title:string,msg:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.connctionErrorCount=0;
          if(this._gotoLogin)
            {
               this.storage.ClearStorage();
               this.nav.setRoot(this.rootPage);
            }
        }
      }]
    });
    alert.present();
  }
private CreateNotificationsRequest(isresponed:boolean):JobGetsRequest
 {
    let request = new JobGetsRequest();
    request.JobType=JobType.ViewDocument;
    request.ViewId= ViewsType.ViewNotifications;
    request.StartIndex=this.startIndex+1;
    if(isresponed){
      request.Filters.push(new Filter("IsViewed",Operators.Equals,true))
    }else
    {
      request.Filters.push(new Filter("IsViewed",Operators.Equals,false))
    }
    return request;
 }
  GoToJobPage(item: NotificationModel)
  {
    if(!item.SubActive)
    {
      this.ShowAlert(MsgType.InfoType,"Your subscription of "+ item.JobTypeName +" has been expired. Please renew.")
      return false;
    }
     switch(item.JobType){
        case JobType.ScreenPrinting:
          this.nav.push(this.printingPage.component,{id:item.JobTypeId,isDisable:true});
        break;
        case JobType.OffsetPrinting:
          this.nav.push(this.jobOffsetPage.component,{id:item.JobTypeId,isDisable:true});
        break;
        case JobType.Binding:
          this.nav.push(this.jobBindingPage.component,{id:item.JobTypeId,isDisable:true});
        break;
        case JobType.DTP:
          this.nav.push(this.jobdtpPage.component,{id:item.JobTypeId,isDisable:true});
        break;
        case JobType.IdentityCard:
          this.nav.push(this.jobICardPage.component,{id:item.JobTypeId,isDisable:true});
        break;
        case JobType.FlexPrinting:
          this.nav.push(this.jobFlexPage.component,{id:item.JobTypeId,isDisable:true});
        break;
     }
  }
  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: boolean) {
    this.loading.present();
    this.notifications= new NotificationList();
    this.startIndex=0;
    this.GetNotifications(segmentButton);
    // console.log('Segment selected', segmentButton.value);
  }
   onAddModules(){
    this.nav.push(this.modulesPage.component);
  }

}
