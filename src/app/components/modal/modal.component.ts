import { Component } from "@angular/core";
import { AuthModalService } from "src/app/services/auth-modal.service";

@Component({
    selector: "app-modal",
    templateUrl: "./modal.component.html",
    styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
    constructor(public modalService: AuthModalService) {}
}
