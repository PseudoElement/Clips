import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-register-form",
    templateUrl: "./register-form.component.html",
    styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent {
    registerForm = new FormGroup({
        name: new FormControl("", [Validators.required, Validators.minLength(3)]),
        email: new FormControl("user@mail.ru"),
        age: new FormControl(),
        password: new FormControl(),
        confirmPassword: new FormControl(),
        phone: new FormControl(),
    });
    onChange() {
        console.log(this.registerForm);
    }
}
