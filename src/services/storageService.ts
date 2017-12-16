import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Storage, IonicStorageModule} from '@ionic/storage';
 
@Injectable()
export class Localstorage {
 
  constructor(private storage:Storage) {
    console.log('Hello Localstorage Provider');
    }
 
    //store the email address
    SetValue(key:string,value:string){
       this.storage.set(key,value);
    }
 
    //get the stored email
     GetValues(key:string)
     {
        return this.storage.get(key).then(response=> response as string );
     }
 
    //delete the email address
    RemoveValue(key:string){
    this.storage.remove('key').then(()=>{
    		console.log('email is removed');
    	});
    }
 
    //clear the whole local storage
    ClearStorage(){
    	this.storage.clear().then(()=>{
		   console.log('all keys are cleared');
    	});
    }
 
}