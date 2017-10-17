webpackJsonp([0],{

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppCommon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__datasource_model__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__JobRequest__ = __webpack_require__(42);


var AppCommon = (function () {
    function AppCommon() {
    }
    AppCommon.CreateDataSource = function (response) {
        return response.Value.map(function (item) { return new __WEBPACK_IMPORTED_MODULE_0__datasource_model__["a" /* DataSourceList */](item); });
    };
    AppCommon.CreateGetsRequest = function (jobType, filters, orders) {
        var request = new __WEBPACK_IMPORTED_MODULE_1__JobRequest__["d" /* JobGetsRequest */]();
        request.JobType = jobType;
        filters.forEach(function (element) {
            request.Filters.push(element);
        });
        orders.forEach(function (element) {
            request.Orders.push(element);
        });
        return request;
    };
    AppCommon.ParseJsonDate = function (jsonDateString) {
        var expDate = new Date(parseInt(jsonDateString.replace('/Date(', '')));
        var month = ("0" + (expDate.getMonth() + 1)).slice(-2);
        var day = ("0" + expDate.getDate()).slice(-2);
        var year = expDate.getFullYear();
        var date = year + '-' + month + '-' + day;
        return date;
    };
    return AppCommon;
}());

//# sourceMappingURL=appcommon.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobOffsetPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Enquiries_Enquiries__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_appenums__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_serviceHelper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_appcommon__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_JobRequest__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var JobOffsetPage = (function () {
    function JobOffsetPage(nav, alertCtrl, serviceHelper, toastCtrl, loadingCtrl) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.serviceHelper = serviceHelper;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.jobTypeList = [];
        this.noofPlatesList = [];
        this.colorsList = [];
        this.jobSizeList = [];
        this.paymentModeList = [];
        this.outputList = [];
        this.deliveryList = [];
        this.noOfPlates = [1];
        this.common = new __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */]();
        this.CreateForm();
        this.enquiriesPage = { component: __WEBPACK_IMPORTED_MODULE_3__Enquiries_Enquiries__["a" /* EnquiriesPage */] };
        this.loading = this.loadingCtrl.create();
    }
    JobOffsetPage.prototype.CreateForm = function () {
        this.jobOffsetForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            jobType: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            jobQuantity: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            jobGSM: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            jobSize: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            noofPlates: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('1', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            plate1color: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            plate2color: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            plate3color: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            plate4color: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            expDelivery: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            payMode: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            expCost: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            gummingReq: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](false),
            pastingReq: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](false),
            outputReq: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            deliveryAt: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            details: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('')
        });
    };
    JobOffsetPage.prototype.ionViewWillEnter = function () {
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].OffsetJobTypeId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].JobSizeId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].NoOfPlates);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].PaymentModeId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].OutputTypeId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].DeliveryAtId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].ColorsId);
    };
    JobOffsetPage.prototype.GetDataSource = function (id) {
        var _this = this;
        this.serviceHelper.DataSourceValues(id)
            .then(function (response) { return _this.OnDataSourceSuccess(response); }, function (error) { return _this.OnError(error); });
    };
    JobOffsetPage.prototype.OnDataSourceSuccess = function (response) {
        if (response.Status) {
            switch (response.SourceId.toString()) {
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].OffsetJobTypeId.toString():
                    this.jobTypeList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].NoOfPlates.toString():
                    this.noofPlatesList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].JobSizeId.toString():
                    this.jobSizeList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].PaymentModeId.toString():
                    this.paymentModeList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].OutputTypeId.toString():
                    this.outputList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].DeliveryAtId.toString():
                    this.deliveryList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].ColorsId.toString():
                    this.colorsList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
            }
            //this.jobTypes = response.Value.map(item => new DataSourceList(item));
        }
        else {
            this.ShowAlert("Error", response.Message);
        }
    };
    JobOffsetPage.prototype.OnError = function (error) {
        this.loading.dismiss();
        this.ShowAlert("Error", error);
    };
    JobOffsetPage.prototype.ShowAlert = function (title, msg) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    JobOffsetPage.prototype.ShowToast = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            _this.nav.setRoot(_this.enquiriesPage.component);
            //this.nav.getro.setRoot(this.main_page.component);
        });
        toast.present();
    };
    JobOffsetPage.prototype.onOffsetPrintingSave = function () {
        var _this = this;
        console.log(this.jobOffsetForm.value);
        this.loading.present();
        var jobRequest = this.CreateOffSetReqest(this.jobOffsetForm.value);
        this.serviceHelper.CreateJob(jobRequest)
            .then(function (response) { return _this.onSaveSuccess(response); }, function (error) { return _this.OnError(error); });
    };
    JobOffsetPage.prototype.onSaveSuccess = function (response) {
        this.loading.dismiss();
        if (response.Status) {
            this.ShowToast("Save successfull!");
        }
        else {
            this.ShowAlert("Error", response.Message);
        }
    };
    JobOffsetPage.prototype.CreateOffSetReqest = function (formValues) {
        var screenObj = new __WEBPACK_IMPORTED_MODULE_7__model_JobRequest__["f" /* OffSetPrinting */]();
        screenObj.JobType = formValues.jobType;
        screenObj.JobQty = formValues.jobQuantity;
        screenObj.GSM = formValues.jobGSM;
        screenObj.JobSize = formValues.jobSize;
        screenObj.NoOfPlates = formValues.noofPlates;
        screenObj.Plate1Color = formValues.plate1color;
        if (formValues.plate2color != "")
            screenObj.Plate2Color = formValues.plate2color;
        if (formValues.plate3color != "")
            screenObj.Plate3Color = formValues.plate3color;
        if (formValues.plate4color != "")
            screenObj.Plate4Color = formValues.plate4color;
        screenObj.ExpectedDeliverDate = formValues.expDelivery;
        screenObj.PaymentMode = formValues.payMode;
        screenObj.ExpectedCost = formValues.expCost;
        screenObj.GummingRequired = formValues.gummingReq;
        screenObj.PastingRequired = formValues.pastingReq;
        screenObj.OutPutReq = formValues.outputReq;
        screenObj.DeliveryAt = formValues.deliveryAt;
        screenObj.SpecialInstructions = formValues.details;
        var jobRequest = new __WEBPACK_IMPORTED_MODULE_7__model_JobRequest__["b" /* JobCreateRequest */]();
        jobRequest.JobType = __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].OffsetPrinting;
        jobRequest.Data = screenObj;
        return jobRequest;
    };
    JobOffsetPage.prototype.onPlatesChange = function (event) {
        this.noOfPlates = [];
        for (var i = 1; i <= event; i++) {
            this.noOfPlates.push(i);
        }
    };
    JobOffsetPage.prototype.onRespondClick = function () {
        this.nav.push(this.enquiriesPage.component);
    };
    return JobOffsetPage;
}());
JobOffsetPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'joboffset-Page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\JobOffset\JobOffset.html"*/'<style>\n\n  hr{\n\n    height: 2px !important;\n\n    background-color: #ae75e7;\n\n  }\n\n  ion-label {\n\n    font-size: 1.4rem !important;;\n\n    color: #ae75e7;\n\n}\n\n.select-md {\n\n    padding: 0px 5px 0px 0px;\n\n    width: 200px;\n\n}\n\n  .item-md {\n\n    font-size: 1.4rem !important;\n\n}\n\n  </style>\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Offset printing</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="forms-examples-content">\n\n  <div  class="event-example-view">\n\n  <form class="sample-form event-form" [formGroup]="jobOffsetForm" (ngSubmit)="onOffsetPrintingSave()">\n\n        <section class="form-section">\n\n          <h1 class="section-title">Mandatory</h1>\n\n          <hr>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Job Type</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="jobType" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let jobType of jobTypeList" \n\n                    [value]="jobType.Value" >{{jobType.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Job Quantity</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-input type="number" placeholder="e.g. 100" formControlName="jobQuantity"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n           <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >GSM</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-input type="number" placeholder="e.g. 10" formControlName="jobGSM"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Job size</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="jobSize" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let jobs of jobSizeList" \n\n                    [value]="jobs.Value" >{{jobs.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n           <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >No of plates</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="noofPlates" placeholder="Select" style="max-width:100%">\n\n                    <ion-option (ionSelect)="onPlatesChange($event)"  *ngFor="let plates of noofPlatesList" \n\n                    [value]="plates.Value" >{{plates.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n           <ion-row no-padding class="multi-input-row" *ngFor="let item of noOfPlates;" >\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Plates-{{item}}</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="plate{{item}}color" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let color of colorsList" \n\n                    [value]="color.Value" >{{color.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row> \n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Expected delivery</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-datetime formControlName="expDelivery" placeholder="Select Date" displayFormat="DD/MM/YY" pickerFormat="DD-MM-YYYY"></ion-datetime>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Payment mode</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="payMode" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let payment of paymentModeList" \n\n                    [value]="payment.Value" >{{payment.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Expected cost</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-input type="number" formControlName="expCost"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <h2 class="section-title">Optional</h2>\n\n          <hr>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Gumming request</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item" style="border-bottom: none;">\n\n                <ion-toggle formControlName="gummingReq"  ></ion-toggle>\n\n               <!-- <ion-select formControlName="gummingReq" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let gumming of gummingList" \n\n                    [value]="gumming.Value" >{{gumming.Name}}</ion-option>\n\n              </ion-select> -->\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Pasting required</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item" >\n\n                <ion-toggle formControlName="pastingReq"></ion-toggle>\n\n               <!-- <ion-select formControlName="pastingReq" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let pasting of pastingList" \n\n                    [value]="pasting.Value" >{{pasting.Name}}</ion-option>\n\n              </ion-select> -->\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Output required</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="outputReq" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let output of outputList" \n\n                    [value]="output.Value" >{{output.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n           <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Delivery at</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="deliveryAt" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let delivery of deliveryList" \n\n                    [value]="delivery.Value" >{{delivery.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-100>\n\n                <ion-label >Details/Special instructions</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-100>\n\n              <ion-item class="multi-input time-item">\n\n                <ion-textarea formControlName="details" rows="3" placeholder="Your description here..."></ion-textarea>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n        </section>\n\n        <section class="form-section" style="padding-top:20px;">\n\n          <ion-row no-padding class="multi-input-row">\n\n              <ion-col no-padding width-50>\n\n                  <button ion-button block class="form-action-button create-event-button" (click)="CreateForm()" type="button"  >Clear</button>\n\n              </ion-col>\n\n              <ion-col no-padding width-50>\n\n                  <button ion-button block class="form-action-button create-event-button" type="submit" [disabled]="!jobOffsetForm.valid" >Save</button>\n\n              </ion-col>\n\n          </ion-row>\n\n        </section>\n\n      </form>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\JobOffset\JobOffset.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__services_serviceHelper__["a" /* ServiceHelper */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], JobOffsetPage);

//# sourceMappingURL=JobOffset.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__terms_of_service_terms_of_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__privacy_policy_privacy_policy__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__profile_profile_model__ = __webpack_require__(275);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SettingsPage = (function () {
    function SettingsPage(nav, modal, loadingCtrl) {
        this.nav = nav;
        this.modal = modal;
        this.loadingCtrl = loadingCtrl;
        // make WalkthroughPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */];
        this.profile = new __WEBPACK_IMPORTED_MODULE_7__profile_profile_model__["b" /* ProfileModel */]();
        this.profileImg = "../assets/images/profile/200x200ProfilePic.png";
        this.loading = this.loadingCtrl.create();
        this.settingsForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            phone: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            address1: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            address2: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            pincode: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            state: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            city: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
        });
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        //this.loading.present();
        // this.profileService
        //   .getProfile()
        //   .then(data => {
        //     this.profile.user = data.user;
        //     this.settingsForm.setValue({
        //       // name: data.user.name,
        //       // location: data.user.location,
        //       // description: data.user.about,
        //       currency: 'dollar',
        //       weather: 'fahrenheit',
        //       notifications: true
        //     });
        //     this.loading.dismiss();
        //   });
    };
    SettingsPage.prototype.logout = function () {
        // navigate to the new page if it is not the current page
        this.nav.setRoot(this.rootPage);
    };
    SettingsPage.prototype.showTermsModal = function () {
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_3__terms_of_service_terms_of_service__["a" /* TermsOfServicePage */]);
        modal.present();
    };
    SettingsPage.prototype.showPrivacyModal = function () {
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_4__privacy_policy_privacy_policy__["a" /* PrivacyPolicyPage */]);
        modal.present();
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'settings-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\settings\settings.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Profile</ion-title>\n    <ion-buttons end (click)="logout()">\n      <button ion-button>\n        Logout &nbsp;\n        <ion-icon name="log-out"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="settings-content">\n  <div class="user-details">\n    <ion-row class="user-main-data-row">\n      <ion-col no-padding width-33>\n        <preload-image class="user-image" [ratio]="{w:1, h:1}" [src]="profileImg"></preload-image>\n      </ion-col>\n      <ion-col no-padding>\n        <ion-row wrap class="user-bio-row">\n          <ion-col no-padding width-90>\n            <h2 class="user-name">Ashgar ali Ansari</h2>\n          </ion-col>\n          <ion-col no-padding width-90>\n            <h2 class="user-description">Company Name</h2>\n          </ion-col>\n          <ion-col no-padding width-90>\n            <h2 class="user-description">Email</h2>\n          </ion-col>\n          <ion-col no-padding width-90>\n            <h2 class="user-description">Phone</h2>\n          </ion-col>\n        </ion-row>\n      </ion-col>\n    </ion-row>\n  </div>\n\n  <form [formGroup]="settingsForm" class="settings-form">\n    <ion-list class="user-data-content">\n      <ion-item>\n        <ion-label stacked>Email</ion-label>\n        <ion-input type="text" formControlName="email"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>Phone</ion-label>\n        <ion-input type="text" formControlName="phone"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>Address Line1</ion-label>\n        <ion-input type="text" formControlName="address1"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>Address Line2</ion-label>\n        <ion-input type="text" formControlName="address2"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>State</ion-label>\n        <ion-input type="text" formControlName="state"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>City</ion-label>\n        <ion-input type="text" formControlName="city"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label stacked>Pin</ion-label>\n        <ion-input type="text" formControlName="pincode"></ion-input>\n      </ion-item>\n    </ion-list>\n    <div class="user-details">\n    <ion-row class="user-main-data-row ">\n          <ion-col no-padding class="profile-action-row">\n            <button ion-button block small (click)="goToSettings()">\n              Edit profile\n            </button>\n          </ion-col>\n    </ion-row>\n    </div>\n  </form>\n</ion-content>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\settings\settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrivacyPolicyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PrivacyPolicyPage = (function () {
    function PrivacyPolicyPage(view) {
        this.view = view;
    }
    PrivacyPolicyPage.prototype.dismiss = function () {
        this.view.dismiss();
    };
    return PrivacyPolicyPage;
}());
PrivacyPolicyPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'privacy-policy-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\privacy-policy\privacy-policy.html"*/'<ion-header class="privacy-header legal-header">\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Privacy Policy\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="privacy-content legal-content">\n  <p>Last modified: Nov 14, 2016</p>\n  <h4 class="legal-title">Welcome to ion2FullApp!</h4>\n  <p>Thanks for using our products and services (“Services”). Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n  <h4 class="legal-title">Using our Services</h4>\n  <p>You must follow any policies made available to you within the Services.</p>\n  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n  <h4 class="legal-title">About these Terms</h4>\n  <p>We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law or changes to our Services. You should look at the terms regularly. We’ll post notice of modifications to these terms on this page. We’ll post notice of modified additional terms in the applicable Service. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted. However, changes addressing new functions for a Service or changes made for legal reasons will be effective immediately. If you do not agree to the modified terms for a Service, you should discontinue your use of that Service.</p>\n</ion-content>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\privacy-policy\privacy-policy.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
], PrivacyPolicyPage);

//# sourceMappingURL=privacy-policy.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_navigation_tabs_navigation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__forgot_password_forgot_password__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__terms_of_service_terms_of_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_loginService__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_login_model__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_config__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











