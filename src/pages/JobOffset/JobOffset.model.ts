export class JobOffSetModel
{
    JobType: number;
    JobQty: number;
    GSM: number;
    JobSize: number;
    NoOfPlates: number;
    Plate1Color:number;
    Plate2Color: number;
    Plate3Color:number;
    Plate4Color: number;
    DocName: string;
    ExpectedDeliverDate:string;
    PaymentMode: number;
    ExpectedCost: number;
    specialInstructions:string="";
    OutputReq: number;
    DeliveryAt:number;
    Id: string="";
}