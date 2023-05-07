import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class RegisterValidator {
    static match(source: string, target: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const control = group.get(source);
            const matchingControl = group.get(target);

            if (!control || !matchingControl) {
                console.error("Form control can not be found.");
                return { controlNotFound: false };
            }

            const error = control.value === matchingControl.value ? null : { passwordMismatch: true };

            matchingControl.setErrors(error);
            return error;
        };
    }
}