///http://www.concretepage.com/angular-2/angular-2-http-post-example
//https://www.npmjs.com/package/angular2-social-login
var LoginPage = (function () {
    function LoginPage(nav, loginService, storage, alertCtr, modal, loadingCtrl) {
        this.nav = nav;
        this.loginService = loginService;
        this.storage = storage;
        this.alertCtr = alertCtr;
        this.modal = modal;
        this.loadingCtrl = loadingCtrl;
        this.banner_image = "../assets/images/pmcclogo.jpg";
        this.main_page = { component: __WEBPACK_IMPORTED_MODULE_4__tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */] };
        this.loading = this.loadingCtrl.create();
        this.login = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required)
        });
        this.storage.clear();
    }
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        this.loading.present();
        var login = new __WEBPACK_IMPORTED_MODULE_9__model_login_model__["a" /* Login */]();
        login.UserName = this.login.value.email;
        login.PassWord = this.login.value.password;
        console.log(this.login.value);
        this.loginService.Login(login)
            .then(function (response) { return _this.onLoginSuccess(response); }, function (error) { return _this.onLoginError(error); });
    };
    LoginPage.prototype.onLoginSuccess = function (response) {
        var _this = this;
        this.loading.dismiss();
        if (response.Status) {
            this.storage.set(__WEBPACK_IMPORTED_MODULE_10__app_config__["c" /* StoreKey */].AuthKey, response.Value.AuthKey);
            this.storage.set(__WEBPACK_IMPORTED_MODULE_10__app_config__["c" /* StoreKey */].UserId, response.Value.ClientId);
            this.nav.setRoot(this.main_page.component);
        }
        else {
            this.ShowAlert("Error", response.Message);
        }
        setTimeout(function () { _this.loading = _this.loadingCtrl.create(); }, 1000);
    };
    LoginPage.prototype.onLoginError = function (error) {
        var _this = this;
        this.loading.dismiss();
        if (error.message != null)
            this.ShowAlert("Error", error.message);
        else
            this.ShowAlert("Error", error);
        setTimeout(function () { _this.loading = _this.loadingCtrl.create(); }, 1000);
    };
    LoginPage.prototype.ShowAlert = function (title, msg) {
        var alert = this.alertCtr.create({
            title: title,
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.doFacebookLogin = function () {
        this.nav.setRoot(this.main_page.component);
    };
    LoginPage.prototype.doGoogleLogin = function () {
        // this.googlePlus.login({
        //   'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        //   'webClientId': '343753043222-stm16dcg0tg8p4ufl7g55kcou4a94k89.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        //   'offline': true
        // })
        // .then(user=>this.onGoogleLogin(user),
        //       error=>this.onLoginError(error) );
        this.nav.setRoot(this.main_page.component);
    };
    LoginPage.prototype.showTermsModal = function () {
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_7__terms_of_service_terms_of_service__["a" /* TermsOfServicePage */]);
        modal.present();
    };
    LoginPage.prototype.onGoogleLogin = function (user) {
        this.ShowAlert("Success", "Success");
    };
    LoginPage.prototype.goToSignup = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.goToForgotPassword = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__forgot_password_forgot_password__["a" /* ForgotPasswordPage */]);
    };
    return LoginPage;
}());
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'login-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\login\login.html"*/'<style>\nbackground-image .bg-overlay {\n     background-color: transparent !important;\n}\n</style>\n<ion-header class="login-header auth-header">\n  <ion-navbar>\n    <ion-title>Sign in</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="login-content auth-content">\n   <background-image class="image-heading" [src]="banner_image">\n      <!-- <ion-row class="heading-row">\n      <ion-col no-padding width-100>\n        <h2 class="main-title">Client Connect</h2>\n      </ion-col>\n    </ion-row>   -->\n  </background-image>\n  <form class="login-form auth-form" [formGroup]="login" (ngSubmit)="doLogin()">\n    <ion-item>\n      <ion-label color="primary" floating>Email</ion-label>\n      <ion-input type="email" formControlName="email"></ion-input>\n    </ion-item>\n    <show-hide-container>\n      <ion-item>\n        <ion-label color="primary" floating>Password</ion-label>\n        <ion-input type="password" formControlName="password" show-hide-input></ion-input>\n      </ion-item>\n    </show-hide-container>\n    <button ion-button block class="auth-action-button login-button" type="submit" [disabled]="!login.valid">Log in</button>\n  </form>\n  <ion-row class="alt-options">\n    <ion-col no-padding width-50>\n      <button ion-button block clear class="forgot-button" (click)="goToForgotPassword()">Forgot Password?</button>\n    </ion-col>\n    <ion-col no-padding width-50>\n      <button ion-button block clear class="signup-button" (click)="goToSignup()">Sign up!</button>\n    </ion-col>\n  </ion-row>\n  <!-- <p class="auth-divider">\n    Or\n  </p>\n  <button ion-button block class="facebook-auth-button" (click)="doFacebookLogin()">Log in with Facebook</button> -->\n  <!-- <button ion-button block class="google-auth-button" (click)="doGoogleLogin()">Log in with Google</button> -->\n</ion-content>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\login\login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_8__services_loginService__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginService = (function () {
    function LoginService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.BaseUrl = __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */].BaseUrl;
        this.errorMsg = "Auth error";
        this.isError = true;
    }
    //#region Serivce Methods for Users
    LoginService.prototype.Login = function (login) {
        //   let rData = new URLSearchParams(); 
        //   rData.append("UserName",login.UserName);
        //   rData.append("Password",login.PassWord);
        // if(this.isError){
        // return new Promise<Status>((resolve, reject) => {
        //     let status= new Status();
        //     status.Status =!this.isError;
        //     status.Message=this.errorMsg;
        //     resolve(status);
        // });
        // }
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].LOGIN;
        return this.http.post(requestPoint, login, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    LoginService.prototype.SignUp = function (login) {
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].SIGNUP;
        return this.http.post(requestPoint, login, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    //#endregion
    //#region Helping Methods
    LoginService.prototype.requestOptions = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
    };
    LoginService.prototype.handleError = function (error) {
        if (error.status == 0)
            error.message = "Please check your internet connection";
        console.log(error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return LoginService;
}());
LoginService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], LoginService);

//# sourceMappingURL=loginService.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Login; });
/* unused harmony export SignUp */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return UserAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Registration; });
var Login = (function () {
    function Login() {
    }
    return Login;
}());

var SignUp = (function () {
    function SignUp() {
    }
    return SignUp;
}());

var UserAddress = (function () {
    function UserAddress() {
    }
    return UserAddress;
}());

var Registration = (function () {
    function Registration() {
    }
    return Registration;
}());

//# sourceMappingURL=login.model.js.map

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 158;

/***/ }),

/***/ 201:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 201;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServiceHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_config__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ServiceHelper = (function () {
    function ServiceHelper(http, storage) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.BaseUrl = __WEBPACK_IMPORTED_MODULE_3__app_config__["a" /* AppConfig */].BaseUrl;
        this.errorMsg = "Auth error";
        this.isError = true;
        this.storage.get(__WEBPACK_IMPORTED_MODULE_3__app_config__["c" /* StoreKey */].AuthKey)
            .then(function (value) { return _this.authKey = value; })
            .catch(function () { _this.errorMsg = "Auntaction key not found!", _this.isError = true; });
    }
    //#region Serivce Methods for Users
    ServiceHelper.prototype.UserDetails = function (address) {
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].USERADDRESS;
        return this.http.post(requestPoint, address, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServiceHelper.prototype.DataSourceValues = function (id) {
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].DATASOURCE + "?id=" + id;
        return this.http.get(requestPoint, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServiceHelper.prototype.GetJob = function (request) {
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].GETJOB;
        return this.http.post(requestPoint, request, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServiceHelper.prototype.GetsJob = function (request) {
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].GETSJOB;
        return this.http.post(requestPoint, request, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServiceHelper.prototype.GetViews = function (request) {
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].GETVIEWS;
        return this.http.post(requestPoint, request, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServiceHelper.prototype.CreateJob = function (request) {
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].CREATEJOB;
        return this.http.post(requestPoint, request, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServiceHelper.prototype.UpdateJob = function (request) {
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].UPDATEJOB;
        return this.http.post(requestPoint, request, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServiceHelper.prototype.GetOffers = function (moduletype) {
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].GETOFFERS + '?startIndex=0&count=0&byModule=' + moduletype;
        return this.http.post(requestPoint, {}, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ServiceHelper.prototype.PaymentInIt = function (request) {
        var requestPoint = this.BaseUrl + __WEBPACK_IMPORTED_MODULE_3__app_config__["b" /* EndPoints */].PAYMENTINIT;
        return this.http.post(requestPoint, request, this.requestOptions()).toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    }; //#endregion
    //#region Helping Methods
    ServiceHelper.prototype.requestOptions = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'application/json' });
        headers.append("AuthKey", this.authKey);
        //headers.append("AuthKey", AppCommon.HoldAuthKey);
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
    };
    ServiceHelper.prototype.handleError = function (error) {
        console.log(error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return ServiceHelper;
}());
ServiceHelper = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
], ServiceHelper);

//# sourceMappingURL=serviceHelper.js.map

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Responses_model__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Responses_service__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__JobPrinting_Printing__ = __webpack_require__(61);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ResponsesPage = (function () {
    function ResponsesPage(nav, responsesService, loadingCtrl) {
        this.nav = nav;
        this.responsesService = responsesService;
        this.loadingCtrl = loadingCtrl;
        this.responses = new __WEBPACK_IMPORTED_MODULE_3__Responses_model__["a" /* ResponsesModel */]();
        this.segment = "Active";
        this.loading = this.loadingCtrl.create();
        this.printingPage = { component: __WEBPACK_IMPORTED_MODULE_5__JobPrinting_Printing__["a" /* PrintingPage */] };
    }
    ResponsesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loading.present();
        this.responsesService
            .getData()
            .then(function (data) {
            _this.responses.active = data.active;
            _this.responses.responded = data.responded;
            _this.loading.dismiss();
        });
    };
    ResponsesPage.prototype.ExpandResponse = function (resp) {
        if (this.currentDoc != resp.subject)
            this.currentDoc = resp.subject;
        else
            this.currentDoc = "";
    };
    ResponsesPage.prototype.onActiveItemClick = function (item) {
        this.nav.push(this.printingPage.component);
    };
    ResponsesPage.prototype.onSegmentChanged = function (segmentButton) {
        // console.log('Segment changed to', segmentButton.value);
    };
    ResponsesPage.prototype.onSegmentSelected = function (segmentButton) {
        // console.log('Segment selected', segmentButton.value);
    };
    return ResponsesPage;
}());
ResponsesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'responses-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Responses\responses.html"*/'<style>\n\n  .item-icon {\n\n    font-size: 1.6em;\n\n    padding-left: 10px;\n\n}\n\n.col{\n\n    padding: 0px;\n\n  }\n\n\n\n\n\n.container h1{\n\n font-size:12px;\n\n color: #ae75e7;\n\n}\n\n.container .column-left{ \n\ncolor: #ae75e7;\n\nfloat: left; \n\nwidth: 30%; \n\nfont-size:10px;\n\n\n\n}\n\n.container .column-right{ \n\nfloat: right; \n\nwidth: 35%; \n\nfont-size:10px;\n\n}\n\n.container .column-center{ \n\ndisplay: inline-block; \n\nwidth: 35%; \n\nfont-size:10px;\n\n}\n\n\n\n</style>\n\n\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Responses</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content class="responses-content">\n\n  <ion-segment class="responses-segment" [(ngModel)]="segment" (ionChange)="onSegmentChanged($event)">\n\n    <ion-segment-button value="Active" width-15 (ionSelect)="onSegmentSelected($event)">\n\n      Date\n\n    </ion-segment-button>\n\n    <ion-segment-button value="Active" (ionSelect)="onSegmentSelected($event)">\n\n      Delivery on\n\n    </ion-segment-button>\n\n    <ion-segment-button value="Active" (ionSelect)="onSegmentSelected($event)">\n\n      Cost\n\n    </ion-segment-button>\n\n  </ion-segment>\n\n  <div [ngSwitch]="segment">\n\n    <div *ngSwitchCase="\'Active\'">\n\n      <ion-list class="responses-list">\n\n        <ion-item class="responses-item" *ngFor="let item of responses.active">\n\n          <ion-row>\n\n            <ion-col width-15 class="responses-date">\n\n              <h2 class="responses-day">{{item.date.day}}</h2>\n\n              <h3 class="responses-month">{{item.date.month_name}}</h3>\n\n              <h4 class="responses-time">{{item.date.time}}</h4>\n\n            </ion-col>\n\n            <ion-col width-85 class="responses-data">\n\n              <div class="data-item">\n\n                <div class="item-content">\n\n                  <ion-row>\n\n                    <ion-col width-85 style="padding: 0px;">\n\n                      <h2 class="item-title one-line">{{item.subject}}</h2>\n\n                    </ion-col>\n\n                    <ion-col width-15 style="padding: 0px;">\n\n                      <ion-icon style="font-size: 1.6em;" class="item-icon" name="call" (click)=\'onActiveItemClick(item);\' ></ion-icon>\n\n                    </ion-col>\n\n                  </ion-row>\n\n                  <ion-row>\n\n                    <ion-col width-60>\n\n                      <div class="item-description">\n\n                         <ion-icon class="description-icon" name="clock"></ion-icon>\n\n                         <p class="description-text one-line">{{item.time}}</p>\n\n                      </div>\n\n                    </ion-col>\n\n                    <ion-col width-40>\n\n                     <div class="item-description">\n\n                      <ion-icon class="description-icon" name="navigate"></ion-icon>\n\n                      <p class="description-text one-line">{{item.cost}}/</p>\n\n                    </div>\n\n                    </ion-col>\n\n                  </ion-row>\n\n                  <div class="item-description" >\n\n                    <button ion-button small clear \n\n                    style="font-size: 1rem;padding:0px" \n\n                    (click)="ExpandResponse(item);" >\n\n                       View details &nbsp;\n\n                        <ion-icon name="ios-arrow-down"></ion-icon>\n\n                    </button>\n\n                  </div>\n\n                  <ion-row *ngIf="currentDoc ==item.subject">\n\n                    <ion-col width-100>\n\n                      <div class="container">\n\n                        <div class="column-left">\n\n                        <h1>Response</h1><br>\n\n                        <span>Delivery On</span><br>\n\n                        <span>Location</span><br>\n\n                        <span>Mode</span><br>\n\n                        <span>Cost</span>\n\n                        </div>\n\n                        <div class="column-center">\n\n                        <h1>Expected</h1><br>\n\n                        <span>02/7/2017</span><br>\n\n                        <span>Supplier Office</span><br>\n\n                        <span>Cash</span><br>\n\n                        <span>210/-</span>\n\n                        </div>\n\n                        <div class="column-right">\n\n                        <h1>Offered</h1><br>\n\n                        <span>02/7/2017</span><br>\n\n                        <span>Provider Office</span><br>\n\n                        <span>Cash</span><br>\n\n                        <span>220/-</span>\n\n                        </div>\n\n                      </div>\n\n                    </ion-col>\n\n                  </ion-row>\n\n                </div>\n\n              </div>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-item>\n\n      </ion-list>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Responses\responses.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_4__Responses_service__["a" /* ResponsesService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], ResponsesPage);

//# sourceMappingURL=Responses.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ResponsesService = (function () {
    function ResponsesService(http) {
        this.http = http;
    }
    ResponsesService.prototype.getData = function () {
        return this.http.get('./assets/example_data/schedule.json')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ResponsesService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return ResponsesService;
}());
ResponsesService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
], ResponsesService);

//# sourceMappingURL=Responses.service.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobSelectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__JobPrinting_Printing__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__JobOffset_JobOffset__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_appenums__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var JobSelectionPage = (function () {
    function JobSelectionPage(nav, alertCtrl) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.populars = [
            {
                "type": __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].ScreenPrinting,
                "title": "Screen Printing",
                "image": "../assets/images/jobType/ScreenPrinting.jpg"
            },
            {
                "type": __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].OffsetPrinting,
                "title": "Offset Printing",
                "image": "../assets/images/jobType/OffSetPrinting.jpg"
            },
            {
                "type": __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].IdentityCard,
                "title": "Identity Card",
                "image": "../assets/images/jobType/IdentityCard.jpg"
            },
            {
                "type": __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].Binding,
                "title": "Binding",
                "image": "../assets/images/jobType/Binding.jpg"
            },
            {
                "type": __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].DTP,
                "title": "DTP",
                "image": "../assets/images/jobType/DTP.jpg"
            },
            {
                "type": __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].FlexPrinting,
                "title": "Flex Printing",
                "image": "../assets/images/jobType/Flex.jpg"
            }
        ];
        this.printingPage = { component: __WEBPACK_IMPORTED_MODULE_2__JobPrinting_Printing__["a" /* PrintingPage */] };
        this.jobOffsetPage = { component: __WEBPACK_IMPORTED_MODULE_3__JobOffset_JobOffset__["a" /* JobOffsetPage */] };
    }
    JobSelectionPage.prototype.createEvent = function () {
    };
    JobSelectionPage.prototype.onJobSelection = function (job) {
        switch (job.type) {
            case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].ScreenPrinting:
                this.nav.push(this.printingPage.component);
                break;
            case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].OffsetPrinting:
                this.nav.push(this.jobOffsetPage.component);
                break;
            case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].IdentityCard:
                this.nav.push(this.printingPage.component);
                break;
            case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].Binding:
                this.nav.push(this.printingPage.component);
                break;
            case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].DTP:
                this.nav.push(this.printingPage.component);
                break;
            case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].FlexPrinting:
                this.nav.push(this.printingPage.component);
                break;
        }
    };
    return JobSelectionPage;
}());
JobSelectionPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'JobSelection-Page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\JobSelection\JobSelection.html"*/'<style>\n\n  .jboItem{\n\n    padding-bottom: 5px;\n\n    padding-top: 15px;\n\n  }\n\n  </style>\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>New Enquiries</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="forms-examples-content">\n\n  <h4 class="categories-title">Select module</h4>\n\n    <div class="horizontal-categories">\n\n    <ion-row class="categories-row">\n\n      <ion-col width-33 style="padding-bottom:5px;"  class="horizontal-item"  *ngFor="let popular of populars">\n\n       <div class="jboItem" >\n\n        <preload-image [ratio]="{w:1, h:1}" (click)="onJobSelection(popular)" style="height: 50px; width: 50px;margin-left:30px" [src]="popular.image" title="popular.title"></preload-image>\n\n       </div>\n\n       <label >{{popular.title}}</label>\n\n      </ion-col>\n\n    </ion-row>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\JobSelection\JobSelection.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], JobSelectionPage);

