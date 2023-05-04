import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
    credentials = {
        email: "",
        password: "",
    };

    onSubmit(ngForm: NgForm) {
        if (ngForm.form.invalid) {
            alert("Invalid data");
            return;
        }
        console.log(ngForm.form.value);
        // console.log(this.credentials);
    }
}
