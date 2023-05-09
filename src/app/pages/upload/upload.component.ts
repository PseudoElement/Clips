import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { v4 as uuid } from "uuid";
import { IAlert } from "src/app/shared/types";
import { last, switchMap } from "rxjs";
import { ClipService } from "src/app/services/clip.service";
@Component({
    selector: "app-upload",
    templateUrl: "./upload.component.html",
    styleUrls: ["./upload.component.scss"],
})
export class UploadComponent {
    isDragOver = false;
    isNextStep = false;
    file: File | null = null;
    isLoading = false;
    alert: IAlert = {
        isVisible: false,
        message: "",
        color: "blue",
    };
    progress = {
        value: 0,
        isVisible: false,
    };
    user: firebase.User | null = null;

    title = new FormControl("", {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
    });
    uploadForm = new FormGroup({
        title: this.title,
    });

    constructor(private storage: AngularFireStorage, private auth: AngularFireAuth, private clipService: ClipService) {
        auth.user.subscribe((user) => (this.user = user));
    }

    async uploadFile() {
        this.isLoading = true;
        this.alert.color = "blue";
        this.alert.isVisible = true;
        this.alert.message = "Please wait! Your clip is being uploaded.";
        const clipFileName = uuid();
        const clipPath = `clips/${clipFileName}.mp4`;
        const uploading = this.storage.upload(clipPath, this.file);
        const clipRef = this.storage.ref(clipPath);
        this.progress.isVisible = true;

        uploading.percentageChanges().subscribe((val) => {
            this.progress.value = (val as number) / 100;
        });
        uploading
            .snapshotChanges()
            .pipe(
                last(),
                switchMap(() => clipRef.getDownloadURL())
            )
            .subscribe({
                next: (url) => {
                    const clip = {
                        uid: this.user?.uid as string,
                        displayName: this.user?.displayName as string,
                        title: this.title.value,
                        fileName: `${clipFileName}.mp4`,
                        url,
                    };
                    this.clipService.createClip(clip);
                    this.isLoading = false;
                    this.alert.color = "green";
                    this.alert.message = "Your file was successfully uploaded!";
                    this.progress.isVisible = false;
                    setTimeout(() => {
                        this.alert.isVisible = false;
                    }, 2000);
                },
                error: (err) => {
                    this.alert.message = err;
                    this.alert.color = "red";
                    this.isLoading = false;
                },
            });
    }

    onDropFile(e: Event) {
        this.isDragOver = false;
        this.file = (e as DragEvent).dataTransfer?.files.item(0) ?? null;
        if (!this.file || this.file.type !== "video/mp4") {
            return;
        }
        this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ""));
        this.isNextStep = true;
    }
}