//# sourceMappingURL=JobSelection.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__settings_settings__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Modules_Modules__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile_model__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_serviceHelper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_config__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_JobRequest__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_appenums__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__model_datasource_model__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var ProfilePage = (function () {
    function ProfilePage(menu, app, navParams, nav, serviceHelper, loadingCtrl, storage) {
        var _this = this;
        this.menu = menu;
        this.app = app;
        this.navParams = navParams;
        this.nav = nav;
        this.serviceHelper = serviceHelper;
        this.loadingCtrl = loadingCtrl;
        this.storage = storage;
        this.modelList = new __WEBPACK_IMPORTED_MODULE_6__profile_model__["a" /* Modules */]();
        this.profile = new __WEBPACK_IMPORTED_MODULE_6__profile_model__["b" /* ProfileModel */]();
        this.isError = false;
        this.profileImg = "../assets/images/profile/200x200ProfilePic.png";
        this.display = "list";
        this.loading = this.loadingCtrl.create();
        this.modulesPage = { component: __WEBPACK_IMPORTED_MODULE_3__Modules_Modules__["a" /* ModulesPage */] };
        this.storage.get(__WEBPACK_IMPORTED_MODULE_8__app_config__["c" /* StoreKey */].UserId)
            .then(function (value) { return _this.userId = value; }).catch(function () { _this.errorMsg = "User not found!", _this.isError = true; });
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loading.present();
        setTimeout(function () {
            _this.LoadUserDetails();
            _this.LoadUsersModules();
        }, 1000);
    };
    ProfilePage.prototype.LoadUserDetails = function () {
        var _this = this;
        this.serviceHelper
            .GetViews(this.CreateProfileRequest())
            .then(function (response) {
            _this.profile.user = response.Value.Data[0];
            _this.loading.dismiss();
        });
    };
    ProfilePage.prototype.LoadUsersModules = function () {
        var _this = this;
        this.serviceHelper
            .GetViews(this.CreateModulesRequest())
            .then(function (response) {
            _this.modelList.modules = response.Value.Data;
        });
    };
    ProfilePage.prototype.CreateProfileRequest = function () {
        var request = new __WEBPACK_IMPORTED_MODULE_9__model_JobRequest__["d" /* JobGetsRequest */]();
        request.JobType = __WEBPACK_IMPORTED_MODULE_10__model_appenums__["b" /* JobType */].ViewDocument;
        request.ViewId = __WEBPACK_IMPORTED_MODULE_10__model_appenums__["e" /* ViewsType */].ViewUserProfile;
        var prop1 = new __WEBPACK_IMPORTED_MODULE_11__model_datasource_model__["b" /* Filter */]("UserId", __WEBPACK_IMPORTED_MODULE_10__model_appenums__["c" /* Operators */].Equals, this.userId);
        request.Filters.push(prop1);
        return request;
    };
    ProfilePage.prototype.CreateModulesRequest = function () {
        var request = new __WEBPACK_IMPORTED_MODULE_9__model_JobRequest__["d" /* JobGetsRequest */]();
        request.JobType = __WEBPACK_IMPORTED_MODULE_10__model_appenums__["b" /* JobType */].ViewDocument;
        request.ViewId = __WEBPACK_IMPORTED_MODULE_10__model_appenums__["e" /* ViewsType */].ViewModuleMaster;
        request.Filters.push(new __WEBPACK_IMPORTED_MODULE_11__model_datasource_model__["b" /* Filter */]("IsUsed", __WEBPACK_IMPORTED_MODULE_10__model_appenums__["c" /* Operators */].Equals, true)); //Used Models
        return request;
    };
    ProfilePage.prototype.goToSettings = function () {
        // close the menu when clicking a link from the menu
        this.menu.close();
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__settings_settings__["a" /* SettingsPage */]);
    };
    ProfilePage.prototype.onAddModules = function () {
        this.nav.push(this.modulesPage.component);
    };
    ProfilePage.prototype.onSegmentChanged = function (segmentButton) {
        // console.log('Segment changed to', segmentButton.value);
    };
    ProfilePage.prototype.onSegmentSelected = function (segmentButton) {
        // console.log('Segment selected', segmentButton.value);
    };
    return ProfilePage;
}());
ProfilePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'profile-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\profile\profile.html"*/'<ion-header class="listing-header">\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Account</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="profile-content">\n  <div class="user-details">\n    <ion-row class="user-main-data-row">\n      <ion-col no-padding width-30>\n        <preload-image class="user-image" [ratio]="{w:1, h:1}" [src]="profileImg" alt="" title=""></preload-image>\n      </ion-col>\n      <ion-col no-padding>\n        <ion-row wrap class="user-bio-row">\n          <ion-col no-padding width-90>\n            <h2 class="user-name">{{profile.user.Name}}</h2>\n          </ion-col>\n          <br/>\n          <ion-col no-padding width-30>\n            <h2 class="user-description">Company</h2>\n          </ion-col>\n           <ion-col no-padding width-60>\n            <h2 class="user-description">:&nbsp;{{profile.user.CompanyName}}</h2>\n          </ion-col>\n          <ion-col no-padding width-30>\n            <h2 class="user-description">Email</h2>\n          </ion-col>\n          <ion-col no-padding width-60>\n            <h2 class="user-description">:&nbsp;{{profile.user.Email}}</h2>\n          </ion-col>\n          <ion-col no-padding width-30>\n            <h2 class="user-description">Phone</h2>\n          </ion-col>\n          <ion-col no-padding width-60>\n            <h2 class="user-description">:&nbsp;{{profile.user.PhoneNo}}</h2>\n          </ion-col>\n          <ion-col no-padding width-90>\n            <p class="user-description">\n              Address:<br/>\n            {{profile.user.AddressLine1}},{{profile.user.AddressLine2}} <br/>\n            {{profile.user.CityName}}, {{profile.user.StateName}}\n            </p>\n          </ion-col>\n        </ion-row>\n        \n      </ion-col>\n    </ion-row>\n    <div class="user-details">\n    <ion-row class="user-main-data-row ">\n          <ion-col no-padding class="profile-action-row">\n            <button ion-button block small (click)="goToSettings()">\n              Edit profile\n            </button>\n          </ion-col>\n    </ion-row>\n    </div>\n  </div>\n  <div class="list-mini-content">\n    <ion-item-group>\n    <ion-item-divider class="notifications-divider">Modules</ion-item-divider>\n  <div class="list-mini">\n    <ion-list>\n      <button class="list-item" ion-item *ngFor="let item of modelList.modules">\n        <ion-row no-padding class="content-row one-line">\n          <!-- You can limit the rows of the description by using the class one-line. If you remove it, all the content from the row will be shown -->\n          <ion-col no-padding width-18 class="item-avatar">\n            <preload-image class="avatar-image" [ratio]="{w:1, h:1}" [src]="item.image"></preload-image>\n          </ion-col>\n          <ion-col no-padding width-60 class="item-content">\n            <h3 class="item-title">{{item.Name}}</h3>\n            <p class="item-description">Valid From :{{item.PaymentDate}}</p>\n            <p class="item-description">Valid Till :{{item.TillDate}}</p>\n          </ion-col>\n         <button style="margin: 7px;" ion-button small outline>Renew</button>\n        </ion-row>\n      </button>\n    </ion-list>\n  </div>\n  </ion-item-group>\n  </div>\n<ion-fab bottom right>\n <button mini ion-fab (click)="onAddModules()" >\n  <ion-icon  name="add"></ion-icon>\n </button>\n</ion-fab>\n</ion-content>\n\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\profile\profile.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_7__services_serviceHelper__["a" /* ServiceHelper */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
], ProfilePage);

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_loginService__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__terms_of_service_terms_of_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__privacy_policy_privacy_policy__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__address_address__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_login_model__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_config__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var SignupPage = (function () {
    function SignupPage(nav, modal, loginService, storage, alertCtr, loadingCtrl) {
        this.nav = nav;
        this.modal = modal;
        this.loginService = loginService;
        this.storage = storage;
        this.alertCtr = alertCtr;
        this.loadingCtrl = loadingCtrl;
        this.address_page = { component: __WEBPACK_IMPORTED_MODULE_7__address_address__["a" /* AddressPage */] };
        this.loading = this.loadingCtrl.create();
        this.signup = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            name: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            phone: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            confirm_password: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required)
        });
        this.storage.clear();
    }
    SignupPage.prototype.doSignup = function () {
        var _this = this;
        var login = new __WEBPACK_IMPORTED_MODULE_8__model_login_model__["b" /* Registration */]();
        login.Name = this.signup.value.name;
        login.Email = this.signup.value.email;
        login.PhoneNo = this.signup.value.phone;
        login.Password = this.signup.value.password;
        login.UserType = "C";
        this.loading.present();
        this.loginService.SignUp(login)
            .then(function (response) { return _this.onSignUpSuccess(response); }, function (error) { return _this.onLoginError(error); });
    };
    SignupPage.prototype.onSignUpSuccess = function (response) {
        var _this = this;
        this.loading.dismiss();
        if (response.Status) {
            this.storage.set(__WEBPACK_IMPORTED_MODULE_9__app_config__["c" /* StoreKey */].AuthKey, response.Value.AuthKey);
            this.storage.set(__WEBPACK_IMPORTED_MODULE_9__app_config__["c" /* StoreKey */].UserId, response.Value.UserId);
            this.nav.push(this.address_page.component);
        }
        else {
            this.ShowAlert("Error", response.Message);
        }
        setTimeout(function () { _this.loading = _this.loadingCtrl.create(); }, 1000);
    };
    SignupPage.prototype.onLoginError = function (error) {
        var _this = this;
        this.loading.dismiss();
        this.ShowAlert("Error", error);
        setTimeout(function () { _this.loading = _this.loadingCtrl.create(); }, 1000);
    };
    SignupPage.prototype.ShowAlert = function (title, msg) {
        var alert = this.alertCtr.create({
            title: title,
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    SignupPage.prototype.showTermsModal = function () {
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_5__terms_of_service_terms_of_service__["a" /* TermsOfServicePage */]);
        modal.present();
    };
    SignupPage.prototype.showPrivacyModal = function () {
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_6__privacy_policy_privacy_policy__["a" /* PrivacyPolicyPage */]);
        modal.present();
    };
    return SignupPage;
}());
SignupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'signup-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\signup\signup.html"*/'<ion-header class="signup-header auth-header">\n  <ion-navbar>\n    <ion-title>Sign up</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="signup-content auth-content">\n  <h2 class="auth-title">Create an account</h2>\n  <form class="signup-form auth-form" [formGroup]="signup" (ngSubmit)="doSignup()">\n    <ion-item>\n      <ion-label color="primary" floating>Name</ion-label>\n      <ion-input type="text" formControlName="name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary" floating>Phone</ion-label>\n      <ion-input type="tel" formControlName="phone"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary" floating>Email</ion-label>\n      <ion-input type="email" formControlName="email"></ion-input>\n    </ion-item>\n    <show-hide-container>\n      <ion-item>\n         <ion-label color="primary" floating>Password</ion-label>\n        <ion-input type="password" formControlName="password" show-hide-input></ion-input>\n      </ion-item>\n    </show-hide-container>\n    <show-hide-container>\n      <ion-item>\n        <ion-label color="primary" floating>Confirm password</ion-label>\n        <ion-input type="password" formControlName="confirm_password" show-hide-input></ion-input>\n      </ion-item>\n    </show-hide-container>\n    <button ion-button block class="auth-action-button signup-button" type="submit" [disabled]="!signup.valid">Sign up</button>\n  </form>\n  <p class="legal-stuff">\n    By creating an account you agree to our <a class="legal-action" (click)="showPrivacyModal()">Privacy policy</a> and <a class="legal-action" (click)="showTermsModal()">Terms of use</a>\n  </p>\n</ion-content>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\signup\signup.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_4__services_loginService__["a" /* LoginService */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], SignupPage);

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_login_model__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_serviceHelper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_config__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_appenums__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_appcommon__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_datasource_model__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var AddressPage = (function () {
    function AddressPage(navCtrl, navParams, alertCtr, serviceHelper, storage, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtr = alertCtr;
        this.serviceHelper = serviceHelper;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.states = [];
        this.cites = [];
        this.errorMsg = "Auth error";
        this.isError = false;
        this.main_page = { component: __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */] };
        this.loading = this.loadingCtrl.create();
        this.address = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            companyName: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            address1: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            address2: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            pincode: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            state: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            city: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
        });
        this.storage.get(__WEBPACK_IMPORTED_MODULE_7__app_config__["c" /* StoreKey */].UserId)
            .then(function (value) { return _this.userId = value; })
            .catch(function () { _this.errorMsg = "User not found!", _this.isError = true; });
        this.storage.get(__WEBPACK_IMPORTED_MODULE_7__app_config__["c" /* StoreKey */].AuthKey)
            .then(function (value) { return __WEBPACK_IMPORTED_MODULE_9__model_appcommon__["a" /* AppCommon */].HoldAuthKey = value; })
            .catch(function () { _this.errorMsg = "User not found!", _this.isError = true; });
    }
    AddressPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        setTimeout(function () { _this.GetStates(1); }, 1000);
    };
    AddressPage.prototype.GetStates = function (id) {
        var _this = this;
        var orders = [];
        orders.push(new __WEBPACK_IMPORTED_MODULE_10__model_datasource_model__["d" /* Shorting */]("Name", __WEBPACK_IMPORTED_MODULE_8__model_appenums__["d" /* SortingType */].Asc));
        var request = __WEBPACK_IMPORTED_MODULE_9__model_appcommon__["a" /* AppCommon */].CreateGetsRequest(__WEBPACK_IMPORTED_MODULE_8__model_appenums__["b" /* JobType */].StateMaster, [], orders);
        this.serviceHelper.GetsJob(request)
            .then(function (response) { return _this.OnStateSuccess(response); }, function (error) { return _this.OnError(error); });
    };
    AddressPage.prototype.GetCities = function (id) {
        var _this = this;
        var filter = [];
        filter.push(new __WEBPACK_IMPORTED_MODULE_10__model_datasource_model__["b" /* Filter */]("StateId", __WEBPACK_IMPORTED_MODULE_8__model_appenums__["c" /* Operators */].Equals, id));
        var orders = [];
        orders.push(new __WEBPACK_IMPORTED_MODULE_10__model_datasource_model__["d" /* Shorting */]("Name", __WEBPACK_IMPORTED_MODULE_8__model_appenums__["d" /* SortingType */].Asc));
        var request = __WEBPACK_IMPORTED_MODULE_9__model_appcommon__["a" /* AppCommon */].CreateGetsRequest(__WEBPACK_IMPORTED_MODULE_8__model_appenums__["b" /* JobType */].CityMaster, filter, orders);
        this.serviceHelper.GetsJob(request)
            .then(function (response) { return _this.OnCitySuccess(response); }, function (error) { return _this.OnError(error); });
    };
    AddressPage.prototype.OnStateSuccess = function (response) {
        if (response.Status) {
            this.states = response.Value.Data.map(function (item) { return new __WEBPACK_IMPORTED_MODULE_10__model_datasource_model__["c" /* MasterDataSource */](item); });
        }
        else {
            this.ShowAlert("Error", response.Message);
        }
    };
    AddressPage.prototype.OnCitySuccess = function (response) {
        if (response.Status) {
            this.cites = response.Value.Data.map(function (item) { return new __WEBPACK_IMPORTED_MODULE_10__model_datasource_model__["c" /* MasterDataSource */](item); });
        }
        else {
            this.ShowAlert("Error", response.Message);
        }
    };
    AddressPage.prototype.onStateChange = function (event) {
        if (!isNaN(event)) {
            this.GetCities(event);
        }
    };
    AddressPage.prototype.doSignUp = function () {
        var _this = this;
        if (this.isError) {
            this.ShowAlert("Error", this.errorMsg);
            return false;
        }
        this.loading.present();
        var userAddress = new __WEBPACK_IMPORTED_MODULE_5__model_login_model__["c" /* UserAddress */]();
        userAddress.CompanyName = this.address.value.companyName;
        userAddress.AddressLine1 = this.address.value.address1;
        userAddress.AddressLine2 = this.address.value.address2;
        userAddress.StateId = this.address.value.state;
        userAddress.CityId = this.address.value.city;
        userAddress.Pincode = this.address.value.pincode;
        userAddress.UserId = this.userId;
        console.log(this.address.value);
        this.serviceHelper.UserDetails(userAddress)
            .then(function (response) { return _this.onDetailsSuccess(response); }, function (error) { return _this.OnError(error); });
    };
    AddressPage.prototype.onDetailsSuccess = function (response) {
        var _this = this;
        this.loading.dismiss();
        if (response.Status) {
            this.navCtrl.setRoot(this.main_page.component);
        }
        else {
            this.ShowAlert("Error", response.Message);
        }
        setTimeout(function () { _this.loading = _this.loadingCtrl.create(); }, 1000);
    };
    AddressPage.prototype.OnError = function (error) {
        var _this = this;
        this.loading.dismiss();
        this.ShowAlert("Error", error);
        setTimeout(function () { _this.loading = _this.loadingCtrl.create(); }, 1000);
    };
    AddressPage.prototype.ShowAlert = function (title, msg) {
        var alert = this.alertCtr.create({
            title: title,
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    return AddressPage;
}());
AddressPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-address',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\address\address.html"*/'<ion-header class="signup-header auth-header">\n  <ion-navbar>\n    <ion-title>Sign up</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content class="login-content auth-content">\n  <h2 class="auth-title">Address Details</h2>\n  <form class="login-form auth-form" [formGroup]="address" (ngSubmit)="doSignUp()">\n    <ion-item>\n      <ion-label color="primary" floating>Company Name</ion-label>\n      <ion-input type="text" formControlName="companyName"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label color="primary" floating>Address Line1</ion-label>\n      <ion-input type="text" formControlName="address1"></ion-input>\n    </ion-item>\n      <ion-item>\n        <ion-label color="primary" floating>Address Line2</ion-label>\n        <ion-input type="text" formControlName="address2"></ion-input>\n      </ion-item>\n      <ion-item>\n      <ion-label color="primary" floating >State</ion-label>\n      <ion-select formControlName="state">\n        <ion-option (ionSelect)="onStateChange($event)" *ngFor="let state of states" \n                    [value]="state.Value" >{{state.Name}}</ion-option>\n      </ion-select>\n   </ion-item>\n   <ion-item>\n      <ion-label color="primary" floating >City</ion-label>\n      <ion-select formControlName="city" >\n        <ion-option *ngFor="let city of cites"\n            [value]="city.Value">\n            {{city.Name}}\n        </ion-option>\n      </ion-select>\n   </ion-item>\n    <ion-item>\n        <ion-label color="primary" floating>Pincode</ion-label>\n        <ion-input type="number" formControlName="pincode"></ion-input>\n      </ion-item>\n    <button ion-button block class="auth-action-button login-button" [disabled]="!address.valid" type="submit">Sign Up</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\address\address.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_6__services_serviceHelper__["a" /* ServiceHelper */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], AddressPage);

