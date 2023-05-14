import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ClipService } from "src/app/services/clip.service";
import { LanguageService } from "src/app/services/language.service";
import { ModalTypes } from "src/app/shared/enums";
import { IAlert, IClip } from "src/app/shared/types";

@Component({
    selector: "app-edit-modal",
    templateUrl: "./edit-modal.component.html",
    styleUrls: ["./edit-modal.component.scss"],
})
export class EditModalComponent implements OnInit, OnDestroy, OnChanges {
    @Input() activeClip: IClip | null = null;
    @Output() changedClip = new EventEmitter<IClip>();

    clipID = new FormControl("", {
        nonNullable: true,
    });
    title = new FormControl("", {
        validators: [Validators.required, Validators.minLength(3)],
        nonNullable: true,
    });
    editForm = new FormGroup({
        title: this.title,
        id: this.clipID,
    });
    alert: IAlert = {
        color: "blue",
        isVisible: false,
        message: "",
    };
    isLoading = false;

    constructor(private languageService: LanguageService, private modalService: AuthModalService, private clipService: ClipService) {
        this.languageService.selectedLanguage$.subscribe((val) => {
            this.t = this.languageService.getTranslation(val);
        });
    }

    t = this.languageService.getTranslation("ru");

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.activeClip) {
            return;
        }
        this.clipID.setValue(this.activeClip.id as string);
        this.title.setValue(this.activeClip.title);
        this.isLoading = false;
        this.alert.isVisible = false;
    }

    ngOnInit(): void {
        this.modalService.register(ModalTypes.EDIT_CLIP);
    }
    ngOnDestroy(): void {
        this.modalService.unregister(ModalTypes.EDIT_CLIP);
    }

    async onSubmit() {
        if (!this.activeClip) return;
        this.isLoading = true;
        this.alert.isVisible = true;
        this.alert.color = "blue";
        this.alert.message = this.t.editModal.alertLoading;

        try {
            await this.clipService.updateClip(this.clipID.value, this.title.value);
        } catch (e: any) {
            this.alert.color = "red";
            this.alert.message = this.t.editModal.alertError;
            this.isLoading = false;
            return;
        }
        this.activeClip.title = this.title.value;
        this.changedClip.emit(this.activeClip as IClip);
        this.alert.color = "green";
        this.alert.message = this.t.editModal.alertSuccess;
        setTimeout(() => {
            this.modalService.toggleModal(ModalTypes.EDIT_CLIP);
        }, 3000);
    }

    get ModalTypes(): typeof ModalTypes {
        return ModalTypes;
    }
}
