 export class Status
    {
        Status :boolean = false;
        Value :any;
        Message:string;
        SourceId:number;
        constructor(){}
    }

export class ResponedJob
{
    JobId:string;
    DocName:string;
    JobType:number;
    ExpectedData:string;
    ExpectedLoc: number;
    ExpectedPayment:number;
    ExpectedCost:number;
}

