import { Component } from "@angular/core";
import { FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { FormRegisterNames, IAlert } from "./model";

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
            Validators.pattern("^(?=.*[a-zA-Z])(?=.*\\d).+$"),
        ]),
        confirmPassword: new FormControl("", [Validators.required]),
        phone: new FormControl("", [Validators.required]),
    });
    alert: IAlert = {
        isVisible: false,
        message: "Please wait! Your account is being created.",
        color: "blue",
    };
    constructor() {}
    onChange() {}
    onSubmit() {
        this.alert.isVisible = true;
        this.alert.message = "Please wait! Your account is being created.";
        this.alert.color = "blue";
        console.log(this.registerForm.value);
        this.registerForm.reset();
    }
    getControl(name: FormRegisterNames) {
        return this.registerForm.get(name);
    }
}
