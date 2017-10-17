export class JobPrintingModel
{
    JobType: number;
    JobQuantity: number;
    NumberOfColors: number;
    MaterialType: number;
    JobSize: number;
    JobSizDimension1:number;
    JobSizDimension2: number;
    UOM: number;
    DocName: string;
    ExpectedDeliverDate:string;
    PaymentMode: number;
    ExpectedCost: number;
    specialInstructions:string="";
    GummingRequired:boolean =false;
    PastingRequired:boolean = false;
    OutputReq: number;
    DeliveryAt:number;
    Id: string="";
}