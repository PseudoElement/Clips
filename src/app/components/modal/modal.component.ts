import { Component, Input, ElementRef, OnInit, OnDestroy } from "@angular/core";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ModalTypes } from "src/app/shared/enums";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() modalType: ModalTypes = ModalTypes.AUTH;
    constructor(public modalService: AuthModalService, public el: ElementRef) {}
    public onModalClick(e: Event) {
        e.stopPropagation();
    }
    ngOnInit(): void {
        document.body.append(this.el.nativeElement);
        this.el.nativeElement.className = "modalWrapper";
    }
    ngOnDestroy(): void {
        this.el.nativeElement.remove();
    }
    closeModal() {
        this.modalService.toggleModal(this.modalType);
    }
    isOpenModal() {
        return this.modalService.isModalOpen(this.modalType);
    }
}
