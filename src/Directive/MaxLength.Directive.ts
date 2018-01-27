import {Directive,EventEmitter,HostListener,Input, Output} from '@angular/core';
import {Platform} from 'ionic-angular';

@Directive({
    selector:'[iMaxLength]'
})

export class MaxLengthDirective{

    @Input('iMaxLength') iMaxLength:number;
    @Output() ngModelChange:EventEmitter<any> = new EventEmitter();

    constructor(private platForm:Platform){}

    @HostListener('keydown',['$event']) onkeyup(event)
    {
        const element = event.target as HTMLInputElement;
        const limit = this.iMaxLength;
        if (this.platForm.is('android')) {
        if (element.value.length <= limit ||event.keyCode===8) {
            this.ngModelChange.emit(element.value);
        } else {
            return false;
            ///element.value = element.value;
        }
        }

    }
    @HostListener('focus',['$event']) onFocus(event) {
        const element = event.target as HTMLInputElement;
        if (!this.platForm.is('android')) {
          element.setAttribute('maxlength', this.iMaxLength.toString())
        }
      }

}