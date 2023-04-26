import { Component } from "@angular/core";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ModalTypes } from "src/app/shared/enums";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.scss"],
})
export class NavComponent {
    constructor(public modalService: AuthModalService) {}

    public openModal(e: Event) {
        e.preventDefault();
        this.modalService.toggleModal(ModalTypes.AUTH);
    }
}
