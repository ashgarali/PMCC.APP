export class Modules {
  modules: Array<Module> = [];
}

export class Module {
  Id:string;
  Code: string;
  Name: string;
  Cost:number;
  Checked:boolean;
}

export class Offer {
  Id:string;
  Name: string;
  Code: string;
  Description:string;
  ValidTo:string;
  OfferCount:number;
  OfferPercentage:number;
  OfferCost:number;
  Checked:boolean;
}
export class Offers {
  offers: Array<Offer> = [];
}
