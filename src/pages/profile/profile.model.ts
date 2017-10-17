export class UserModel {
  Id: string;
  LoginId: string;
  Name: string;
  Email: string;
  MobileNo: string;
  CompanyName: string;
  AddressLine1:string;
  AddressLine2:string;
  CityId:string;
  StateId:string;
  Pincode:string;
}

export class ProfilePostModel {
  date: Date;
	image: string;
	description: string;
	likes: number = 0;
	comments: number = 0;
	liked: boolean = false;
}

export class ProfileModel {
  user: UserModel = new UserModel();
  // following: Array<UserModel> = [];
  // followers: Array<UserModel> = [];
  // posts: Array<ProfilePostModel> = [];

}
export class ListModel {
  name: string;
  image: string;
  description: string;
}
export class List2Model {
  items: Array<ListModel>;
}
export class Modules {
  modules: Array<Module> = [];
}

export class Module {
  Id:string;
  Code: string;
  Name: string;
  Cost:number;
  TillDate:string;
  PaymentDate:string;
  Img:string;
}
