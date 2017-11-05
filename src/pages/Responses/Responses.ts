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
  storeData: Array<ResponsesModel> = [];
  previusShort:number;
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
    this.LoadResponses(1);
  }
doRefresh(refresher:any){
  this.LoadResponses(this.previusShort);
  this._refresher=refresher;
}
LoadResponses(value:number)
{
   this.serviceHelper
      .GetViews(this.CreateEnquiriesRequest())
      .then(response => {
        this.storeData= response.Value.Data;
        this.responses.responses = this.ShortData(value);
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
        if (!AppCommon.IsCordovaAvailable()) {
          return false;
        }
        await this.call.callNumber(String(item.MobileNo),true);
    }
    catch(e)
    {
        console.error(e);
    }
    
  }
   onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

   onSegmentSelected(value:number){
    this.loading.present();
    this.ShortData(value)
    setTimeout(()=>{this.DummyLoding();},500);
  }
  DummyLoding()
  {
      this.loading.dismiss();
      this.loading = this.loadingCtrl.create();
  }
  ShortData(value:number): Array<ResponsesModel>
  {
    let temData: Array<ResponsesModel> = [];
    if(value==1){
       temData = this.storeData.sort((n1,n2) => {
          let date1 =n1.ReceivedDate.split("/");
          let date2 =n2.ReceivedDate.split("/");
          let dateCount1  =new Date(parseInt(date1[2]),parseInt(date1[1]),parseInt(date1[0])).getTime();//;n1.ReceivedDate.split("/");
          let dateCount2 = new Date(parseInt(date2[2]),parseInt(date2[1]),parseInt(date2[0])).getTime();

          if (dateCount1 > dateCount2) {
              return 1;
          }
           if (dateCount1 < dateCount2) {
              return -1;
          }
          return 0;
      });
    }else{
      temData = this.storeData.sort((n1,n2) => {
          if (n1.ReceivedCost > n2.ReceivedCost) {
              return 1;
          }
            if (n1.ReceivedCost < n2.ReceivedCost) {
              return -1;
          }
          return 0;
      });
    }
   this.previusShort=value;
    return temData;
  }
}
