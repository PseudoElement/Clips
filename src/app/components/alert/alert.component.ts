import { Component, Input } from "@angular/core";
import { AlertColors } from "src/app/shared/types";

@Component({
    selector: "app-alert",
    templateUrl: "./alert.component.html",
    styleUrls: ["./alert.component.scss"],
})
export class AlertComponent {
    @Input() color: AlertColors = "blue";

    get bgColor() {
        return `bg-${this.color}-400`;
    }
}
