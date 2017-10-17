import {JobType,Operators,SortingType} from './appenums';

export class KeyValueData{
    constructor(public Value:string, public Data :string) {
        
    }
}

// export class DataSourceValue{
//    SourceId:number;
//    Name:string;
//    Code:string;
//    Description:string;
//    Value:string;
// }
export class DataSourceList{
   Id:number;
   Name:string;
   Code:string;
   Description:string;
   Value:string;
   Key:string;
    constructor(data:any) {
        this.Name =data.Name,
        this.Code =data.Code,
        this.Value =data.Value,
        this.Description =data.Description,
        this.Id=data.id,
        this.Key=data.Key
    }
}
export class MasterDataSource{
   Name:string;
   Code:string;
   Description:string;
   Value:string;
    constructor(data:any) {
        this.Name =data.Name,
        this.Value =data.Id
    }
}
 export class Filter
    {
        PropertyName:String;
        Operation:Operators;
        Value :any;
        constructor(propertyName:string,operation:Operators,value:any) {
        this.PropertyName =propertyName,
        this.Operation =operation;
        this.Value =value;
    }
    }
    export class Shorting
    {
        PropertyName:string;
        Type:SortingType;
        constructor(propertyName:string,sortingType:SortingType) {
        this.PropertyName =propertyName,
        this.Type =sortingType;
    }
    }