//# sourceMappingURL=address.js.map

/***/ }),

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ForgotPasswordPage = (function () {
    function ForgotPasswordPage(nav) {
        this.nav = nav;
        this.main_page = { component: __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */] };
        this.forgot_password = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            email: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required)
        });
    }
    ForgotPasswordPage.prototype.recoverPassword = function () {
        console.log(this.forgot_password.value);
        this.nav.setRoot(this.main_page.component);
    };
    return ForgotPasswordPage;
}());
ForgotPasswordPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'forgot-password-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\forgot-password\forgot-password.html"*/'<ion-header class="forgot-password-header auth-header">\n  <ion-navbar>\n    <ion-title>Forgot Password?</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="forgot-password-content auth-content">\n  <h2 class="auth-title">Recover your password</h2>\n  <p class="recover-message">\n    Please enter your email address and we\'ll send you an email to reset your password.\n  </p>\n  <form class="forgot-password-form auth-form" [formGroup]="forgot_password" (ngSubmit)="recoverPassword()">\n    <ion-item>\n      <ion-input type="email" placeholder="Email" formControlName="email"></ion-input>\n    </ion-item>\n    <button ion-button block class="auth-action-button recover-password-button" type="submit" [disabled]="!forgot_password.valid">Reset password</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\forgot-password\forgot-password.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]])
], ForgotPasswordPage);

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export UserModel */
/* unused harmony export ProfilePostModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProfileModel; });
/* unused harmony export ListModel */
/* unused harmony export List2Model */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Modules; });
/* unused harmony export Module */
var UserModel = (function () {
    function UserModel() {
    }
    return UserModel;
}());

var ProfilePostModel = (function () {
    function ProfilePostModel() {
        this.likes = 0;
        this.comments = 0;
        this.liked = false;
    }
    return ProfilePostModel;
}());

var ProfileModel = (function () {
    function ProfileModel() {
        this.user = new UserModel();
        this.following = [];
        this.followers = [];
        this.posts = [];
    }
    return ProfileModel;
}());

var ListModel = (function () {
    function ListModel() {
    }
    return ListModel;
}());

var List2Model = (function () {
    function List2Model() {
    }
    return List2Model;
}());

var Modules = (function () {
    function Modules() {
        this.modules = [];
    }
    return Modules;
}());

var Module = (function () {
    function Module() {
    }
    return Module;
}());

//# sourceMappingURL=profile.model.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModulesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Bye_Bye__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_serviceHelper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Modules_model__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_JobRequest__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_appenums__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_datasource_model__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ModulesPage = (function () {
    function ModulesPage(nav, alertCtrl, serviceHelper, loadingCtrl) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.serviceHelper = serviceHelper;
        this.loadingCtrl = loadingCtrl;
        this.modules = new __WEBPACK_IMPORTED_MODULE_4__Modules_model__["a" /* Modules */]();
        this.byeList = [];
        this.Total = "0.00";
        this.Offer = "0.00";
        this.GrandTotal = "0.00";
        this.enableBye = false;
        this.offers = new __WEBPACK_IMPORTED_MODULE_4__Modules_model__["b" /* Offers */]();
        this.byePage = { component: __WEBPACK_IMPORTED_MODULE_2__Bye_Bye__["a" /* ByePage */] };
        this.loading = this.loadingCtrl.create();
    }
    ModulesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading.present();
        this.serviceHelper
            .GetViews(this.ModuleMasterRequest())
            .then(function (response) {
            _this.modules.modules = response.Value.Data;
            _this.loading.dismiss();
        });
        this.serviceHelper
            .GetOffers(true)
            .then(function (response) {
            _this.offers.offers = response.Value;
        });
    };
    ModulesPage.prototype.ModuleMasterRequest = function () {
        var request = new __WEBPACK_IMPORTED_MODULE_5__model_JobRequest__["d" /* JobGetsRequest */]();
        request.JobType = __WEBPACK_IMPORTED_MODULE_6__model_appenums__["b" /* JobType */].ViewDocument;
        request.ViewId = __WEBPACK_IMPORTED_MODULE_6__model_appenums__["e" /* ViewsType */].ViewModuleMaster;
        request.Filters.push(new __WEBPACK_IMPORTED_MODULE_7__model_datasource_model__["b" /* Filter */]("IsUsed", __WEBPACK_IMPORTED_MODULE_6__model_appenums__["c" /* Operators */].Equals, false)); //Used Models
        return request;
    };
    ModulesPage.prototype.AddToBye = function (item) {
        this.byeList.push(item);
        this.byeList = this.byeList.filter(function (t) { return t.Checked == true; });
        this.CallTotal();
        this.enableBye = true;
    };
    ModulesPage.prototype.CallTotal = function () {
        var total = 0;
        this.byeList.forEach(function (item) {
            total += item.Cost;
        });
        this.Total = total.toFixed(2);
        this.Offer = this.CallOffer().toFixed(2);
        var grandTotal = parseFloat(this.Total) - parseFloat(this.Total) * (parseFloat(this.Offer) / 100);
        this.GrandTotal = grandTotal.toFixed(2);
    };
    ModulesPage.prototype.CallOffer = function () {
        var offer = 0;
        var count = this.byeList.length;
        this.offers.offers.forEach(function (item) {
            if (count >= item.OfferCount)
                offer = item.OfferPercentage;
        });
        return offer;
    };
    ModulesPage.prototype.onByeClick = function () {
        this.nav.push(this.byePage.component, { list: this.byeList, pay: this.GrandTotal });
    };
    return ModulesPage;
}());
ModulesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'modules-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Modules\modules.html"*/'<style>\n   .section-title {\n    margin-top: 5px;\n    text-align: left;\n}\n  .notifications-content{\n    font-size: 1.2rem;\n    font-weight: 500;\n    letter-spacing: 0.9px;\n    color: #5e5874;\n}\n</style>\n<ion-header>\n  <ion-navbar>\n    <ion-title>Modules</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="forms-examples-content">\n  <div  class="event-example-view">\n  <div class="sample-form event-form" >\n        <ion-list>\n          <ion-item-group>\n          <ion-item-divider class="notifications-content" >Offers</ion-item-divider>\n           <section class="form-section">\n          <ion-chip color="secondary" *ngFor="let item of offers.offers" >\n              <ion-icon color="danger" name="heart"></ion-icon>\n              <ion-label color="dark">{{item.Description}}</ion-label>\n          </ion-chip>\n           </section>\n          </ion-item-group>\n        </ion-list>\n        <ion-list>\n          <ion-item-group>\n          <ion-item-divider class="notifications-content" >Modules</ion-item-divider>\n          <section class="form-section">\n          <ion-item *ngFor="let item of modules.modules">\n            <ion-label>{{item.Name}}</ion-label>\n            <ion-label style="text-align: right;" >{{item.Cost}}/-</ion-label>\n            <ion-checkbox [(ngModel)]="item.Checked"\n               (ionChange)="AddToBye(item);">\n             </ion-checkbox>\n          </ion-item>\n          </section>\n        <hr>\n        <section class="form-section">\n          <ion-item>\n            <ion-label style="text-align: right;" >Total : {{Total}}/-</ion-label>\n          </ion-item>\n          <ion-item>\n            <ion-label style="text-align: right;" >Offer : {{Offer}}%</ion-label>\n          </ion-item>\n          <ion-item>\n            <ion-label style="text-align: right;" >Grand Total : {{GrandTotal}}/-</ion-label>\n          </ion-item>\n        </section>\n          </ion-item-group>\n        </ion-list>\n        <section class="form-section">\n          <ion-row no-padding class="multi-input-row">\n              <ion-col no-padding>\n                  <button ion-button block class="form-action-button create-event-button" (click)="onByeClick()" [disabled]="!enableBye" >Bay!</button>\n              </ion-col>\n          </ion-row>\n        </section>\n  </div>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Modules\modules.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__services_serviceHelper__["a" /* ServiceHelper */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], ModulesPage);

//# sourceMappingURL=Modules.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ByePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Payment_Payment__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_serviceHelper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Bye_modul__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_JobRequest__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ByePage = (function () {
    function ByePage(nav, alertCtrl, loadingCtrl, serviceHelper, navParams, modal) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.serviceHelper = serviceHelper;
        this.navParams = navParams;
        this.modal = modal;
        this.moduleList = [];
        this.offers = new __WEBPACK_IMPORTED_MODULE_4__Bye_modul__["a" /* Offers */]();
        this.byeList = [];
        this.forMonths = 1;
        this.paymentPage = { component: __WEBPACK_IMPORTED_MODULE_2__Payment_Payment__["a" /* PaymentPage */] };
        this.loading = loadingCtrl.create();
        this.byeList = this.navParams.get('list');
        this.grandTotal = parseFloat(this.navParams.get('pay')).toFixed(2);
    }
    ByePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading.present();
        this.serviceHelper
            .GetOffers(false)
            .then(function (response) {
            _this.offers.offers = response.Value;
            _this.ShortArray();
            _this.CallOfferValues();
            _this.loading.dismiss();
        });
    };
    ByePage.prototype.ShortArray = function () {
        this.offers.offers = this.offers.offers.sort(function (obj1, obj2) {
            if (obj1.OfferCount > obj2.OfferCount) {
                return 1;
            }
            if (obj1.OfferCount < obj2.OfferCount) {
                return -1;
            }
            return 0;
        });
    };
    ByePage.prototype.CallOfferValues = function () {
        var _this = this;
        this.offers.offers.forEach(function (element) {
            var total = (parseFloat(_this.grandTotal) * element.OfferCount);
            element.OfferCost = (total - (total * element.OfferPercentage / 100)).toFixed(2);
            if (element.OfferCount == 1) {
                element.Checked = true;
                _this.payAmount = element.OfferCost;
            }
        });
    };
    ByePage.prototype.OfferSelected = function (item) {
        this.payAmount = item.OfferCost;
        this.forMonths = item.OfferCount;
    };
    ByePage.prototype.GotoPaymentModal = function () {
        var initPayment = new __WEBPACK_IMPORTED_MODULE_5__model_JobRequest__["a" /* InItPayment */]();
        initPayment.Amount = parseFloat(parseFloat(this.payAmount).toFixed(2));
        initPayment.Months = this.forMonths;
        initPayment.ProductIds = [];
        var productInfo = [];
        this.byeList.forEach(function (element) {
            initPayment.ProductIds.push(element.Id);
            productInfo.push(element.Name);
        });
        initPayment.ProductInfo = productInfo.toString();
        // this.nav.push(this.paymentPage.component,{"payment":initPayment});
        var modal = this.modal.create(__WEBPACK_IMPORTED_MODULE_2__Payment_Payment__["a" /* PaymentPage */], { "payment": initPayment });
        modal.present();
    };
    return ByePage;
}());
ByePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'bye-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Bye\Bye.html"*/'<style>\n   .section-title {\n    margin-top: 5px;\n    text-align: left;\n}\n  .notifications-content{\n    font-size: 1.2rem;\n    font-weight: 500;\n    letter-spacing: 0.9px;\n    color: #5e5874;\n}\n  .radio-md {\n    margin-top: 13px !important;\n}\n</style>\n<ion-header>\n  <ion-navbar>\n    <ion-title>Offers</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="forms-examples-content">\n  <div  class="event-example-view">\n  <div class="sample-form event-form">\n        <ion-list radio-group >\n          <ion-item-group>\n          <ion-item-divider class="notifications-content" >Modules</ion-item-divider>\n          <section class="form-section">\n          <ion-row *ngFor="let item of offers.offers">\n            <ion-col width-10>\n              <ion-radio [value]="item.OfferCount" (ionSelect)="OfferSelected(item);" [checked]="item.Checked"></ion-radio>\n              </ion-col>\n               <ion-col width-25>\n               <ion-label>{{item.OfferCost}}/-</ion-label>\n              </ion-col>\n              <ion-col width-65>\n                <button style="float:right;width: 100%;" ion-button round outline>{{item.Description}}\n                </button>\n              </ion-col>\n            </ion-row>\n          </section>\n        <hr>\n        </ion-item-group>\n        <ion-item-group>\n        <ion-item-divider class="notifications-content" >Payment Details</ion-item-divider>\n        <section class="form-section">\n          <ion-item>\n            <ion-label style="text-align: right;" >Total amount  : {{payAmount}}/-</ion-label>\n          </ion-item>\n        </section>\n        </ion-item-group>\n        <hr>\n        </ion-list>\n        <section class="form-section">\n          <ion-row no-padding class="multi-input-row">\n              <ion-col no-padding>\n                  <button ion-button block class="form-action-button create-event-button" (click)="GotoPaymentModal();"  >Bay!</button>\n              </ion-col>\n          </ion-row>\n        </section>\n  </div>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Bye\Bye.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__services_serviceHelper__["a" /* ServiceHelper */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], ByePage);

//# sourceMappingURL=Bye.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_serviceHelper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_config__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import {ThemeableBrowser} from '@ionic-native/themeable-browser';




var PaymentPage = (function () {
    function PaymentPage(nav, alertCtrl, iab, loadingCtrl, serviceHelper, navParams, storage) {
        var _this = this;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.iab = iab;
        this.loadingCtrl = loadingCtrl;
        this.serviceHelper = serviceHelper;
        this.navParams = navParams;
        this.storage = storage;
        this.errorMsg = "Auth error";
        this.isError = true;
        this.loading = loadingCtrl.create();
        this.paymentOptions = this.navParams.get('payment');
        this.storage.get(__WEBPACK_IMPORTED_MODULE_5__app_config__["c" /* StoreKey */].AuthKey)
            .then(function (value) { return _this.authKey = value; })
            .catch(function () { _this.errorMsg = "Auntaction key not found!", _this.isError = true; });
    }
    PaymentPage.prototype.ionViewWillEnter = function () {
        // this.loading.present();
        // this.serviceHelper
        //   .PaymentInIt(this.paymentOptions)
        //   .then(response => {
        //     this.loading.dismiss();
        this.LoadPayment();
        //   });
    };
    PaymentPage.prototype.LoadPayment = function () {
        // var pageContent = '<html><head></head><body>'+ status.FormData +'<script type="text/javascript">document.getElementById("PostForm").submit();</script></body></html>';
        // var pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
        var params = "amount=" + this.paymentOptions.Amount + "&Pinfo=" + this.paymentOptions.ProductInfo + "&PIds=" + this.paymentOptions.ProductIds.toString() + "&months=" + this.paymentOptions.Months + "&auth=" + this.authKey;
        var browser = this.iab.create(__WEBPACK_IMPORTED_MODULE_5__app_config__["a" /* AppConfig */].BaseUrl + 'views/payU.html?' + params, '_self', { location: 'yes' });
        // var browserRef = window.cordova.InAppBrowser.open(
        //     pageContentUrl ,
        //     "_blank",
        //     "hidden=no,location=no,clearsessioncache=yes,clearcache=yes"
        // );
        //   const browser = this.iab.create('http://localhost:44300/views/pay.html','_self',{location:'no'}); 
        // browser.on("aa").subscribe(
        //  () => {
        //         console.log("Success");
        //         browser.close();
        //     },
        //     err => {
        //         console.log("InAppBrowser loadstart Event Error: " + err);
        //     }
        // );
    };
    PaymentPage.prototype.createEvent = function () {
    };
    PaymentPage.prototype.onRespondClick = function () {
    };
    return PaymentPage;
}());
PaymentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'payment-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Payment\payment.html"*/'<ion-header class="terms-header legal-header">\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Terms of Service\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="forms-examples-content">\n  <div  class="event-example-view">\n      <h1>Loading....</h1>\n  </div>\n</ion-content>'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Payment\payment.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_browser__["a" /* InAppBrowser */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_3__services_serviceHelper__["a" /* ServiceHelper */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
], PaymentPage);

