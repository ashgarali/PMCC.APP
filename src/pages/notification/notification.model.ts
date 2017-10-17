
export class NotificationList {
  notifications: Array<NotificationModel> = [];
}

export class NotificationModel {
  Id:string;
  DocName: string;
  JobType: number;
  JobTypeName:string;
  JobTypeId:number;
  ExpectedDate:string;
  ExpectedCost:string;
  DocDay: string;
  DocMonth: string;
  DocTime: string;
  IsSend:boolean;
  IsViewed:boolean;
}
