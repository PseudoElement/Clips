import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";
import { FormRegisterNames } from "src/app/features/register-form/model";

export function isPasswordsMatch(controlName: FormRegisterNames, matchingControlName: FormRegisterNames): ValidatorFn {
    return (formGroup: AbstractControl) => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);
        if (!control || !matchingControl) {
            console.error("Form control can not be found.");
            return { controlNotFound: false };
        }
        const error = control.value === matchingControl.value ? null : { passwordMismatch: true };

        matchingControl.setErrors(error);
        return error;
    };
}
