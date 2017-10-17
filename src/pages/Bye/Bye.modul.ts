export class Offer {
  Id:string;
  Name: string;
  Code: string;
  Description:string;
  ValidTo:string;
  OfferCount:number;
  OfferPercentage:number;
  OfferCost:string;
  Checked:boolean;
}
export class Offers {
  offers: Array<Offer> = [];
}