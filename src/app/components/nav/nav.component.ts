import { Component } from "@angular/core";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { AuthService } from "src/app/services/auth.service";
import { LanguageService } from "src/app/services/language.service";
import { langOptions } from "src/app/shared/constants/nav";
import { ModalTypes } from "src/app/shared/enums";
import { Languages } from "src/app/shared/types";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"],
})
export class NavComponent {
    languageOptions = langOptions;

    constructor(public languageService: LanguageService, public modalService: AuthModalService, public auth: AuthService) {}

    public openModal(e: Event) {
        e.preventDefault();
        this.modalService.toggleModal(ModalTypes.AUTH);
    }
    public async onLogout(e: Event) {
        e.preventDefault();
        await this.auth.signOut();
    }

    onSelect(lang: Languages) {
        this.languageService.changeLanguage(lang);
    }
}
