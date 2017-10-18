import { Component } from '@angular/core';
import { NavController, SegmentButton, LoadingController ,AlertController} from 'ionic-angular';
import 'rxjs/Rx';

import { NotificationModel ,NotificationList} from './notification.model';
import {JobGetsRequest} from '../../model/JobRequest';
import {JobType,ViewsType,Operators} from '../../model/appenums';
import {PrintingPage } from'../JobPrinting/Printing';
import {JobOffsetPage} from '../JobOffset/JobOffset';
import {ServiceHelper} from '../../services/serviceHelper';
import { Filter} from '../../model/datasource.model';
import {Msg,MsgType} from '../../app.config'
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
  connctionErrorCount:number=0;
 
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
  }
ionViewWillEnter()
{
    this.loading.present();
    setTimeout(()=>{this.LoadNotification();},500);
}
doRefresh(event:any){
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
         this.notifications.notifications = response.Value.Data;
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
     }
  }
  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: boolean) {
    this.loading.present();
    this.GetNotifications(segmentButton);
    // console.log('Segment selected', segmentButton.value);
  }

}
