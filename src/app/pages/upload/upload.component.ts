import { Component } from "@angular/core";

@Component({
    selector: "app-upload",
    templateUrl: "./upload.component.html",
    styleUrls: ["./upload.component.scss"],
})
export class UploadComponent {
    isDragOver = false;
    file: File | null = null;
    constructor() {}
    onDropFile(e: Event) {
        this.isDragOver = false;
        this.file = (e as DragEvent).dataTransfer?.files.item(0) ?? null;

        if (!this.file || this.file.type === "video/mp4") {
            return;
        }

        console.log("EV", this.file);
    }
}
