import { Component } from '@angular/core';
import { NavController, SegmentButton,ModalController, AlertController ,LoadingController } from 'ionic-angular';
import 'rxjs/Rx';

import { EnquiriesModel ,EnquiryModel} from './Enquiries.model';
import {PrintingPage } from'../JobPrinting/Printing';
import {JobOffsetPage} from '../JobOffset/JobOffset';
import {ResponsesPage } from'../Responses/Responses';
import {JobSelectionPage} from '../JobSelection/JobSelection';
import {ServiceHelper} from '../../services/serviceHelper';
import {JobGetsRequest} from '../../model/JobRequest';
import {JobType,ViewsType} from '../../model/appenums';

@Component({
  selector: 'enquiries-page',
  templateUrl: 'Enquiries.html'
})
export class EnquiriesPage {
  segment: string;
  
  enquiries: EnquiriesModel = new EnquiriesModel();
  loading: any;
  printingPage : { component: any };
  responsesPage : { component: any };
  jobOffsetPage :{component:any};
  jobSelectionPage :{component:any};

   connctionErrorCount:number=0;
  constructor(
    public nav: NavController,
    public serviceHelper: ServiceHelper,
    public loadingCtrl: LoadingController,
    public modal: ModalController,
    public alertCtrl: AlertController,
  ) {
    this.segment = "Active";
    this.loading = this.loadingCtrl.create();
    this.printingPage = { component: PrintingPage };
     this.responsesPage = { component: ResponsesPage };
     this.jobSelectionPage ={component : JobSelectionPage};
     this.jobOffsetPage ={component:JobOffsetPage};
  }
  ionViewWillEnter() {
    this.loading.present();
    this.serviceHelper
      .GetViews(this.CreateEnquiriesRequest())
      .then(response => {
         this.enquiries.enquiries = response.Value.Data;
        // this.enquiries.responded = data.responded;
        this.loading.dismiss();
        this.loading = this.loadingCtrl.create();
      },error => this.OnError(error));
  }
 private CreateEnquiriesRequest():JobGetsRequest
 {
    let request = new JobGetsRequest();
    request.JobType=JobType.ViewDocument;
    request.ViewId= ViewsType.ViewEnquiries;
    return request;
 }
  onActiveItemClick(item: EnquiryModel)
  {
    this.GoToJobPage(item);
  }
  GoToJobPage(item: EnquiryModel)
  {
     switch(item.JobTypeId){
        case JobType.ScreenPrinting:
          this.nav.push(this.printingPage.component,{id:item.Id});
        break;
        case JobType.OffsetPrinting:
          this.nav.push(this.jobOffsetPage.component,{id:item.Id});
        break;
     }
  }
  public OnError(error:any)
  {
    this.loading.dismiss();
    if(this.connctionErrorCount==0)
      this.ShowAlert("Error",error.message);
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
  onResponsesClick(item:EnquiryModel)
  {
    let currentJob={
      "JobTypeId":item.Id,
      "JobType":item.JobTypeId
    };
    this.nav.push(this.responsesPage.component,{"curentJob":currentJob});
  }
  onSelectJobType()
  {
    this.nav.push(this.jobSelectionPage.component);
  }
  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

}