//# sourceMappingURL=Payment.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__notification_model__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_JobRequest__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_appenums__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__JobPrinting_Printing__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_serviceHelper__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var NotificationPage = (function () {
    function NotificationPage(nav, serviceHelper, loadingCtrl) {
        this.nav = nav;
        this.serviceHelper = serviceHelper;
        this.loadingCtrl = loadingCtrl;
        this.notifications = new __WEBPACK_IMPORTED_MODULE_3__notification_model__["a" /* NotificationList */]();
        this.segment = "Active";
        this.loading = this.loadingCtrl.create();
        this.printingPage = { component: __WEBPACK_IMPORTED_MODULE_6__JobPrinting_Printing__["a" /* PrintingPage */] };
    }
    NotificationPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        setTimeout(function () { _this.GetNotifications(); }, 1000);
    };
    NotificationPage.prototype.GetNotifications = function () {
        var _this = this;
        this.loading.present();
        this.serviceHelper
            .GetViews(this.CreateNotificationsRequest())
            .then(function (response) {
            //this.notifications.notifications = response.Value.Data;
            // this.enquiries.responded = data.responded;
            _this.loading.dismiss();
        });
    };
    NotificationPage.prototype.CreateNotificationsRequest = function () {
        var request = new __WEBPACK_IMPORTED_MODULE_4__model_JobRequest__["d" /* JobGetsRequest */]();
        request.JobType = __WEBPACK_IMPORTED_MODULE_5__model_appenums__["b" /* JobType */].ViewDocument;
        request.ViewId = __WEBPACK_IMPORTED_MODULE_5__model_appenums__["e" /* ViewsType */].ViewNotifications;
        return request;
    };
    NotificationPage.prototype.onNotifactionClick = function (item) {
        this.nav.push(this.printingPage.component);
    };
    NotificationPage.prototype.GoToJobPage = function (item) {
        switch (item.JobTypeId) {
            case __WEBPACK_IMPORTED_MODULE_5__model_appenums__["b" /* JobType */].ScreenPrinting:
                this.nav.push(this.printingPage.component, { id: item.Id });
                break;
            case __WEBPACK_IMPORTED_MODULE_5__model_appenums__["b" /* JobType */].OffsetPrinting:
                this.nav.push(this.jobOffsetPage.component, { id: item.Id });
                break;
        }
    };
    NotificationPage.prototype.onSegmentChanged = function (segmentButton) {
        // console.log('Segment changed to', segmentButton.value);
    };
    NotificationPage.prototype.onSegmentSelected = function (segmentButton) {
        // console.log('Segment selected', segmentButton.value);
    };
    return NotificationPage;
}());
NotificationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'notification-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\notification\notification.html"*/'<style>\n\n  .col{\n\n    padding:0px;\n\n  }\n\n</style>\n\n\n\n<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Notifications</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="notification-content">\n\n  <ion-segment class="notification-segment" [(ngModel)]="segment" (ionChange)="onSegmentChanged($event)">\n\n    <ion-segment-button value="Active" (ionSelect)="onSegmentSelected($event)">\n\n      Active Enquiries\n\n    </ion-segment-button>\n\n    <ion-segment-button value="Active" (ionSelect)="onSegmentSelected($event)">\n\n      Responded Enquiries\n\n    </ion-segment-button>\n\n  </ion-segment>\n\n\n\n  <div [ngSwitch]="segment">\n\n    <div *ngSwitchCase="\'Active\'">\n\n      <ion-list class="notification-list">\n\n        <ion-item class="notification-item" *ngFor="let item of notifications.notifications">\n\n          <ion-row>\n\n            <ion-col width-15 class="notification-date">\n\n              <h2 class="notification-day">{{item.DocDay}}</h2>\n\n              <h3 class="notification-month">{{item.DocMonth}}</h3>\n\n              <h4 class="notification-time">{{item.DocTime}}</h4>\n\n            </ion-col>\n\n            <ion-col width-85 class="notification-data">\n\n              <div class="data-item">\n\n                <div class="item-content">\n\n                  <h2 class="item-title one-line">{{item.DocName}}</h2>\n\n                  <ion-row>\n\n                    <ion-col width-90>\n\n                      <div class="item-description">\n\n                      <p class="description-text">{{item.JobType}}</p>\n\n                    </div>\n\n                    </ion-col>\n\n                    <ion-col width-10>\n\n                      <ion-icon style="font-size: 1.6em;"  class="item-icon" name="arrow-forward" (click)=\'onNotifactionClick(item);\' ></ion-icon>\n\n                    </ion-col>\n\n                  </ion-row>\n\n                  \n\n                  <ion-row>\n\n                    <ion-col width-60>\n\n                      <div class="item-description">\n\n                      <ion-icon class="description-icon" name="clock"></ion-icon>\n\n                      <p class="description-text">{{item.ExpectedDate}}</p>\n\n                  </div>\n\n                    </ion-col>\n\n                     <ion-col width-40>\n\n                      <div class="item-description">\n\n                          <ion-icon class="description-icon" name="navigate"></ion-icon>\n\n                          <p class="description-text one-line">{{item.cost}}/-</p>\n\n                      </div>\n\n                    </ion-col>\n\n                    \n\n                  </ion-row>\n\n                </div>\n\n                \n\n              </div>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-item>\n\n      </ion-list>\n\n    </div>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\notification\notification.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_7__services_serviceHelper__["a" /* ServiceHelper */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
], NotificationPage);

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShowHideInput = (function () {
    function ShowHideInput(el) {
        this.el = el;
        this.type = 'password';
    }
    ShowHideInput.prototype.changeType = function (type) {
        this.type = type;
        this.el.nativeElement.children[0].type = this.type;
    };
    return ShowHideInput;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostBinding */])(),
    __metadata("design:type", String)
], ShowHideInput.prototype, "type", void 0);
ShowHideInput = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[show-hide-input]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
], ShowHideInput);

//# sourceMappingURL=show-hide-input.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(287);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_navigation_tabs_navigation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_forgot_password_forgot_password__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_address_address__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_notification_notification__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_JobPrinting_Printing__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_Enquiries_Enquiries__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_Responed_responed__ = __webpack_require__(604);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_Responses_Responses__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_Modules_Modules__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_Bye_Bye__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_Payment_Payment__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_JobSelection_JobSelection__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_JobOffset_JobOffset__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_terms_of_service_terms_of_service__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_privacy_policy_privacy_policy__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_preload_image_preload_image__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_background_image_background_image__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_show_hide_password_show_hide_container__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_show_hide_password_show_hide_input__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_color_radio_color_radio__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_counter_input_counter_input__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_rating_rating__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_serviceHelper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_Responses_Responses_service__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__services_loginService__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__angular_http__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_splash_screen__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_status_bar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_storage__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_terms_of_service_terms_of_service__["a" /* TermsOfServicePage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_privacy_policy_privacy_policy__["a" /* PrivacyPolicyPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_address_address__["a" /* AddressPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_notification_notification__["a" /* NotificationPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_JobPrinting_Printing__["a" /* PrintingPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_Responed_responed__["a" /* ResponedPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_Enquiries_Enquiries__["a" /* EnquiriesPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_Responses_Responses__["a" /* ResponsesPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_Modules_Modules__["a" /* ModulesPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_Bye_Bye__["a" /* ByePage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_Payment_Payment__["a" /* PaymentPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_JobSelection_JobSelection__["a" /* JobSelectionPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_JobOffset_JobOffset__["a" /* JobOffsetPage */],
            __WEBPACK_IMPORTED_MODULE_23__components_preload_image_preload_image__["a" /* PreloadImage */],
            __WEBPACK_IMPORTED_MODULE_24__components_background_image_background_image__["a" /* BackgroundImage */],
            __WEBPACK_IMPORTED_MODULE_25__components_show_hide_password_show_hide_container__["a" /* ShowHideContainer */],
            __WEBPACK_IMPORTED_MODULE_26__components_show_hide_password_show_hide_input__["a" /* ShowHideInput */],
            __WEBPACK_IMPORTED_MODULE_27__components_color_radio_color_radio__["a" /* ColorRadio */],
            __WEBPACK_IMPORTED_MODULE_28__components_counter_input_counter_input__["a" /* CounterInput */],
            __WEBPACK_IMPORTED_MODULE_29__components_rating_rating__["a" /* Rating */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_33__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_34__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */]),
            __WEBPACK_IMPORTED_MODULE_37__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_profile_profile__["a" /* ProfilePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_signup_signup__["a" /* SignupPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_terms_of_service_terms_of_service__["a" /* TermsOfServicePage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_privacy_policy_privacy_policy__["a" /* PrivacyPolicyPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_address_address__["a" /* AddressPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_notification_notification__["a" /* NotificationPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_JobPrinting_Printing__["a" /* PrintingPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_Responed_responed__["a" /* ResponedPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_Enquiries_Enquiries__["a" /* EnquiriesPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_Responses_Responses__["a" /* ResponsesPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_Modules_Modules__["a" /* ModulesPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_Bye_Bye__["a" /* ByePage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_Payment_Payment__["a" /* PaymentPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_JobSelection_JobSelection__["a" /* JobSelectionPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_JobOffset_JobOffset__["a" /* JobOffsetPage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_30__services_serviceHelper__["a" /* ServiceHelper */],
            __WEBPACK_IMPORTED_MODULE_31__pages_Responses_Responses_service__["a" /* ResponsesService */],
            __WEBPACK_IMPORTED_MODULE_32__services_loginService__["a" /* LoginService */],
            __WEBPACK_IMPORTED_MODULE_35__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_36__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_in_app_browser__["a" /* InAppBrowser */]
        ],
        schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return JobType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ViewsType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataSourceMasters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Operators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SortingType; });
