import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ModalTypes } from "src/app/shared/enums";
import { IClip } from "src/app/shared/types";

@Component({
    selector: "app-edit-modal",
    templateUrl: "./edit-modal.component.html",
    styleUrls: ["./edit-modal.component.scss"],
})
export class EditModalComponent implements OnInit, OnDestroy {
    @Input() activeClip: IClip | null = null;

    constructor(private modalService: AuthModalService) {}

    ngOnInit(): void {
        this.modalService.register(ModalTypes.EDIT_CLIP);
    }
    ngOnDestroy(): void {
        this.modalService.unregister(ModalTypes.EDIT_CLIP);
    }

    get ModalTypes(): typeof ModalTypes {
        return ModalTypes;
    }
}
