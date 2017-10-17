
import { Component } from '@angular/core';
import { NavController, SegmentButton, AlertController ,LoadingController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import {PrintingPage} from '../JobPrinting/Printing';
import {JobOffsetPage} from '../JobOffset/JobOffset';
import {JobType} from '../../model/appenums';
import { counterRangeValidator } from '../../components/counter-input/counter-input';
import {ServiceHelper} from '../../services/serviceHelper';
import {Status} from '../../model/status.model';

@Component({
  selector: 'JobSelection-Page',
  templateUrl: 'JobSelection.html'
})
export class JobSelectionPage {
     printingPage : { component: any };
     jobOffsetPage :{component:any};
     populars:any;
     loading:any;

    connctionErrorCount:number=0;
    //  populars = [
    //     {
    //         "type":JobType.ScreenPrinting,
    //         "title": "Screen Printing",
    //         "image": "../assets/images/jobType/ScreenPrinting.jpg"
    //     },
    //     {
    //         "type":JobType.OffsetPrinting,
    //         "title": "Offset Printing",
    //         "image": "../assets/images/jobType/OffSetPrinting.jpg"
    //     },
    //     {
    //         "type":JobType.IdentityCard,
    //         "title": "Identity Card",
    //         "image": "../assets/images/jobType/IdentityCard.jpg"
    //     },
    //     {
    //         "type":JobType.Binding,
    //         "title": "Binding",
    //         "image": "../assets/images/jobType/Binding.jpg"
    //     },
    //     {
    //         "type":JobType.DTP,
    //         "title": "DTP",
    //         "image": "../assets/images/jobType/DTP.jpg"
    //     },
    //     {
    //         "type":JobType.FlexPrinting,
    //         "title": "Flex Printing",
    //         "image": "../assets/images/jobType/Flex.jpg"
    //     }
    // ];

constructor(public nav: NavController, 
    public alertCtrl: AlertController,
    public serviceHelper:ServiceHelper,
    public loadCtrl:LoadingController
) {

    this.loading =this.loadCtrl.create();
    this.printingPage = { component: PrintingPage };
    this.jobOffsetPage={component:JobOffsetPage};
    this.LoadModules();

}
 LoadModules()
 {
    this.loading.present();
    this.serviceHelper.GetModules()
    .then( response => this.onJobSuccess(response) ,
        error => this.OnError(error));

 }
public onJobSuccess(response:Status)
  {
      if(response.Status)
      {
        this.populars=response.Value;
      }
      this.loading.dismiss();
  }
public OnError(error:any)
  {
    this.loading.dismiss();
    if(this.connctionErrorCount==0)
      this.ShowAlert("Error",error.message);
    if(error.status==0)
      this.connctionErrorCount++;
    this.loading = this.loadCtrl.create();
  }
 ShowAlert(title:string,msg:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  onJobSelection(job:any)
  {
      switch(job.Id){
          case JobType.ScreenPrinting:
            this.nav.push(this.printingPage.component);
          break;
           case JobType.OffsetPrinting:
            this.nav.push(this.jobOffsetPage.component);
          break;
           case JobType.IdentityCard:
            this.ShowAlert("Message","Work in progress")
            //this.nav.push(this.printingPage.component);
          break;
           case JobType.Binding:
            this.ShowAlert("Message","Work in progress")
            //this.nav.push(this.printingPage.component);
          break;
           case JobType.DTP:
            this.ShowAlert("Message","Work in progress")
            //this.nav.push(this.printingPage.component);
          break;
           case JobType.FlexPrinting:
            this.ShowAlert("Message","Work in progress")
           // this.nav.push(this.printingPage.component);
          break;
      }
    
  }
}