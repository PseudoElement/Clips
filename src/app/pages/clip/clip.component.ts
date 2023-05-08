import { ActivatedRoute, Params } from "@angular/router";
import { Component } from "@angular/core";

@Component({
    selector: "app-clip",
    templateUrl: "./clip.component.html",
    styleUrls: ["./clip.component.scss"],
})
export class ClipComponent {
    id = "";
    constructor(private activeRoute: ActivatedRoute) {
        this.activeRoute.params.subscribe((params: Params) => {
            this.id = params.id;
        });
    }
}
