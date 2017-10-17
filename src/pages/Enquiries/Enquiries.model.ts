export class EnquiryModel {
  Id:string;
  DocName: string;
  JobType: string;
  JobTypeId:number;
  ExpectedDate:string;
  cost:string;
  DocDay: string;
  DocMonth: string;
  DocTime: string;
  ResponseCount:number;
}

export class EnquiriesModel {
  enquiries: Array<EnquiryModel> = [];
}

