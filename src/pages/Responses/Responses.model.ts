export class ResponsesModel {
  RowNo: number;
  DocName:string;
  JobType: number;
  JobId:string;
  ExpectedDeliverDate:string;
  ExpectedCost: number;
  ExpectedLoc:string;
  ExpectedMode:string;
  ReceivedDate:string;
  ReceivedCost:number;
  ReceivedMode:string;
  ReceivedLoc:string;
  CustomerId:string;
  Name:string;
  MobileNo:string;
  CreatedDate:string;
}
export class ResponsesList {
  responses: Array<ResponsesModel> = [];
}