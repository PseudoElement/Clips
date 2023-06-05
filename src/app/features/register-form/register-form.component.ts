import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormRegisterNames } from "./model";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ModalTypes } from "src/app/shared/enums";
import { AuthService } from "src/app/services/auth.service";
import { IAlert, UserRegisterData } from "src/app/shared/types";
import { EmailTaken } from "src/app/shared/classes/email-taken";
import { isPasswordsMatch } from "src/app/shared/helpers";
import { LanguageService } from "src/app/services/language.service";
import { Observable, Subject, takeUntil } from "rxjs";
import en from "../../../assets/i18n/en.json";

@Component({
    selector: "app-register-form",
    templateUrl: "./register-form.component.html",
    styleUrls: ["./register-form.component.scss"],
})
export class RegisterFormComponent implements OnDestroy {
    t = this.languageService.getTranslation("ru");
    isLoading = false;
    isDestroyed$: Subject<boolean> = new Subject();
    constructor(private auth: AuthService, private modal: AuthModalService, private emailTaken: EmailTaken, private languageService: LanguageService) {
        this.languageService.selectedLanguage$.pipe(takeUntil(this.isDestroyed$)).subscribe((lang) => {
            this.t = this.languageService.getTranslation(lang);
        });
    }

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

    ngOnDestroy(): void {
        this.isDestroyed$.next(true);
    }

    async onSubmit() {
        this.isLoading = true;
        this.alert.isVisible = true;
        this.alert.message = this.t.registerForm.alertLoading;

        try {
            await this.auth.createUser(this.registerForm.value as UserRegisterData);
        } catch (e: any) {
            this.alert.color = "red";
            this.alert.message = this.t.registerForm.alertError;
            return;
        } finally {
            this.isLoading = false;
        }
        this.alert.message = this.t.registerForm.alertSuccess;
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
