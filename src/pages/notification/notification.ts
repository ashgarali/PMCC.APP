import { Component } from '@angular/core';
import { NavController, SegmentButton, LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { NotificationModel ,NotificationList} from './notification.model';
import {JobGetsRequest} from '../../model/JobRequest';
import {JobType,ViewsType} from '../../model/appenums';
import {PrintingPage } from'../JobPrinting/Printing';
import {JobOffsetPage} from '../JobOffset/JobOffset';
import {ServiceHelper} from '../../services/serviceHelper';
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
  constructor(
    public nav: NavController,
    public serviceHelper: ServiceHelper,
    public loadingCtrl: LoadingController
  ) {
    this.segment = "Active";
    this.loading = this.loadingCtrl.create();
    this.printingPage = { component: PrintingPage };
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
public GetNotifications()
{
    this.serviceHelper
      .GetViews(this.CreateNotificationsRequest())
      .then(response => {
         this.notifications.notifications = response.Value.Data;
        this.loading.dismiss();
      });
}
private CreateNotificationsRequest():JobGetsRequest
 {
    let request = new JobGetsRequest();
    request.JobType=JobType.ViewDocument;
    request.ViewId= ViewsType.ViewNotifications;
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

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

}