var JobType;
(function (JobType) {
    JobType[JobType["ScreenPrinting"] = 1] = "ScreenPrinting";
    JobType[JobType["Binding"] = 2] = "Binding";
    JobType[JobType["OffsetPrinting"] = 3] = "OffsetPrinting";
    JobType[JobType["IdentityCard"] = 4] = "IdentityCard";
    JobType[JobType["DTP"] = 5] = "DTP";
    JobType[JobType["FlexPrinting"] = 6] = "FlexPrinting";
    ///
    JobType[JobType["StateMaster"] = 51] = "StateMaster";
    JobType[JobType["CityMaster"] = 52] = "CityMaster";
    ///
    JobType[JobType["ViewDocument"] = 101] = "ViewDocument";
})(JobType || (JobType = {}));
var ViewsType;
(function (ViewsType) {
    ViewsType[ViewsType["ViewEnquiries"] = 1] = "ViewEnquiries";
    ViewsType[ViewsType["ViewNotifications"] = 2] = "ViewNotifications";
    ViewsType[ViewsType["ViewUserProfile"] = 3] = "ViewUserProfile";
    ViewsType[ViewsType["ViewModuleMaster"] = 4] = "ViewModuleMaster";
})(ViewsType || (ViewsType = {}));
var DataSourceMasters;
(function (DataSourceMasters) {
    //Screen printing
    DataSourceMasters[DataSourceMasters["PrintJobTypeId"] = 5] = "PrintJobTypeId";
    DataSourceMasters[DataSourceMasters["NoOfColorsId"] = 6] = "NoOfColorsId";
    DataSourceMasters[DataSourceMasters["MaterialTypeId"] = 7] = "MaterialTypeId";
    DataSourceMasters[DataSourceMasters["UMOId"] = 8] = "UMOId";
    DataSourceMasters[DataSourceMasters["OutputTypeId"] = 9] = "OutputTypeId";
    DataSourceMasters[DataSourceMasters["DeliveryAtId"] = 10] = "DeliveryAtId";
    DataSourceMasters[DataSourceMasters["JobSizeId"] = 12] = "JobSizeId";
    DataSourceMasters[DataSourceMasters["PaymentModeId"] = 15] = "PaymentModeId";
    DataSourceMasters[DataSourceMasters["GummingRequestId"] = 16] = "GummingRequestId";
    DataSourceMasters[DataSourceMasters["PastingRequiredId"] = 17] = "PastingRequiredId";
    //Offset printing
    DataSourceMasters[DataSourceMasters["OffsetJobTypeId"] = 11] = "OffsetJobTypeId";
    DataSourceMasters[DataSourceMasters["NoOfPlates"] = 13] = "NoOfPlates";
    DataSourceMasters[DataSourceMasters["ColorsId"] = 24] = "ColorsId";
})(DataSourceMasters || (DataSourceMasters = {}));
var Operators;
(function (Operators) {
    Operators[Operators["Equals"] = 1] = "Equals";
    Operators[Operators["GreaterThan"] = 2] = "GreaterThan";
    Operators[Operators["LessThan"] = 3] = "LessThan";
    Operators[Operators["GreaterThanOrEqual"] = 4] = "GreaterThanOrEqual";
    Operators[Operators["LessThanOrEqual"] = 5] = "LessThanOrEqual";
    Operators[Operators["Contains"] = 5] = "Contains";
    Operators[Operators["StartsWith"] = 6] = "StartsWith";
    Operators[Operators["EndsWith"] = 7] = "EndsWith";
})(Operators || (Operators = {}));
var SortingType;
(function (SortingType) {
    SortingType[SortingType["Asc"] = 1] = "Asc";
    SortingType[SortingType["Desc"] = 2] = "Desc";
})(SortingType || (SortingType = {}));
//# sourceMappingURL=appenums.js.map

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_navigation_tabs_navigation__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_login_login__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(143);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, menu, app, splashScreen, statusBar) {
        var _this = this;
        this.menu = menu;
        this.app = app;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        // make LoginPage the root (or first) page
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_login_login__["a" /* LoginPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.splashScreen.hide();
            _this.statusBar.styleDefault();
        });
        this.pages = [
            { title: 'Home', icon: 'home', component: __WEBPACK_IMPORTED_MODULE_4__pages_tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */] },
        ];
        this.pushPages = [
            { title: 'Settings', icon: 'settings', component: __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */] }
        ];
    }
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // navigate to the new page if it is not the current page
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.pushPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
        this.app.getRootNav().push(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\app\app.html"*/'<ion-menu [content]="content" [swipeEnabled]="false">\n  <ion-content class="menu-content">\n    <ion-list class="menu-list">\n      <button ion-item detail-none *ngFor="let page of pages" (click)="openPage(page)">\n        <ion-icon *ngIf="page.icon" name="{{page.icon}}" item-left></ion-icon>\n        {{page.title}}\n      </button>\n      <button ion-item detail-none *ngFor="let page of pushPages" (click)="pushPage(page)">\n        <ion-icon *ngIf="page.icon" name="{{page.icon}}" item-left></ion-icon>\n        {{page.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipe-back-enabled="false"></ion-nav>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\app\app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EndPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return StoreKey; });
var AppConfig = (function () {
    function AppConfig() {
    }
    return AppConfig;
}());

//public static BaseUrl :string ="http://localhost:44300/";
//public static BaseUrl :string ="http://pmccqa.centralindia.cloudapp.azure.com/";
AppConfig.BaseUrl = "http://aliash002-001-site1.etempurl.com/";
var EndPoints = (function () {
    function EndPoints() {
    }
    return EndPoints;
}());

EndPoints.LOGIN = "api/account/Login";
EndPoints.SIGNUP = "api/account/Register";
EndPoints.USERADDRESS = "api/user/UpdateUserDetail";
EndPoints.USERDETAILS = "api/user/GetUserDetails";
EndPoints.DATASOURCE = "api/DataSource/GetDataSourceValues";
EndPoints.GETJOB = 'api/jobs/GetJob';
EndPoints.GETSJOB = 'api/jobs/GetJobs';
EndPoints.CREATEJOB = 'api/jobs/CreateJob';
EndPoints.UPDATEJOB = 'api/jobs/UpdateJob';
EndPoints.GETVIEWS = 'api/jobs/GetViews';
EndPoints.MODULES = 'api/Module/GetModules';
EndPoints.GETOFFERS = 'api/Offer/GetOffersByModule';
EndPoints.PAYMENTINIT = 'api/PaymentInIt/InitiatePayment';
var StoreKey = (function () {
    function StoreKey() {
    }
    return StoreKey;
}());

StoreKey.AuthKey = "ak";
StoreKey.UserId = "uId";
//# sourceMappingURL=app.config.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return JobGetRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return JobGetsRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return JobCreateRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return JobUpdateRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return ScreenPrinting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return OffSetPrinting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InItPayment; });
var JobGetRequest = (function () {
    function JobGetRequest() {
    }
    return JobGetRequest;
}());

var JobGetsRequest = (function () {
    function JobGetsRequest() {
        this.Filters = [];
        this.Orders = [];
    }
    return JobGetsRequest;
}());

var JobCreateRequest = (function () {
    function JobCreateRequest() {
    }
    return JobCreateRequest;
}());

var JobUpdateRequest = (function () {
    function JobUpdateRequest() {
    }
    return JobUpdateRequest;
}());

var ScreenPrinting = (function () {
    function ScreenPrinting() {
    }
    return ScreenPrinting;
}());

var OffSetPrinting = (function () {
    function OffSetPrinting() {
        this.Plate2Color = 0;
        this.Plate3Color = 0;
        this.Plate4Color = 0;
    }
    return OffSetPrinting;
}());

var InItPayment = (function () {
    function InItPayment() {
    }
    return InItPayment;
}());

//# sourceMappingURL=JobRequest.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsNavigationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Enquiries_Enquiries__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__notification_notification__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_serviceHelper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_config__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TabsNavigationPage = (function () {
    function TabsNavigationPage(storage, serviceHelper) {
        this.storage = storage;
        this.serviceHelper = serviceHelper;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_4__notification_notification__["a" /* NotificationPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__Enquiries_Enquiries__["a" /* EnquiriesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_3__profile_profile__["a" /* ProfilePage */];
        this.storage.get(__WEBPACK_IMPORTED_MODULE_6__app_config__["c" /* StoreKey */].AuthKey).then(function (val) {
            console.log('Your key is', val);
        });
    }
    return TabsNavigationPage;
}());
TabsNavigationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'tabs-navigation',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\tabs-navigation\tabs-navigation.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Notifications" tabIcon="notifications">\n  </ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Enquiries" tabIcon="apps"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Account" tabIcon="person"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\tabs-navigation\tabs-navigation.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__services_serviceHelper__["a" /* ServiceHelper */]])
], TabsNavigationPage);

//# sourceMappingURL=tabs-navigation.js.map

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EnquiryModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnquiriesModel; });
var EnquiryModel = (function () {
    function EnquiryModel() {
    }
    return EnquiryModel;
}());

var EnquiriesModel = (function () {
    function EnquiriesModel() {
        this.enquiries = [];
    }
    return EnquiriesModel;
}());

//# sourceMappingURL=Enquiries.model.js.map

/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobPrintingModel; });
var JobPrintingModel = (function () {
    function JobPrintingModel() {
        this.specialInstructions = "";
        this.GummingRequired = false;
        this.PastingRequired = false;
        this.Id = "";
    }
    return JobPrintingModel;
}());

//# sourceMappingURL=Printing.model.js.map

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EventModel */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsesModel; });
/* unused harmony export EventDate */
var EventModel = (function () {
    function EventModel() {
    }
    return EventModel;
}());

var ResponsesModel = (function () {
    function ResponsesModel() {
        this.active = [];
        this.responded = [];
    }
    return ResponsesModel;
}());

var EventDate = (function () {
    function EventDate() {
    }
    return EventDate;
}());

//# sourceMappingURL=Responses.model.js.map

/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Offer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Offers; });
var Offer = (function () {
    function Offer() {
    }
    return Offer;
}());

var Offers = (function () {
    function Offers() {
        this.offers = [];
    }
    return Offers;
}());

//# sourceMappingURL=Bye.modul.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Modules; });
/* unused harmony export Module */
/* unused harmony export Offer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Offers; });
var Modules = (function () {
    function Modules() {
        this.modules = [];
    }
    return Modules;
}());

var Module = (function () {
    function Module() {
    }
    return Module;
}());

var Offer = (function () {
    function Offer() {
    }
    return Offer;
}());

var Offers = (function () {
    function Offers() {
        this.offers = [];
    }
    return Offers;
}());

//# sourceMappingURL=Modules.model.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationList; });
/* unused harmony export NotificationModel */
var NotificationList = (function () {
    function NotificationList() {
        this.notifications = [];
    }
    return NotificationList;
}());

var NotificationModel = (function () {
    function NotificationModel() {
    }
    return NotificationModel;
}());

//# sourceMappingURL=notification.model.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ResponedPage = (function () {
    function ResponedPage(nav, alertCtrl) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.responed_form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            expectedDate_option: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](true, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            expected_date: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('12/6/17'),
            your_date: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](''),
            expectedLocation_option: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](true, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            expected_location: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('Nagpur', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            your_location: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            paymentMode_option: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](true, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            payment_mode: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('Cash', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            your_paymentMode: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            paymentCost_option: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](true, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            given_cost: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('200', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            your_cost: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            your_opinion: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
        });
        this.notificationPage = { component: __WEBPACK_IMPORTED_MODULE_3__tabs_navigation_tabs_navigation__["a" /* TabsNavigationPage */] };
    }
    ResponedPage.prototype.sendResponed = function () {
        console.log(this.responed_form.value);
        this.nav.setRoot(this.notificationPage.component);
    };
    return ResponedPage;
}());
ResponedPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'Responed-Page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Responed\Responed.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Send Respones</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="forms-examples-content">\n\n  <ion-segment class="forms-examples-segment">\n\n    <h3>Enquiry No : Enq007</h3>\n\n  </ion-segment>\n\n  <div class="forms-wrapper">\n\n    <div class="card-example-view">\n\n      <form class="sample-form card-form" [formGroup]="responed_form" (ngSubmit)="sendResponed()">\n\n          <ion-list class="card-preferences" style="margin-top:0px">\n\n          <ion-item class="switcher-item">\n\n            <ion-label>Delivery Date Accepted</ion-label>\n\n            <ion-toggle formControlName="expectedDate_option"></ion-toggle>\n\n          </ion-item>\n\n        </ion-list>\n\n        <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-50>\n\n              <ion-item class="multi-input">\n\n                <ion-label floating>Expeted Date</ion-label>\n\n                <ion-input type="text" formControlName="expected_date" [disabled]="true" ></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n            <ion-col no-padding width-50>\n\n              <ion-item class="multi-input time-item">\n\n                <ion-label floating>Your Date</ion-label>\n\n                <ion-datetime formControlName="your_date" [disabled]="responed_form.value.expectedDate_option" displayFormat="DD/MM/YYYY" pickerFormat="DD-MM-YYYY"></ion-datetime>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-list class="card-preferences"  >\n\n          <ion-item class="switcher-item">\n\n            <ion-label>Delivery Location Accepted</ion-label>\n\n            <ion-toggle formControlName="expectedLocation_option"></ion-toggle>\n\n          </ion-item>\n\n        </ion-list>\n\n        <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-50>\n\n              <ion-item class="multi-input">\n\n                <ion-label floating>Expected Location</ion-label>\n\n                <ion-input type="text" formControlName="expected_location" [disabled]="true"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n            <ion-col no-padding width-50>\n\n              <ion-item class="multi-input time-item">\n\n                <ion-label floating>Your Location</ion-label>\n\n                <ion-input type="text" formControlName="your_location" [disabled]="responed_form.value.expectedLocation_option"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-list class="card-preferences">\n\n          <ion-item class="switcher-item">\n\n            <ion-label>Payment Mode Accepted</ion-label>\n\n            <ion-toggle formControlName="paymentMode_option"></ion-toggle>\n\n          </ion-item>\n\n        </ion-list>\n\n        <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-50>\n\n              <ion-item class="multi-input">\n\n                <ion-label floating>Payment Mode</ion-label>\n\n                <ion-input type="text" formControlName="payment_mode" [disabled]="true"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n            <ion-col no-padding width-50>\n\n              <ion-item class="multi-input time-item">\n\n                <ion-label floating>Your Mode</ion-label>\n\n                <ion-input type="text" formControlName="your_paymentMode" [disabled]="responed_form.value.paymentMode_option"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-list class="card-preferences">\n\n          <ion-item class="switcher-item">\n\n            <ion-label>Cost Accepted</ion-label>\n\n            <ion-toggle formControlName="paymentCost_option"></ion-toggle>\n\n          </ion-item>\n\n        </ion-list>\n\n        <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-50>\n\n              <ion-item class="multi-input">\n\n                <ion-label floating>Cost</ion-label>\n\n                <ion-input type="text" formControlName="given_cost" [disabled]="true"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n            <ion-col no-padding width-50>\n\n              <ion-item class="multi-input time-item">\n\n                <ion-label floating>Your Cost</ion-label>\n\n                <ion-input type="text" formControlName="your_cost" [disabled]="responed_form.value.paymentCost_option"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-item>\n\n            <ion-label floating>Your Openion</ion-label>\n\n            <ion-input type="text" formControlName="your_opinion"></ion-input>\n\n          </ion-item>\n\n        <section class="form-section">\n\n          <button ion-button block class="form-action-button create-card-button" type="submit">Confirm</button>\n\n        </section>\n\n      </form>\n\n    </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Responed\Responed.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], ResponedPage);

