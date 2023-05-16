import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { BehaviorSubject, Observable, Subject, Subscription, map, takeUntil } from "rxjs";
import { ClipService } from "src/app/services/clip.service";
import { IClip, Languages } from "src/app/shared/types";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ModalTypes } from "src/app/shared/enums";
import { LanguageService } from "src/app/services/language.service";

@Component({
    selector: "app-manage",
    templateUrl: "./manage.component.html",
    styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit, OnDestroy {
    videoOrder = "1";
    clips: IClip[] = [];
    activeClip: IClip | null = null;
    sort$: BehaviorSubject<string> = new BehaviorSubject(this.videoOrder);

    componentDestroyed$: Subject<boolean> = new Subject();

    constructor(
        private languageService: LanguageService,
        private modalService: AuthModalService,
        private router: Router,
        private route: ActivatedRoute,
        private clipService: ClipService
    ) {}

    t = this.languageService.getTranslation("ru");

    ngOnInit(): void {
        this.route.queryParamMap.pipe(map(({ params }: Params) => params)).subscribe((params: Params) => {
            const value = params.sort;
            this.videoOrder = value === "2" ? value : "1";
            this.sort$.next(this.videoOrder);
        });
        this.clipService.getUserClips(this.sort$).subscribe((docs) => {
            this.clips = [];
            docs.forEach((doc) => {
                this.clips.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
        });
        this.languageService.selectedLanguage$.pipe(takeUntil(this.componentDestroyed$)).subscribe((val) => {
            this.t = this.languageService.getTranslation(val);
        });
    }
    ngOnDestroy(): void {
        this.componentDestroyed$.next(true);
    }

    async onCopyClick(e: MouseEvent, id: string | undefined) {
        e.preventDefault();
        if (!id) return;
        const url = `${location.origin}/clip/${id}`;
        await navigator.clipboard.writeText(url);
        alert(this.t.manage.alert);
    }

    deleteClip(e: Event, clip: IClip) {
        e.preventDefault();
        e.stopPropagation();
        console.log(clip);
        this.clipService.deleteClip(clip);
        this.clips = this.clips.filter((clipInner) => clipInner.id !== clip.id);
    }

    onTitleChange(activeClip: IClip) {
        this.clips = this.clips.map((clip) => (clip.id === activeClip.id ? activeClip : clip));
    }

    onSelectChange(e: Event) {
        const sort = (e.target as HTMLSelectElement).value;
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {
                sort: sort,
            },
        });
    }
    openModal(e: Event, clip: IClip) {
        e.preventDefault();
        e.stopPropagation();
        this.activeClip = clip;
        this.modalService.toggleModal(ModalTypes.EDIT_CLIP);
    }
}
