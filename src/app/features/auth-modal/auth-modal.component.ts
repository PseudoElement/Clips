import { Component, OnDestroy, OnInit } from "@angular/core";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ModalTypes } from "src/app/shared/enums";

@Component({
    selector: "app-auth-modal",
    templateUrl: "./auth-modal.component.html",
    styleUrls: ["./auth-modal.component.scss"],
})
export class AuthModalComponent implements OnInit, OnDestroy {
    constructor(public modalService: AuthModalService) {}
    ngOnInit(): void {
        this.modalService.register(ModalTypes.AUTH);
    }
    ngOnDestroy(): void {
        this.modalService.unregister(ModalTypes.AUTH);
    }
    get ModalTypes(): typeof ModalTypes {
        return ModalTypes;
    }
}
