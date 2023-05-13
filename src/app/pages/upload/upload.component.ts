import { Component, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireStorage, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import { v4 as uuid } from "uuid";
import { IAlert, IClip } from "src/app/shared/types";
import { combineLatest, forkJoin, last, switchMap } from "rxjs";
import { ClipService } from "src/app/services/clip.service";
import { Router } from "@angular/router";
import { FfmpegService } from "src/app/services/ffmpeg.service";
import { LanguageService } from "src/app/services/language.service";
import { useTranslate } from "src/app/shared/helpers/useTranslate";
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
    screenshots: string[] = [];
    selectedScreenshot = "";
    screenshotUploading?: AngularFireUploadTask;

    title = new FormControl("", {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
    });
    uploadForm = new FormGroup({
        title: this.title,
    });

    constructor(
        public ffmpegService: FfmpegService,
        private router: Router,
        private storage: AngularFireStorage,
        private auth: AngularFireAuth,
        private clipService: ClipService,
        public languageService: LanguageService
    ) {
        auth.user.subscribe((user) => (this.user = user));
        this.ffmpegService.init();
    }

    ngOnDestroy(): void {
        this.uploading?.cancel();
    }

    async uploadFile() {
        this.uploadForm.disable();
        this.isLoading = true;
        this.alert.color = "blue";
        this.alert.isVisible = true;
        this.alert.message = this.languageService.translateJSON.alert.loading;

        const clipFileName = uuid();
        const clipPath = `clips/${clipFileName}.mp4`;

        const screenshotBlob = await this.ffmpegService.blobFromURL(this.selectedScreenshot);
        const screenshotPath = `screenshots/${clipFileName}.png`;

        this.uploading = this.storage.upload(clipPath, this.file);
        const clipRef = this.storage.ref(clipPath);

        this.screenshotUploading = this.storage.upload(screenshotPath, screenshotBlob);
        const screenshotRef = this.storage.ref(screenshotPath);

        this.progress.isVisible = true;

        combineLatest([this.uploading.percentageChanges(), this.screenshotUploading.percentageChanges()]).subscribe((val) => {
            const [clipProgress, screenshotProgress] = val;

            if (!clipProgress || !screenshotProgress) return;

            const total = clipProgress + screenshotProgress;

            this.progress.value = (total as number) / 200;
        });
        forkJoin([this.uploading.snapshotChanges(), this.screenshotUploading.snapshotChanges()])
            .pipe(
                last(),
                switchMap(() => forkJoin([clipRef.getDownloadURL(), screenshotRef.getDownloadURL()]))
            )
            .subscribe({
                next: async (urls) => {
                    const [clipURL, screenshotURL] = urls;
                    const clip = {
                        uid: this.user?.uid as string,
                        displayName: this.user?.displayName as string,
                        title: this.title.value,
                        fileName: `${clipFileName}.mp4`,
                        url: clipURL,
                        screenshotURL: screenshotURL,
                        screenshotFileName: `${clipFileName}.png`,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    };
                    const clipDocRef = await this.clipService.createClip(clip);
                    this.isLoading = false;
                    this.alert.color = "green";
                    this.alert.message = this.languageService.translateJSON.alert.success;
                    this.progress.isVisible = false;
                    setTimeout(() => {
                        this.alert.isVisible = false;
                        this.router.navigate(["/clip", clipDocRef.id]);
                    }, 2000);
                },
                error: (err) => {
                    this.uploadForm.enable();
                    this.alert.message = this.languageService.translateJSON.alert.error;
                    this.alert.color = "red";
                    this.isLoading = false;
                },
            });
    }

    setSelectedScreenshot(screenshot: string) {
        this.selectedScreenshot = screenshot;
    }

    async onFileAdding(e: Event) {
        if (this.ffmpegService.isRunning) return;

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

        this.screenshots = await this.ffmpegService.getScreenshots(this.file);

        this.selectedScreenshot = this.screenshots[0];

        this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ""));
        this.isNextStep = true;
    }
}
