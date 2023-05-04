import { Component } from "@angular/core";
import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { FormRegisterNames } from "./model";

@Component({
    selector: "app-register-form",
    templateUrl: "./register-form.component.html",
    styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent {
    registerForm = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
        email: new FormControl("", [Validators.required, Validators.email]),
        age: new FormControl(0, [Validators.required, Validators.min(18)]),
        password: new FormControl("", [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(20),
            Validators.pattern("^(?=.*[A-Za-z])(?=.*d).+$"),
        ]),
        confirmPassword: new FormControl("", [Validators.required]),
        phone: new FormControl("", [Validators.required]),
    });
    constructor() {}
    onChange() {}
    getControl(name: FormRegisterNames) {
        return this.registerForm.get(name);
    }
}
