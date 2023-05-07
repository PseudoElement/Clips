import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IAlert } from "src/app/shared/types";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ModalTypes } from "src/app/shared/enums";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
    isLoading = false;
    credentials = {
        email: "",
        password: "",
    };
    alert: IAlert = {
        isVisible: false,
        message: "",
        color: "blue",
    };
    constructor(private auth: AuthService, private modal: AuthModalService) {}

    async onSubmit(ngForm: NgForm) {
        if (ngForm.form.invalid) {
            alert("Invalid data");
            return;
        }
        this.isLoading = true;
        this.alert.color = "blue";
        this.alert.isVisible = true;
        this.alert.message = "Please wait! Your account is logging in.";
        try {
            await this.auth.signIn(this.credentials.email, this.credentials.password);
        } catch (e: any) {
            this.alert.color = "red";
            this.alert.message = e.message;
            console.error(e);
            return;
        } finally {
            this.isLoading = false;
        }
        this.alert.color = "green";
        this.alert.message = "You've successfully logged in!";
        ngForm.reset();
    }
}
