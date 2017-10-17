
import { Validators, FormGroup, FormControl,ValidatorFn,AbstractControl } from '@angular/forms';
export class AppValidators
{
    /**
     *  MaxLength
     */
    public static MaxLength(control:any):boolean
    {
        if((control.errors && control.dirty) && control.errors.maxlength)
             return true;
        else
            return false;
    }
    public static MinLength(control:any):boolean
    {
        if((control.errors && control.dirty) && control.errors.minlength)
             return true;
        else
            return false;
    }
    public static MobileNo(control:any):boolean
    {
        if((control.errors && control.dirty) && (this.MaxLength(control)||this.MinLength(control)))
             return true;
        else
            return false;
    }
    public static Email(control:any):boolean
    {
        if((control.errors && control.dirty) && control.errors.email)
             return true;
        else
            return false;
    }
    public static Pincode(control:any):boolean
    {
        if((control.errors && control.dirty) && (this.MaxLength(control)||this.MinLength(control)))
             return true;
        else
            return false;
    }
    public static Password(control:any):boolean
    {
        if((control.errors && control.dirty) && (this.MaxLength(control)||this.MinLength(control)))
             return true;
        else
            return false;
    }
    public static ConfirmPassword(control:any):boolean
    {
        if((control.errors && control.dirty) && control.errors.ConformPWD)
             return true;
        else
            return false;
    }
    public static CheckConformPassword(field_name): ValidatorFn {
      return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value;
      let isValid=control.root.value[field_name]==input
      if(!isValid)
      return { 'ConformPWD': {isValid} }
      else
      return null;
      };
  }
}