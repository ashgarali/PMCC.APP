import { NgModule } from '@angular/core';

import { MaxLengthDirective } from '../Directive/MaxLength.Directive';

@NgModule({
    declarations: [
        MaxLengthDirective
    ],
    exports: [
        MaxLengthDirective
    ]
})
export class MaxLengthDirectiveModule{}