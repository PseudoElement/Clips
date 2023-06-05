import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { LanguageService } from "src/app/services/language.service";
import { ModalTypes } from "src/app/shared/enums";
import en from "../../../assets/i18n/en.json";
import { Observable } from "rxjs";
@Component({
    selector: "app-auth-modal",
    templateUrl: "./auth-modal.component.html",
    styleUrls: ["./auth-modal.component.scss"],
})
export class AuthModalComponent implements OnInit, OnDestroy {
    constructor(public modalService: AuthModalService, private languageService: LanguageService) {}
    t$!: Observable<typeof en>;
    ngOnInit(): void {
        this.modalService.register(ModalTypes.AUTH);
        this.t$ = this.languageService.translation$();
    }
    ngOnDestroy(): void {
        this.modalService.unregister(ModalTypes.AUTH);
    }
    get ModalTypes(): typeof ModalTypes {
        return ModalTypes;
    }
}
