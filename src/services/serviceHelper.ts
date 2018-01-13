import {Injectable} from '@angular/core';
import {Http,URLSearchParams,Headers,RequestOptions} from  '@angular/http';
//import {Storage} from '@ionic/storage';
import {Localstorage} from'./storageService';

import {Status} from  '../model/status.model';
import {Login,Registration,UserAddress} from '../model/login.model';
import {AppConfig,EndPoints,StoreKey} from '../app.config';
import {JobGetsRequest} from '../model/JobRequest';
import {AppCommon} from '../model/appcommon';
import {JobCreateRequest,JobGetRequest,JobUpdateRequest,InItPayment,JobActionRequest} from '../model/JobRequest'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServiceHelper{
  private BaseUrl:string =AppConfig.BaseUrl;
  private authKey :string;
  private errorMsg :string="Auth error";
  private isError :boolean =true;
  constructor(private http:Http,
              private storage :Localstorage  )
  {
       this.storage.GetValues(StoreKey.AuthKey)
      .then(
          (value) => this.authKey=value
        )
      .catch(() => {this.errorMsg = "Auntaction key not found!",this.isError=true});  
  }
  //#region Serivce Methods for Users
  public LoadSessionKey()
  {
    this.storage.GetValues(StoreKey.AuthKey)
      .then(
          (value) => this.authKey=value
        )
      .catch(() => {this.errorMsg = "Auntaction key not found!",this.isError=true});  
  }
  LogOut()
  {
      let requestPoint = this.BaseUrl+EndPoints.LOGOUT;
        return this.http.post(requestPoint, {}, this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  UserDetails(address :UserAddress)
  {
      let requestPoint = this.BaseUrl+EndPoints.USERADDRESS;
        return this.http.post(requestPoint, address, this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  
 DataSourceValues(id:number,group:number=0)
  {
    let requestPoint = this.BaseUrl+EndPoints.DATASOURCE+"?id="+id + "&group="+group;
        return this.http.get(requestPoint, this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  GetJob(request : JobGetRequest )
  {
      let requestPoint = this.BaseUrl+EndPoints.GETJOB;
        return this.http.post(requestPoint, request,this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  GetsJob(request : JobGetsRequest )
  {
      let requestPoint = this.BaseUrl+EndPoints.GETSJOB;
        return this.http.post(requestPoint, request,this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  GetViews(request:JobGetsRequest){
       let requestPoint = this.BaseUrl+EndPoints.GETVIEWS;
        return this.http.post(requestPoint, request,this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  CreateJob(request:JobCreateRequest)
  {
         let requestPoint = this.BaseUrl+EndPoints.CREATEJOB;
        return this.http.post(requestPoint, request,this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  UpdateJob(request:JobUpdateRequest)
  {
         let requestPoint = this.BaseUrl+EndPoints.UPDATEJOB;
        return this.http.post(requestPoint, request,this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  PerformAction(request:JobActionRequest)
  {
      let requestPoint = this.BaseUrl+EndPoints.JOBACTION;
        return this.http.post(requestPoint, request,this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  GetOffers(moduletype:boolean)
  {
      let requestPoint = this.BaseUrl+EndPoints.GETOFFERS+'?startIndex=0&count=0&byModule='+moduletype;
        return this.http.post(requestPoint,{},this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  GetModules()
  {
      let requestPoint = this.BaseUrl+EndPoints.GETMODULES+'?startIndex=0&count=0';
        return this.http.get(requestPoint, this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  UserSetting(request:any)
  {
       let requestPoint = this.BaseUrl+EndPoints.USERSETTING;
        return this.http.post(requestPoint,request,this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  ContactUs(request:any)
  {
    let requestPoint = this.BaseUrl+EndPoints.CONTACTUS;
    return this.http.post(requestPoint,request,this.requestOptions()).toPromise()
    .then(response => response.json() as Status)
    .catch(this.handleError);
  }
  PaymentInIt(request:InItPayment)
  {
      let requestPoint = this.BaseUrl+EndPoints.PAYMENTINIT;
        return this.http.post(requestPoint,request,this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }        //#endregion
  //#region Helping Methods
   private requestOptions():RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/json' });
         headers.append("AuthKey", this.authKey);
         //headers.append("AuthKey", AppCommon.HoldAuthKey);
        return new RequestOptions({ headers: headers });
   }
    private handleError(error: any): Promise<any> {
        if(error.status==0){
            error.message ="Please check your internet connection";
            error.status=0;
        }
        console.log(error); // for demo purposes only
        return Promise.reject(error);
    }
    //#endregion
}