//# sourceMappingURL=responed.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PreloadImage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PreloadImage = (function () {
    function PreloadImage(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._src = '';
        this._img = new Image();
    }
    Object.defineProperty(PreloadImage.prototype, "src", {
        set: function (val) {
            this._src = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(val) ? val : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PreloadImage.prototype, "ratio", {
        set: function (ratio) {
            this._ratio = ratio || null;
        },
        enumerable: true,
        configurable: true
    });
    PreloadImage.prototype.ngOnChanges = function (changes) {
        var ratio_height = (this._ratio.h / this._ratio.w * 100) + "%";
        // Conserve aspect ratio (see: http://stackoverflow.com/a/10441480/1116959)
        this._renderer.setElementStyle(this._elementRef.nativeElement, 'padding-bottom', ratio_height);
        this._update();
        // console.log("CHANGES preload-image", this._src);
        // console.log(changes['src'].isFirstChange());
    };
    PreloadImage.prototype._update = function () {
        var _this = this;
        if (Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(this.alt)) {
            this._img.alt = this.alt;
        }
        if (Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(this.title)) {
            this._img.title = this.title;
        }
        this._img.addEventListener('load', function () {
            _this._elementRef.nativeElement.appendChild(_this._img);
            _this._loaded(true);
        });
        this._img.src = this._src;
        this._loaded(false);
    };
    PreloadImage.prototype._loaded = function (isLoaded) {
        this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
    };
    return PreloadImage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], PreloadImage.prototype, "alt", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], PreloadImage.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PreloadImage.prototype, "src", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PreloadImage.prototype, "ratio", null);
PreloadImage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'preload-image',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\components\preload-image\preload-image.html"*/'<ion-spinner name="bubbles"></ion-spinner>\n<ng-content></ng-content>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\components\preload-image\preload-image.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer */]])
], PreloadImage);

//# sourceMappingURL=preload-image.js.map

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackgroundImage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__ = __webpack_require__(2);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BackgroundImage = (function () {
    function BackgroundImage(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._src = '';
    }
    Object.defineProperty(BackgroundImage.prototype, "src", {
        set: function (val) {
            this._src = Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular_util_util__["l" /* isPresent */])(val) ? val : '';
        },
        enumerable: true,
        configurable: true
    });
    BackgroundImage.prototype.ngOnChanges = function (changes) {
        this._update();
        // console.log("CHANGES background-image", this._src);
        // console.log(changes['src'].isFirstChange());
    };
    BackgroundImage.prototype._update = function () {
        var _this = this;
        var img = new Image();
        img.addEventListener('load', function () {
            _this._elementRef.nativeElement.style.backgroundImage = 'url(' + _this._src + ')';
            _this._loaded(true);
        });
        img.src = this._src;
        this._loaded(false);
    };
    BackgroundImage.prototype._loaded = function (isLoaded) {
        this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
    };
    return BackgroundImage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String)
], BackgroundImage.prototype, "class", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], BackgroundImage.prototype, "src", null);
BackgroundImage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'background-image',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\components\background-image\background-image.html"*/'<span class="bg-overlay"></span>\n<ion-spinner name="bubbles"></ion-spinner>\n<ng-content></ng-content>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\components\background-image\background-image.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer */]])
], BackgroundImage);

//# sourceMappingURL=background-image.js.map

/***/ }),

/***/ 607:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__show_hide_input__ = __webpack_require__(281);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShowHideContainer = (function () {
    function ShowHideContainer() {
        this.show = false;
    }
    ShowHideContainer.prototype.toggleShow = function () {
        this.show = !this.show;
        if (this.show) {
            this.input.changeType("text");
        }
        else {
            this.input.changeType("password");
        }
    };
    return ShowHideContainer;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ContentChild */])(__WEBPACK_IMPORTED_MODULE_1__show_hide_input__["a" /* ShowHideInput */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__show_hide_input__["a" /* ShowHideInput */])
], ShowHideContainer.prototype, "input", void 0);
ShowHideContainer = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'show-hide-container',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\components\show-hide-password\show-hide-password.html"*/'<ng-content></ng-content>\n<a class="type-toggle" (click)="toggleShow()">\n	<ion-icon class="show-option" [hidden]="show" name="eye"></ion-icon>\n	<ion-icon class="hide-option" [hidden]="!show" name="eye-off"></ion-icon>\n</a>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\components\show-hide-password\show-hide-password.html"*/,
        host: {
            'class': 'show-hide-password'
        }
    }),
    __metadata("design:paramtypes", [])
], ShowHideContainer);

//# sourceMappingURL=show-hide-container.js.map

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ColorRadio; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ColorRadio = (function () {
    function ColorRadio(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    ColorRadio.prototype.setColor = function (color) {
        this.renderer.setElementStyle(this.el.nativeElement, 'backgroundColor', color);
        this.renderer.setElementStyle(this.el.nativeElement, 'borderColor', color);
    };
    ColorRadio.prototype.ngOnInit = function () {
        console.log(this.color);
        this.setColor(this.color);
    };
    return ColorRadio;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('color-radio'),
    __metadata("design:type", String)
], ColorRadio.prototype, "color", void 0);
ColorRadio = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
        selector: '[color-radio]'
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["_0" /* Renderer */]])
], ColorRadio);

//# sourceMappingURL=color-radio.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export counterRangeValidator */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CounterInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var noop = function () { };
function counterRangeValidator(maxValue, minValue) {
    return function (c) {
        var err = {
            rangeError: {
                given: c.value,
                max: maxValue || 10,
                min: minValue || 0
            }
        };
        return (c.value > +maxValue || c.value < +minValue) ? err : null;
    };
}
var CounterInput = CounterInput_1 = (function () {
    function CounterInput() {
        this.propagateChange = noop;
        this.validateFn = noop;
        this._counterValue = 0;
    }
    Object.defineProperty(CounterInput.prototype, "counterValue", {
        get: function () {
            return this._counterValue;
        },
        set: function (val) {
            this._counterValue = val;
            this.propagateChange(val);
        },
        enumerable: true,
        configurable: true
    });
    CounterInput.prototype.ngOnChanges = function (inputs) {
        if (inputs.counterRangeMax || inputs.counterRangeMin) {
            this.validateFn = counterRangeValidator(this.counterRangeMax, this.counterRangeMin);
        }
    };
    CounterInput.prototype.writeValue = function (value) {
        if (value) {
            this.counterValue = value;
        }
    };
    CounterInput.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CounterInput.prototype.registerOnTouched = function () { };
    CounterInput.prototype.increase = function () {
        this.counterValue++;
    };
    CounterInput.prototype.decrease = function () {
        this.counterValue--;
    };
    CounterInput.prototype.validate = function (c) {
        return this.validateFn(c);
    };
    return CounterInput;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('counterValue'),
    __metadata("design:type", Object)
], CounterInput.prototype, "_counterValue", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('max'),
    __metadata("design:type", Object)
], CounterInput.prototype, "counterRangeMax", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('min'),
    __metadata("design:type", Object)
], CounterInput.prototype, "counterRangeMin", void 0);
CounterInput = CounterInput_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'counter-input',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\components\counter-input\counter-input.html"*/'<button ion-button icon-only class="counter-icon" (click)="decrease()">\n  <ion-icon name="remove"></ion-icon>\n</button>\n<span class="counter-inner">{{counterValue}}</span>\n<button ion-button icon-only class="counter-icon" (click)="increase()">\n  <ion-icon name="add"></ion-icon>\n</button>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\components\counter-input\counter-input.html"*/,
        host: {
            'class': 'counter-input'
        },
        providers: [
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* NG_VALUE_ACCESSOR */], useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* forwardRef */])(function () { return CounterInput_1; }), multi: true },
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* NG_VALIDATORS */], useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* forwardRef */])(function () { return CounterInput_1; }), multi: true }
        ]
    })
], CounterInput);

var CounterInput_1;
//# sourceMappingURL=counter-input.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrintingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Enquiries_Enquiries__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_appenums__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_serviceHelper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_appcommon__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_JobRequest__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Printing_model__ = __webpack_require__(599);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PrintingPage = (function () {
    function PrintingPage(nav, alertCtrl, serviceHelper, toastCtrl, loadingCtrl, navParams) {
        this.nav = nav;
        this.alertCtrl = alertCtrl;
        this.serviceHelper = serviceHelper;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.isEditMode = false;
        this.editId = "";
        this.jobTypeList = [];
        this.noOfColorList = [];
        this.materialTypeList = [];
        this.jobSizeList = [];
        this.umoList = [];
        this.paymentModeList = [];
        this.outputList = [];
        this.deliveryList = [];
        this.common = new __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */]();
        this.enquiriesPage = { component: __WEBPACK_IMPORTED_MODULE_3__Enquiries_Enquiries__["a" /* EnquiriesPage */] };
        this.loading = this.loadingCtrl.create();
        var id = this.navParams.get('id');
        if (typeof id != 'undefined' && id) {
            this.isEditMode = true;
            this.editId = id;
        }
        else {
            this.isEditMode = false;
        }
        this.CreateForm(new __WEBPACK_IMPORTED_MODULE_8__Printing_model__["a" /* JobPrintingModel */]());
    }
    PrintingPage.prototype.LoadCurrentJob = function (id) {
        var _this = this;
        this.loading.present();
        var job = new __WEBPACK_IMPORTED_MODULE_7__model_JobRequest__["c" /* JobGetRequest */]();
        job.JobType = __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].ScreenPrinting;
        job.Id = id;
        this.serviceHelper.GetJob(job)
            .then(function (response) { return _this.onJobSuccess(response); }, function (error) { return _this.OnError(error); });
    };
    PrintingPage.prototype.onJobSuccess = function (response) {
        var _this = this;
        if (response.Status) {
            var job_1 = response.Value.Data;
            setTimeout(function () { _this.SetFormValues(job_1); }, 500);
        }
        this.loading.dismiss();
    };
    PrintingPage.prototype.SetFormValues = function (job) {
        this.screenPrintingForm.patchValue({
            jobType: job.JobType,
            jobQuantity: job.JobQuantity,
            noOfColor: job.NumberOfColors,
            materialType: job.MaterialType,
            jobSize: job.JobSize,
            jobDim1: job.JobSizDimension1,
            jobDim2: job.JobSizDimension2,
            jobUom: job.UOM,
            expDelivery: __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].ParseJsonDate(job.ExpectedDeliverDate),
            payMode: job.PaymentMode,
            expCost: job.ExpectedCost,
            gummingReq: job.GummingRequired,
            pastingReq: job.PastingRequired,
            outputReq: job.OutputReq,
            deliveryAt: job.DeliveryAt,
            details: job.specialInstructions
        });
    };
    PrintingPage.prototype.CreateForm = function (job) {
        this.screenPrintingForm = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormGroup */]({
            jobType: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            jobQuantity: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            noOfColor: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            materialType: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            jobSize: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            jobDim1: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            jobDim2: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            jobUom: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            expDelivery: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            payMode: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            expCost: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required),
            gummingReq: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](false),
            pastingReq: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](false),
            outputReq: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](),
            deliveryAt: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */](),
            details: new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormControl */]()
        });
    };
    PrintingPage.prototype.ionViewWillEnter = function () {
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].PrintJobTypeId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].NoOfColorsId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].MaterialTypeId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].JobSizeId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].UMOId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].PaymentModeId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].OutputTypeId);
        this.GetDataSource(__WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].DeliveryAtId);
        if (this.isEditMode)
            this.LoadCurrentJob(this.editId);
    };
    PrintingPage.prototype.GetDataSource = function (id) {
        var _this = this;
        this.serviceHelper.DataSourceValues(id)
            .then(function (response) { return _this.OnDataSourceSuccess(response); }, function (error) { return _this.OnError(error); });
    };
    PrintingPage.prototype.OnDataSourceSuccess = function (response) {
        if (response.Status) {
            switch (response.SourceId.toString()) {
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].PrintJobTypeId.toString():
                    this.jobTypeList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].NoOfColorsId.toString():
                    this.noOfColorList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].MaterialTypeId.toString():
                    this.materialTypeList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].JobSizeId.toString():
                    this.jobSizeList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].UMOId.toString():
                    this.umoList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].PaymentModeId.toString():
                    this.paymentModeList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].OutputTypeId.toString():
                    this.outputList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
                case __WEBPACK_IMPORTED_MODULE_4__model_appenums__["a" /* DataSourceMasters */].DeliveryAtId.toString():
                    this.deliveryList = __WEBPACK_IMPORTED_MODULE_6__model_appcommon__["a" /* AppCommon */].CreateDataSource(response);
                    break;
            }
            //this.jobTypes = response.Value.map(item => new DataSourceList(item));
        }
        else {
            this.ShowAlert("Error", response.Message);
        }
    };
    PrintingPage.prototype.OnError = function (error) {
        this.loading.dismiss();
        this.ShowAlert("Error", error);
    };
    PrintingPage.prototype.ShowAlert = function (title, msg) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['OK']
        });
        alert.present();
    };
    PrintingPage.prototype.ShowToast = function (msg) {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            _this.nav.setRoot(_this.enquiriesPage.component);
            //this.nav.getro.setRoot(this.main_page.component);
        });
        toast.present();
    };
    PrintingPage.prototype.onScreenPrintingSave = function () {
        var _this = this;
        console.log(this.screenPrintingForm.value);
        this.loading.present();
        if (!this.isEditMode) {
            var jobRequest = this.CreatePrintingReqest(this.screenPrintingForm.value);
            this.serviceHelper.CreateJob(jobRequest)
                .then(function (response) { return _this.onSaveSuccess(response); }, function (error) { return _this.OnError(error); });
        }
        else {
            var jobRequest = this.UpdateRequest(this.screenPrintingForm.value);
            this.serviceHelper.UpdateJob(jobRequest)
                .then(function (response) { return _this.onSaveSuccess(response); }, function (error) { return _this.OnError(error); });
        }
    };
    PrintingPage.prototype.onSaveSuccess = function (response) {
        this.loading.dismiss();
        if (response.Status) {
            this.ShowToast("Save successfull!");
        }
        else {
            this.ShowAlert("Error", response.Message);
        }
    };
    PrintingPage.prototype.CreatePrintingReqest = function (formValues) {
        var jobRequest = new __WEBPACK_IMPORTED_MODULE_7__model_JobRequest__["b" /* JobCreateRequest */]();
        jobRequest.JobType = __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].ScreenPrinting;
        jobRequest.Data = this.SetProperties(formValues);
        return jobRequest;
    };
    PrintingPage.prototype.UpdateRequest = function (formValues) {
        var jobRequest = new __WEBPACK_IMPORTED_MODULE_7__model_JobRequest__["e" /* JobUpdateRequest */]();
        jobRequest.JobType = __WEBPACK_IMPORTED_MODULE_4__model_appenums__["b" /* JobType */].ScreenPrinting;
        jobRequest.Id = this.editId;
        jobRequest.Data = this.SetProperties(formValues);
        return jobRequest;
    };
    PrintingPage.prototype.SetProperties = function (formValues) {
        var screenObj = new __WEBPACK_IMPORTED_MODULE_7__model_JobRequest__["g" /* ScreenPrinting */]();
        screenObj.JobType = formValues.jobType;
        screenObj.JobQuantity = formValues.jobQuantity;
        screenObj.NumberOfColors = formValues.noOfColor;
        screenObj.MaterialType = formValues.materialType;
        screenObj.JobSize = formValues.jobSize;
        screenObj.JobSizDimension1 = formValues.jobDim1;
        screenObj.JobSizDimension2 = formValues.jobDim2;
        screenObj.UOM = formValues.jobUom;
        screenObj.ExpectedDeliverDate = formValues.expDelivery;
        screenObj.PaymentMode = formValues.payMode;
        screenObj.ExpectedCost = formValues.expCost;
        screenObj.GummingRequired = formValues.gummingReq;
        screenObj.PastingRequired = formValues.pastingReq;
        screenObj.OutPutReq = formValues.outputReq;
        screenObj.DeliveryAt = formValues.deliveryAt;
        screenObj.SpecialInstructions = formValues.details;
        return screenObj;
    };
    PrintingPage.prototype.onRespondClick = function () {
        this.nav.push(this.enquiriesPage.component);
    };
    return PrintingPage;
}());
PrintingPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'Printing-Page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\JobPrinting\Printing.html"*/'<style>\n\n  hr{\n\n    height: 2px !important;\n\n    background-color: #ae75e7;\n\n  }\n\n  ion-label {\n\n    font-size: 1.4rem !important;;\n\n    color: #ae75e7;\n\n}\n\n.select-md {\n\n    padding: 0px 5px 0px 0px;\n\n    width: 200px;\n\n}\n\n  .item-md {\n\n    font-size: 1.4rem !important;\n\n}\n\n  </style>\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Screen printing</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="forms-examples-content">\n\n  <div  class="event-example-view">\n\n  <form class="sample-form event-form" [formGroup]="screenPrintingForm" (ngSubmit)="onScreenPrintingSave()">\n\n        <section class="form-section">\n\n          <h1 class="section-title">Mandatory</h1>\n\n          <hr>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Job Type</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="jobType" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let jobType of jobTypeList" \n\n                    [value]="jobType.Value" >{{jobType.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Job Quantity</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-input type="number" placeholder="e.g. 100" formControlName="jobQuantity"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n           <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >No of colors</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="noOfColor" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let color of noOfColorList" \n\n                    [value]="color.Value" >{{color.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Material type</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="materialType" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let material of materialTypeList" \n\n                    [value]="material.Value" >{{material.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Job size</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="jobSize" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let jobs of jobSizeList" \n\n                    [value]="jobs.Value" >{{jobs.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Job dimension</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-25>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-input type="number" formControlName="jobDim1"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n            <ion-col no-padding style="text-align: center;" width-10>\n\n              <label>X</label>\n\n            </ion-col>\n\n            <ion-col no-padding width-25>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-input type="number" formControlName="jobDim2"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n           <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Job UOM</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="jobUom" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let umo of umoList" \n\n                    [value]="umo.Value" >{{umo.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Expected delivery</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-datetime formControlName="expDelivery" placeholder="Select Date" displayFormat="DD/MM/YY" pickerFormat="DD-MM-YYYY"></ion-datetime>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Payment mode</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="payMode" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let payment of paymentModeList" \n\n                    [value]="payment.Value" >{{payment.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Expected cost</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-input type="number" formControlName="expCost"></ion-input>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <h2 class="section-title">Optional</h2>\n\n          <hr>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Gumming request</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item" style="border-bottom: none;">\n\n                <ion-toggle formControlName="gummingReq"  ></ion-toggle>\n\n               <!-- <ion-select formControlName="gummingReq" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let gumming of gummingList" \n\n                    [value]="gumming.Value" >{{gumming.Name}}</ion-option>\n\n              </ion-select> -->\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Pasting required</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item" >\n\n                <ion-toggle formControlName="pastingReq"></ion-toggle>\n\n               <!-- <ion-select formControlName="pastingReq" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let pasting of pastingList" \n\n                    [value]="pasting.Value" >{{pasting.Name}}</ion-option>\n\n              </ion-select> -->\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Output required</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="outputReq" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let output of outputList" \n\n                    [value]="output.Value" >{{output.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n           <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-40>\n\n                <ion-label >Delivery at</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-60>\n\n              <ion-item class="multi-input time-item">\n\n               <ion-select formControlName="deliveryAt" placeholder="Select" style="max-width:100%">\n\n                    <ion-option *ngFor="let delivery of deliveryList" \n\n                    [value]="delivery.Value" >{{delivery.Name}}</ion-option>\n\n              </ion-select>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n          <ion-row no-padding class="multi-input-row">\n\n            <ion-col no-padding width-100>\n\n                <ion-label >Details/Special instructions</ion-label>\n\n            </ion-col>\n\n            <ion-col no-padding width-100>\n\n              <ion-item class="multi-input time-item">\n\n                <ion-textarea formControlName="details" rows="3" placeholder="Your description here..."></ion-textarea>\n\n              </ion-item>\n\n            </ion-col>\n\n          </ion-row>\n\n        </section>\n\n        <section class="form-section" style="padding-top:20px;">\n\n          <ion-row no-padding class="multi-input-row">\n\n              <ion-col no-padding width-50>\n\n                  <button ion-button block class="form-action-button create-event-button" (click)="CreateForm()" type="button"  >Clear</button>\n\n              </ion-col>\n\n              <ion-col no-padding width-50>\n\n                  <button ion-button block class="form-action-button create-event-button" type="submit" [disabled]="!screenPrintingForm.valid" >Save</button>\n\n              </ion-col>\n\n          </ion-row>\n\n        </section>\n\n      </form>\n\n  </div>\n\n</ion-content>'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\JobPrinting\Printing.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_5__services_serviceHelper__["a" /* ServiceHelper */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
], PrintingPage);

