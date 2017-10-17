export  enum JobType
{
    ScreenPrinting=1,
    OffsetPrinting=2,
    IdentityCard =3,
    Binding =4,
    DTP =5,
    FlexPrinting=6,

    ///
     StateMaster=51,
     CityMaster=52,
     PushNotification = 53,
     Response = 54,
    ///
    ViewDocument=101
}
export enum ViewsType
{
    ViewEnquiries=1,
    ViewNotifications=2,
    ViewUserProfile=3,
    ViewModuleMaster=4,
    ViewUserDetails=5,
    ViewResponses=6
}
export enum DataSourceMasters{
    //Screen printing
    SPJobType=10001,
    SPColors=10002,
    SPOutPutProvide=10003,
    DeliveryAt=10004,
    PaymentMode=10005,
    UMO=10006,
    //Offset printing
     OFSJobType=10007,
    BindingJobType=10008,
    OFSJobSize = 10009,
    OFSColorType=10010,

    
    
    	
    
}
export enum DataSourceGroup
{
    JobSize= 1,
    VisitingCard=2,
    MaterialType=3,
    NoOfPlates=4,
    NoOfCopies=5
}
export enum Operators
    {
        Equals=1,
        GreaterThan=2,
        LessThan=3,
        GreaterThanOrEqual=4,
        LessThanOrEqual=5,
        Contains=5,
        StartsWith=6,
        EndsWith=7
    }
    export enum SortingType
    {
        Asc =1,
        Desc=2
    }