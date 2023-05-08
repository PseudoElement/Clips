import { Component } from "@angular/core";

@Component({
    selector: "app-upload",
    templateUrl: "./upload.component.html",
    styleUrls: ["./upload.component.scss"],
})
export class UploadComponent {
    isDragOver = false;
    onDropFile(e: Event) {
        this.isDragOver = false;
    }
}
