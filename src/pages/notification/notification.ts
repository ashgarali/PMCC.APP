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
import {Msg,MsgType} from '../../app.config'
import {ModulesPage} from '../Modules/Modules';
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
  connctionErrorCount:number=0;
  showBuyPanal:boolean =false;
  _refresher:any;
  _infiniteScroll:any;
  startIndex:number=0;
  constructor(
    public nav: NavController,
    public serviceHelper: ServiceHelper,
    public loadingCtrl: LoadingController,
     public alertCtrl: AlertController,
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
  }
ionViewWillEnter()
{
    this.startIndex=0;
    this.loading.present();
    this.notifications= new NotificationList();
    setTimeout(()=>{this.LoadNotification();},1000);
}
doRefresh(refresher:any){
  this.startIndex=0;
  this.notifications= new NotificationList();
  this.LoadNotification();
  this._refresher=refresher;
}
doInfinite(infiniteScroll){
 this._refresher=infiniteScroll;
 this.LoadNotification();
}
LoadNotification()
{
  this.GetNotifications();
}
public GetNotifications(isresponed:boolean=false)
{
    this.serviceHelper
      .GetViews(this.CreateNotificationsRequest(isresponed))
      .then(response => {
        let didGetData=false;
        for(let note of response.Value.Data) {
            this.notifications.notifications.push(note);
            didGetData=true;
        }
          if(didGetData)
            this.startIndex +=5;
         if(!isresponed)
            this.showBuyPanal = this.notifications.notifications.length==0 ?true:false;
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
