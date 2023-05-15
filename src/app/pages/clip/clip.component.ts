import { ActivatedRoute, Params } from "@angular/router";
import { Component, ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";
import videojs from "video.js";

@Component({
    selector: "app-clip",
    templateUrl: "./clip.component.html",
    styleUrls: ["./clip.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class ClipComponent {
    @ViewChild("videoPlayer") videoEl?: ElementRef;

    player?: any;
    id = "";

    constructor(private activeRoute: ActivatedRoute) {
        this.activeRoute.params.subscribe((params: Params) => {
            this.id = params.id;
        });
    }

    ngAfterViewInit() {
        this.player = videojs(this.videoEl?.nativeElement);
    }
}
