import { Component } from '@angular/core';
import { MenuController, SegmentButton,NavController, App, NavParams,AlertController, LoadingController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import {ModulesPage} from '../Modules/Modules';
import 'rxjs/Rx';
import {Storage} from '@ionic/storage';
import { ProfileModel,UserModel,Modules,Module} from './profile.model';
import {ServiceHelper} from '../../services/serviceHelper';
import {StoreKey} from '../../app.config';
import {JobGetsRequest} from '../../model/JobRequest';
import {JobType,ViewsType,Operators} from '../../model/appenums';
import { Filter,} from '../../model/datasource.model';
import {ByePage} from '../Bye/Bye';

@Component({
  selector: 'profile-page',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  display: string;
  loading: any;
  modelList: Modules = new Modules();
  profile:ProfileModel  = new ProfileModel();
   modulesPage : { component: any };
    byePage : { component: any };
     byeList: Module[] =[];
   userId:string;
   errorMsg:string;
   isError:boolean=false;
   profileImg ="assets/images/profile/user.png";
  constructor(
    public menu: MenuController,
    public app: App,
    public navParams: NavParams,
    public nav :NavController,
    public serviceHelper :ServiceHelper,
    public loadingCtrl: LoadingController,
    public alertCtr: AlertController,
    public storage:Storage
  ) {
    this.display = "list";
    this.loading = this.loadingCtrl.create();
    this.modulesPage={component:ModulesPage};
    this.byePage = { component: ByePage };
    this.storage.get(StoreKey.UserId)
      .then(
        (value) => this.userId=value
      ).catch(() => {this.errorMsg = "User not found!",this.isError=true});
  }

  ionViewDidLoad() {
    this.loading.present();
    setTimeout(() => {
      this.LoadUserDetails();
      this.LoadUsersModules();
    }, 1000);
  }
  public LoadUserDetails()
  {
    this.serviceHelper
      .GetViews(this.CreateProfileRequest())
      .then(response => {
        this.profile.user =response.Value.Data[0];
         this.loading.dismiss();
      },error => this.OnError(error));
  }
  public LoadUsersModules()
  {
    this.serviceHelper
      .GetViews(this.CreateModulesRequest())
      .then(response => {
         this.modelList.modules =response.Value.Data;
          this.loading.dismiss();
      });
  }
private CreateProfileRequest():JobGetsRequest
 {
    let request = new JobGetsRequest();
    request.JobType=JobType.ViewDocument;
    request.ViewId= ViewsType.ViewUserProfile;
    let prop1 = new Filter("UserId",Operators.Equals,this.userId)
    request.Filters.push(prop1)
    return request;
 }
  OnError(error:any)
  {
    this.loading.dismiss();
    this.ShowAlert("Error",error);
    setTimeout(()=>{this.loading = this.loadingCtrl.create();},1000);
  }
   ShowAlert(title:string,msg:string) {
    let alert = this.alertCtr.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }
private CreateModulesRequest():JobGetsRequest
 {
    let request = new JobGetsRequest();
    request.JobType=JobType.ViewDocument;
    request.ViewId= ViewsType.ViewModuleMaster;
    request.Filters.push(new Filter("IsUsed",Operators.Equals,true))//Used Models
    return request;
 }
  goToSettings() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    this.app.getRootNav().push(SettingsPage);
  }
  onAddModules(){
    this.nav.push(this.modulesPage.component);
  }
  onRenewClick(item:Module)
  {
    this.byeList.push(item);
    this.nav.push(this.byePage.component,{list:this.byeList,pay:item.Cost});
  }
  onSegmentChanged(segmentButton: SegmentButton) {
    // console.log('Segment changed to', segmentButton.value);
  }

  onSegmentSelected(segmentButton: SegmentButton) {
    // console.log('Segment selected', segmentButton.value);
  }
}
