import { FormGroup } from "@angular/forms";
import { FormRegisterNames } from "src/app/features/register-form/model";

export function isPasswordsMatch(controlName: FormRegisterNames, matchingControlName: FormRegisterNames) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    };
}
