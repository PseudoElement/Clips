import { Component, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IAlert } from "src/app/shared/types";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { AuthService } from "src/app/services/auth.service";
import { LanguageService } from "src/app/services/language.service";
import { Subscription } from "rxjs";

@Component({
    selector: "app-login-form",
    templateUrl: "./login-form.component.html",
    styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent implements OnDestroy {
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
    languageSub?: Subscription;
    t = this.languageService.getTranslation("ru");

    constructor(public languageService: LanguageService, private auth: AuthService, private modal: AuthModalService) {
        this.languageSub = this.languageService.selectedLanguage$.subscribe((val) => {
            this.t = this.languageService.getTranslation(val);
        });
    }

    ngOnDestroy(): void {
        this.languageSub?.unsubscribe();
    }

    async onSubmit(ngForm: NgForm) {
        if (ngForm.form.invalid) {
            alert("Invalid data");
            return;
        }
        this.isLoading = true;
        this.alert.color = "blue";
        this.alert.isVisible = true;
        this.alert.message = this.t.loginForm.alertLoading;
        try {
            await this.auth.signIn(this.credentials.email, this.credentials.password);
        } catch (e: any) {
            this.alert.color = "red";
            this.alert.message = this.t.loginForm.alertError;
            console.error(e);
            return;
        } finally {
            this.isLoading = false;
        }
        this.alert.color = "green";
        this.alert.message = this.t.loginForm.alertSuccess;
        ngForm.reset();
    }
}
