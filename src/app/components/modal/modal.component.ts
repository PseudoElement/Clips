import { Component, Input } from "@angular/core";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ModalTypes } from "src/app/shared/enums";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
    @Input() modalType: ModalTypes = ModalTypes.AUTH;
    constructor(public modalService: AuthModalService) {}
    public onModalClick(e: Event) {
        e.stopPropagation();
    }
    closeModal() {
        this.modalService.toggleModal(this.modalType);
    }
    isOpenModal() {
        return this.modalService.isModalOpen(this.modalType);
    }
}
