import {Injectable} from '@angular/core';
import {Http,URLSearchParams,Headers,RequestOptions} from  '@angular/http';
import {Storage} from '@ionic/storage';

import {Status} from  '../model/status.model';
import {Login,Registration} from '../model/login.model';
import {AppConfig,EndPoints,StoreKey} from '../app.config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService{
  private BaseUrl:string =AppConfig.BaseUrl;
  private authKey :string;
  private errorMsg :string="Auth error";
  private isError :boolean =true;
  constructor(private http:Http,
              private storage :Storage  )
  {
        
  }

  //#region Serivce Methods for Users
   Login(login:Login ):Promise<Status>{
    //   let rData = new URLSearchParams(); 
    //   rData.append("UserName",login.UserName);
    //   rData.append("Password",login.PassWord);

    // if(this.isError){
    // return new Promise<Status>((resolve, reject) => {
    //     let status= new Status();
    //     status.Status =!this.isError;
    //     status.Message=this.errorMsg;
    //     resolve(status);
    // });
    // }

    let requestPoint = this.BaseUrl+EndPoints.LOGIN;
        return this.http.post(requestPoint, login, this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
  SignUp(login:Registration)
  {
    let requestPoint = this.BaseUrl+EndPoints.SIGNUP;
        return this.http.post(requestPoint, login, this.requestOptions()).toPromise()
        .then(response => response.json() as Status)
        .catch(this.handleError);
  }
//#endregion
  //#region Helping Methods
   private requestOptions():RequestOptions{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
   }
    private handleError(error: any): Promise<any> {
        if(error.status==0)
            error.message ="Please check your internet connection";
        console.log(error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    //#endregion
}