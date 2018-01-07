import {DataSourceList,Filter,Shorting} from './datasource.model';
import {JobGetsRequest} from './JobRequest';
import {JobType} from './appenums';
import {Status,ResponedJob} from './status.model';

export class AppCommon{

    public static HoldAuthKey:string;
    public static ToastDuration:number =1000;
    public static ToastPosition:string ='middle';
    public static  CreateDataSource(response:Status):DataSourceList[]
    {
       return response.Value.map(item => new DataSourceList(item));
    }
    public static CreateGetsRequest(jobType:JobType,filters :Filter[],orders:Shorting[]):JobGetsRequest
    {
            let request = new JobGetsRequest();
            request.JobType=jobType;
            filters.forEach(element => {
                request.Filters.push(element);
            });
            orders.forEach(element => {
                request.Orders.push(element);
            });
            return request;
    }
    /**
     * static CreateResponedData
     */
    public static CreateResponedData(jobId:string,docName:string, jobType:number,cost:number,date:string,loc:number,payment:number,jobName:string):ResponedJob 
    {
        let job = new ResponedJob();
        job.JobId=jobId;
        job.DocName=docName;
        job.JobType=jobType;
        job.ExpectedCost=cost;
        job.ExpectedData=date;
        job.ExpectedLoc=loc;
        job.ExpectedPayment=payment;
        job.JobName=jobName;
        return job;
    }
    public static ParseJsonDate(jsonDateString){
        let expDate= new Date(parseInt(jsonDateString.replace('/Date(', '')));
        let month = ("0" + (expDate.getMonth() + 1)).slice(-2);
        let day = ("0" + expDate.getDate()).slice(-2);
        let year = expDate.getFullYear();
        let date = year + '-' + month + '-' + day;
        return date;
    }
    public static GetElementFromArray(elements:DataSourceList[],id:any):DataSourceList
    {
            let element = elements.find((data: DataSourceList) => parseInt(data.Value) === parseInt(id));
            return element ;
    }
    public static IsCordovaAvailable() {
	if (!(<any>window).cordova) {
		alert('This is a native feature. Please use a device');
		return false;
	}
	return true;
};
}