import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormRegisterNames } from "./model";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ModalTypes } from "src/app/shared/enums";
import { AuthService } from "src/app/services/auth.service";
import { IAlert, UserRegisterData } from "src/app/shared/types";
import { RegisterValidator } from "src/app/shared/classes/register-validator";
import { EmailTaken } from "src/app/shared/classes/email-taken";
import { isPasswordsMatch } from "src/app/shared/helpers";

@Component({
    selector: "app-register-form",
    templateUrl: "./register-form.component.html",
    styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent {
    constructor(private auth: AuthService, private modal: AuthModalService, private emailTaken: EmailTaken) {}

    isLoading = false;
    registerForm = new FormGroup(
        {
            name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
            email: new FormControl("", [Validators.required, Validators.email], [this.emailTaken.validate]),
            age: new FormControl(0, [Validators.required, Validators.min(18)]),
            password: new FormControl("", [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(20),
                Validators.pattern("^(?=.*[a-zA-Z])(?=.*\\d).+$"),
            ]),
            confirmPassword: new FormControl("", [Validators.required]),
            phone: new FormControl("", [Validators.required]),
        },
        [isPasswordsMatch("password", "confirmPassword")]
    );
    alert: IAlert = {
        isVisible: false,
        message: "",
        color: "blue",
    };
    onChange() {}

    async onSubmit() {
        this.isLoading = true;
        this.alert.isVisible = true;
        this.alert.message = "Please wait! Your account is being created.";

        try {
            await this.auth.createUser(this.registerForm.value as UserRegisterData);
        } catch (e: any) {
            this.alert.color = "red";
            this.alert.message = e;
            console.error(e);
            return;
        } finally {
            this.isLoading = false;
        }
        this.alert.message = "Your account has been created!";
        this.alert.color = "green";
        this.registerForm.reset();
        setTimeout(() => {
            this.modal.toggleModal(ModalTypes.AUTH);
            this.alert.color = "blue";
            this.alert.isVisible = false;
            this.alert.message = "";
        }, 5000);
    }
    getControl(name: FormRegisterNames) {
        return this.registerForm.get(name);
    }
}
