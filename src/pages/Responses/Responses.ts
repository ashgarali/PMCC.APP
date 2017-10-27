import { Component } from '@angular/core';
import { NavController, SegmentButton, LoadingController,NavParams} from 'ionic-angular';
import 'rxjs/Rx';
import {Filter,Shorting} from '../../model/datasource.model';
import {JobType,ViewsType,Operators,SortingType} from '../../model/appenums';
import { ResponsesModel ,ResponsesList} from './Responses.model';
import {ServiceHelper} from '../../services/serviceHelper';
import {PrintingPage } from'../JobPrinting/Printing';
import {AppCommon} from '../../model/appcommon';
import {JobGetsRequest} from '../../model/JobRequest';
import {CallNumber} from '@ionic-native/call-number';
@Component({
  selector: 'responses-page',
  templateUrl: 'responses.html'
})
export class ResponsesPage {
  segment: string;
  responses: ResponsesList = new ResponsesList();
  loading: any;
  printingPage : { component: any };
  currentJob :any;
  _refresher:any;
  public currentRow:number;
  constructor(
    public nav: NavController,
    public serviceHelper: ServiceHelper,
    public loadingCtrl: LoadingController,
    public navParams :NavParams ,
    private call:CallNumber
  ) {
    this.segment = "Active";
    this.loading = this.loadingCtrl.create();
    this.printingPage = { component: PrintingPage };
    this.currentJob = this.navParams.get('curentJob');
  }

  ionViewDidLoad() {
    this.loading.present();
    this.LoadResponses();
  }
doRefresh(refresher:any){
  this.LoadResponses();
  this._refresher=refresher;
}
LoadResponses()
{
   this.serviceHelper
      .GetViews(this.CreateEnquiriesRequest())
      .then(response => {
        this.responses.responses = response.Value.Data;
        if(this._refresher!=undefined)
          this._refresher.complete();
        else
          this.loading.dismiss();
        this.loading = this.loadingCtrl.create();
      });
}
private CreateEnquiriesRequest():JobGetsRequest
 {
    let filter :Filter[]=[];
    filter.push(new Filter("JobTypeId ",Operators.Equals,this.currentJob.JobTypeId));
    filter.push(new Filter("JobType",Operators.Equals,this.currentJob.JobType));
    let request = new JobGetsRequest();
    request.JobType=JobType.ViewDocument;
    request.ViewId= ViewsType.ViewResponses;
    request.Filters=filter;
    return request;
 }
  ExpandResponse(resp:ResponsesModel)
  {
      if(this.currentRow !=resp.RowNo)
          this.currentRow=resp.RowNo;
      else
        this.currentRow=0;
  }
  async onCallNumber(item:ResponsesModel):Promise<any>
  {
    try{
        if (!this.IsCordovaAvailable()) {
          return false;
        }
        await this.call.callNumber(String(item.MobileNo),true);
    }
    catch(e)
    {
        console.error(e);
    }
    
  }
  private IsCordovaAvailable(){
    if (!(<any>window).cordova) {
      alert('This is a native feature. Please use a device');
      return false;
    }
    return true;
  }
  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }

}
