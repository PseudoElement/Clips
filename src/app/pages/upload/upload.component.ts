import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { v4 as uuid } from "uuid";
import { IAlert } from "src/app/shared/types";
import { last, switchMap } from "rxjs";
import { ClipService } from "src/app/services/clip.service";
import { Router } from "@angular/router";
@Component({
    selector: "app-upload",
    templateUrl: "./upload.component.html",
    styleUrls: ["./upload.component.scss"],
})
export class UploadComponent implements OnDestroy {
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
    uploading?: AngularFireUploadTask;

    title = new FormControl("", {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
    });
    uploadForm = new FormGroup({
        title: this.title,
    });

    constructor(private router: Router, private storage: AngularFireStorage, private auth: AngularFireAuth, private clipService: ClipService) {
        auth.user.subscribe((user) => (this.user = user));
    }

    ngOnDestroy(): void {
        this.uploading?.cancel();
    }

    async uploadFile() {
        this.uploadForm.disable();
        this.isLoading = true;
        this.alert.color = "blue";
        this.alert.isVisible = true;
        this.alert.message = "Please wait! Your clip is being uploaded.";
        const clipFileName = uuid();
        const clipPath = `clips/${clipFileName}.mp4`;
        this.uploading = this.storage.upload(clipPath, this.file);
        const clipRef = this.storage.ref(clipPath);
        this.progress.isVisible = true;

        this.uploading.percentageChanges().subscribe((val) => {
            this.progress.value = (val as number) / 100;
        });
        this.uploading
            .snapshotChanges()
            .pipe(
                last(),
                switchMap(() => clipRef.getDownloadURL())
            )
            .subscribe({
                next: async (url) => {
                    const clip = {
                        uid: this.user?.uid as string,
                        displayName: this.user?.displayName as string,
                        title: this.title.value,
                        fileName: `${clipFileName}.mp4`,
                        url,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    };
                    const clipDocRef = await this.clipService.createClip(clip);
                    this.isLoading = false;
                    this.alert.color = "green";
                    this.alert.message = "Your file was successfully uploaded!";
                    this.progress.isVisible = false;
                    setTimeout(() => {
                        this.alert.isVisible = false;
                        this.router.navigate(["/clip", clipDocRef.id]);
                    }, 2000);
                },
                error: (err) => {
                    this.uploadForm.enable();
                    this.alert.message = err;
                    this.alert.color = "red";
                    this.isLoading = false;
                },
            });
    }

    onFileAdding(e: Event) {
        this.isDragOver = false;
        if (e.target instanceof HTMLInputElement) {
            this.file = e.target.files?.[0] ?? null;
        }
        if (e instanceof DragEvent) {
            this.file = (e as DragEvent).dataTransfer?.files.item(0) ?? null;
        }
        if (!this.file || this.file.type !== "video/mp4") {
            return;
        }
        this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ""));
        this.isNextStep = true;
    }
}
