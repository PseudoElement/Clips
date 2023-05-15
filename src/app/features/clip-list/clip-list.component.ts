import { DatePipe } from "@angular/common";
import { Component, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { ClipService } from "src/app/services/clip.service";

@Component({
    selector: "app-clip-list",
    templateUrl: "./clip-list.component.html",
    styleUrls: ["./clip-list.component.scss"],
    providers: [DatePipe],
})
export class ClipListComponent implements OnInit, OnDestroy {
    @Input() isScrollable = true;
    scrollYPos: number = 0;
    @HostListener("window:scroll", ["$event"]) onWindowScroll(e: Event) {
        const { scrollTop, offsetHeight } = document.documentElement;
        const { innerHeight } = window;
        const isBottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
        if (isBottomOfWindow) {
            this.clipService.getClips();
        }
    }
    constructor(public clipService: ClipService) {
        this.clipService.getClips();
    }
    ngOnInit(): void {}
    ngOnDestroy(): void {
        window.removeEventListener("scroll", this.onWindowScroll);
        this.clipService.pageClips = [];
    }
}
