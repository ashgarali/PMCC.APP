import {JobType,Operators,SortingType,ViewsType} from './appenums';
import {Filter,Shorting} from './datasource.model';
export class JobGetRequest
    {
        Id :string;
        JobType: JobType;
        constructor()
        {
            
        }
    }
export class JobGetsRequest
    {
        JobType: JobType;
        ViewId:ViewsType;
        Filters: Filter[] = [];
        Orders :Shorting[] =[];
    }

 export class JobCreateRequest
 {
     JobType:JobType;
     Data:any;
 }
export class JobUpdateRequest
    {
        Id:string;
        JobType: JobType;
        Data:any;
    }
 export class ScreenPrinting{
     JobType:number;
     JobQuantity:number;
     NumberOfColors:number; 
     MaterialType:number;
     JobSize:number;
     JobSizDimension1:number;
     JobSizDimension2:number;
     UOM:number;
     ExpectedDeliverDate:string;
     PaymentMode:number;    
     ExpectedCost:number;
     GummingRequired:boolean;
     PastingRequired:boolean;
     OutPutReq:number;
     DeliveryAt:number; 
     SpecialInstructions:string;
 }

 export class OffSetPrinting{
     JobType:number;
     JobQty:number;
     GSM:number; 
     JobSize:number;
     NoOfPlates:number;
     Plate1Color:number;
     Plate2Color:number=0;
     Plate3Color:number=0;
     Plate4Color:number=0;
     ExpectedDeliverDate:string;
     PaymentMode:number;    
     ExpectedCost:number;
     GummingRequired:boolean;
     PastingRequired:boolean;
     OutPutReq:number;
     DeliveryAt:number; 
     SpecialInstructions:string;
 }

 export class InItPayment{
    Amount:number;
    ProductIds:string[];
    ProductInfo:string;
    Months:number;
}