//# sourceMappingURL=Printing.js.map

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export RATING_CONTROL_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rating; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(14);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var noop = function () { };
var RATING_CONTROL_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* NG_VALUE_ACCESSOR */],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* forwardRef */])(function () { return Rating; }),
    multi: true
};
var Rating = (function () {
    function Rating() {
        this.max = 5;
        this.readOnly = false;
        this.propagateChange = noop;
    }
    Rating.prototype.ngOnInit = function () {
        var states = [];
        for (var i = 0; i < this.max; i++) {
            if (this.innerValue > i && this.innerValue < i + 1) {
                states[i] = 2;
            }
            else if (this.innerValue > i) {
                states[i] = 1;
            }
            else {
                states[i] = 0;
            }
        }
        this.range = states;
    };
    Object.defineProperty(Rating.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (val) {
            if (val !== this.innerValue) {
                this.innerValue = val;
                this.propagateChange(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    Rating.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    Rating.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    Rating.prototype.registerOnTouched = function () { };
    Rating.prototype.rate = function (amount) {
        if (!this.readOnly && amount >= 0 && amount <= this.range.length) {
            this.value = amount;
        }
    };
    return Rating;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
    __metadata("design:type", Object)
], Rating.prototype, "max", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])('read-only'),
    __metadata("design:type", Object)
], Rating.prototype, "readOnly", void 0);
Rating = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'rating',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\components\rating\rating.html"*/'<button class="rating-icon" ion-button icon-only round *ngFor="let r of range; let i = index" (click)="rate(i + 1)">\n	<ion-icon [name]="value === undefined ? (r === 1 ? \'star\' : (r === 2 ? \'star-half\' : \'star-outline\')) : (value > i ? (value < i+1 ? \'star-half\' : \'star\') : \'star-outline\')"></ion-icon>\n</button>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\components\rating\rating.html"*/,
        providers: [RATING_CONTROL_VALUE_ACCESSOR]
    })
], Rating);

//# sourceMappingURL=rating.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnquiriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Enquiries_model__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__JobPrinting_Printing__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__JobOffset_JobOffset__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Responses_Responses__ = __webpack_require__(268);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__JobSelection_JobSelection__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_serviceHelper__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_JobRequest__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_appenums__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var EnquiriesPage = (function () {
    function EnquiriesPage(nav, serviceHelper, loadingCtrl, modal) {
        this.nav = nav;
        this.serviceHelper = serviceHelper;
        this.loadingCtrl = loadingCtrl;
        this.modal = modal;
        this.enquiries = new __WEBPACK_IMPORTED_MODULE_3__Enquiries_model__["a" /* EnquiriesModel */]();
        this.segment = "Active";
        this.loading = this.loadingCtrl.create();
        this.printingPage = { component: __WEBPACK_IMPORTED_MODULE_4__JobPrinting_Printing__["a" /* PrintingPage */] };
        this.responsesPage = { component: __WEBPACK_IMPORTED_MODULE_6__Responses_Responses__["a" /* ResponsesPage */] };
        this.jobSelectionPage = { component: __WEBPACK_IMPORTED_MODULE_7__JobSelection_JobSelection__["a" /* JobSelectionPage */] };
        this.jobOffsetPage = { component: __WEBPACK_IMPORTED_MODULE_5__JobOffset_JobOffset__["a" /* JobOffsetPage */] };
    }
    EnquiriesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.loading.present();
        this.serviceHelper
            .GetViews(this.CreateEnquiriesRequest())
            .then(function (response) {
            _this.enquiries.enquiries = response.Value.Data;
            // this.enquiries.responded = data.responded;
            _this.loading.dismiss();
        });
    };
    EnquiriesPage.prototype.CreateEnquiriesRequest = function () {
        var request = new __WEBPACK_IMPORTED_MODULE_9__model_JobRequest__["d" /* JobGetsRequest */]();
        request.JobType = __WEBPACK_IMPORTED_MODULE_10__model_appenums__["b" /* JobType */].ViewDocument;
        request.ViewId = __WEBPACK_IMPORTED_MODULE_10__model_appenums__["e" /* ViewsType */].ViewEnquiries;
        return request;
    };
    EnquiriesPage.prototype.onActiveItemClick = function (item) {
        this.GoToJobPage(item);
    };
    EnquiriesPage.prototype.GoToJobPage = function (item) {
        switch (item.JobTypeId) {
            case __WEBPACK_IMPORTED_MODULE_10__model_appenums__["b" /* JobType */].ScreenPrinting:
                this.nav.push(this.printingPage.component, { id: item.Id });
                break;
            case __WEBPACK_IMPORTED_MODULE_10__model_appenums__["b" /* JobType */].OffsetPrinting:
                this.nav.push(this.jobOffsetPage.component, { id: item.Id });
                break;
        }
    };
    EnquiriesPage.prototype.onResponsesClick = function () {
        this.nav.push(this.responsesPage.component);
    };
    EnquiriesPage.prototype.onSelectJobType = function () {
        this.nav.push(this.jobSelectionPage.component);
    };
    EnquiriesPage.prototype.onSegmentChanged = function (segmentButton) {
        // console.log('Segment changed to', segmentButton.value);
    };
    EnquiriesPage.prototype.onSegmentSelected = function (segmentButton) {
        // console.log('Segment selected', segmentButton.value);
    };
    return EnquiriesPage;
}());
EnquiriesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'enquiries-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Enquiries\Enquiries.html"*/'<style>\n\n  .col{\n\n    padding:0px;\n\n  }\n\n</style>\n\n<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Enquiries</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content class="enquiries-content">\n\n  <ion-segment class="enquiries-segment" [(ngModel)]="segment" (ionChange)="onSegmentChanged($event)">\n\n    <ion-segment-button value="Active" (ionSelect)="onSegmentSelected($event)">\n\n      Active Enquiries\n\n    </ion-segment-button>\n\n    <ion-segment-button value="Active" (ionSelect)="onSegmentSelected($event)">\n\n      Closed Enquiries\n\n    </ion-segment-button>\n\n  </ion-segment>\n\n\n\n  <div [ngSwitch]="segment">\n\n    <div *ngSwitchCase="\'Active\'">\n\n      <ion-list class="enquiries-list">\n\n        <ion-item class="enquiries-item" *ngFor="let item of enquiries.enquiries">\n\n          <ion-row>\n\n            <ion-col width-15 class="enquiries-date">\n\n              <h2 class="enquiries-day">{{item.DocDay}}</h2>\n\n              <h3 class="enquiries-month">{{item.DocMonth}}</h3>\n\n              <h4 class="enquiries-time">{{item.DocTime}}</h4>\n\n            </ion-col>\n\n            <ion-col width-85 class="enquiries-data">\n\n              <div class="data-item">\n\n                <div class="item-content">\n\n                  <h2 class="item-title one-line">{{item.DocName}}</h2>\n\n                  <ion-row>\n\n                    <ion-col width-90>\n\n                      <div class="item-description">\n\n                      <p class="description-text">{{item.JobType}}</p>\n\n                    </div>\n\n                    </ion-col>\n\n                    <ion-col width-10>\n\n                      <ion-icon style="font-size: 1.6em;"  class="item-icon" name="arrow-forward" (click)=\'onActiveItemClick(item);\' ></ion-icon>\n\n                    </ion-col>\n\n                  </ion-row>\n\n                  <ion-row>\n\n                    <ion-col width-60>\n\n                      <div class="item-description">\n\n                      <ion-icon class="description-icon" name="clock"></ion-icon>\n\n                      <p class="description-text">{{item.ExpectedDate}}</p>\n\n                  </div>\n\n                    </ion-col>\n\n                     <ion-col width-40>\n\n                      <div class="item-description">\n\n                          <ion-icon class="description-icon" name="navigate"></ion-icon>\n\n                          <p class="description-text one-line">{{item.ExpectedCost}}/-</p>\n\n                      </div>\n\n                    </ion-col>\n\n                  </ion-row>\n\n                  <div class="item-description" style="width: 130px;" >\n\n                    <ion-badge style="border-radius: 10px;margin:0px" item-right>99</ion-badge>\n\n                    <button ion-button small clear (click)="onResponsesClick()" >\n\n                       Responses >>\n\n                    </button>\n\n                  </div>\n\n                </div>\n\n              </div>\n\n            </ion-col>\n\n          </ion-row>\n\n        </ion-item>\n\n      </ion-list>\n\n    </div>\n\n  </div>\n\n<ion-fab bottom right>\n\n <button mini ion-fab (click)="onSelectJobType()" >\n\n  <ion-icon  name="add"></ion-icon>\n\n </button>\n\n</ion-fab>\n\n</ion-content>'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\Enquiries\Enquiries.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_8__services_serviceHelper__["a" /* ServiceHelper */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
], EnquiriesPage);

//# sourceMappingURL=Enquiries.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export KeyValueData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataSourceList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return MasterDataSource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return Shorting; });
var KeyValueData = (function () {
    function KeyValueData(Value, Data) {
        this.Value = Value;
        this.Data = Data;
    }
    return KeyValueData;
}());

// export class DataSourceValue{
//    SourceId:number;
//    Name:string;
//    Code:string;
//    Description:string;
//    Value:string;
// }
var DataSourceList = (function () {
    function DataSourceList(data) {
        this.Name = data.Name,
            this.Code = data.Code,
            this.Value = data.Value,
            this.Description = data.Description;
    }
    return DataSourceList;
}());

var MasterDataSource = (function () {
    function MasterDataSource(data) {
        this.Name = data.Name,
            this.Value = data.Id;
    }
    return MasterDataSource;
}());

var Filter = (function () {
    function Filter(propertyName, operation, value) {
        this.PropertyName = propertyName,
            this.Operation = operation;
        this.Value = value;
    }
    return Filter;
}());

var Shorting = (function () {
    function Shorting(propertyName, sortingType) {
        this.PropertyName = propertyName,
            this.Type = sortingType;
    }
    return Shorting;
}());

//# sourceMappingURL=datasource.model.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsOfServicePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TermsOfServicePage = (function () {
    function TermsOfServicePage(view) {
        this.view = view;
    }
    TermsOfServicePage.prototype.dismiss = function () {
        this.view.dismiss();
    };
    return TermsOfServicePage;
}());
TermsOfServicePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'terms-of-service-page',template:/*ion-inline-start:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\terms-of-service\terms-of-service.html"*/'<ion-header class="terms-header legal-header">\n  <ion-toolbar>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>\n      Terms of Service\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content class="terms-content legal-content">\n  <p>Last modified: Nov 14, 2016</p>\n  <h4 class="legal-title">Welcome to ion2FullApp!</h4>\n  <p>Thanks for using our products and services (“Services”). Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>\n  <h4 class="legal-title">Using our Services</h4>\n  <p>You must follow any policies made available to you within the Services.</p>\n  <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>\n  <h4 class="legal-title">About these Terms</h4>\n  <p>We may modify these terms or any additional terms that apply to a Service to, for example, reflect changes to the law or changes to our Services. You should look at the terms regularly. We’ll post notice of modifications to these terms on this page. We’ll post notice of modified additional terms in the applicable Service. Changes will not apply retroactively and will become effective no sooner than fourteen days after they are posted. However, changes addressing new functions for a Service or changes made for legal reasons will be effective immediately. If you do not agree to the modified terms for a Service, you should discontinue your use of that Service.</p>\n</ion-content>\n'/*ion-inline-end:"D:\E_Drive\MyDevelopment\Ionic3\PMCC.APP\src\pages\terms-of-service\terms-of-service.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
], TermsOfServicePage);

//# sourceMappingURL=terms-of-service.js.map

/***/ })

},[282]);
//# sourceMappingURL=main.js.map