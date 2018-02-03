export class AppConfig{
    public static BaseUrl :string ="http://localhost:44300/";
    //public static BaseUrl :string ="http://pmccqa.azurewebsites.net/";
    //public static BaseUrl :string ="http://pmccprdapp.azurewebsites.net/";
    public static RecordCount:number=10;
    
    
}
export class EndPoints
{
    public static LOGIN="api/account/Login";
    public static LOGOUT="api/account/Logout";
    public static SIGNUP="api/account/Register";
    public static FORGETPASSWORD="api/account/ForgetPassword";
    public static USERADDRESS="api/user/UpdateUserDetail";
    public static USERDETAILS="api/user/GetUserDetails";
    public static DATASOURCE ="api/DataSource/GetDataSourceValues";
    public static GETMODULES="api/Module/GetModules";
    public static GETJOB ='api/jobs/GetJob';
    public static GETSJOB ='api/jobs/GetJobs';
    public static CREATEJOB='api/jobs/CreateJob';
    public static UPDATEJOB='api/jobs/UpdateJob';
    public static JOBACTION='api/jobs/JobAction';
    public static CONTACTUS='api/Customer/ContactUs';
    public static GETVIEWS='api/jobs/GetViews';
    public static MODULES= 'api/Module/GetModules';
    public static GETOFFERS= 'api/Offer/GetOffersByModule';
    public static PAYMENTINIT='api/PaymentInIt/InitiatePayment';
    public static USERSETTING='api/user/UserSetting';
}

export class StoreKey
{
    public static AuthKey = "ak";
    public static UserId="uId";
    
}
export class MsgType
{
    public static ErrorType="Error";
    public static InfoType="Info";

}
export class Msg
{
    public static PlatesCountError="Please select all colors plates.";
    public static FlexDimError="Please fillup all the details of designs";
    public static SaveSuccess="Your enquiry posted successfully";
    public static CloseDocument="Your enquiry closed successfully"
}