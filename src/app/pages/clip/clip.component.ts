import { ActivatedRoute, Params } from "@angular/router";
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import videojs from "video.js";
import { IClip } from "src/app/shared/types";
import { DatePipe } from "@angular/common";

@Component({
    selector: "app-clip",
    templateUrl: "./clip.component.html",
    styleUrls: ["./clip.component.scss"],
    encapsulation: ViewEncapsulation.None,
    providers: [DatePipe],
})
export class ClipComponent {
    @ViewChild("videoPlayer") videoEl?: ElementRef;

    player?: any;
    clip?: IClip;

    constructor(private activeRoute: ActivatedRoute, private cd: ChangeDetectorRef) {}

    ngAfterViewInit() {
        this.player = videojs(this.videoEl?.nativeElement);

        this.activeRoute.data.subscribe((data) => {
            this.clip = data.clip as IClip;

            this.player.src({
                src: this.clip.url,
                type: "video/mp4",
            });
        });
        this.cd.detectChanges();
    }
}
