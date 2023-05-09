import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { map } from "rxjs";
import { ClipService } from "src/app/services/clip.service";
import { IClip } from "src/app/shared/types";
import { AuthModalService } from "src/app/services/auth-modal.service";
import { ModalTypes } from "src/app/shared/enums";

@Component({
    selector: "app-manage",
    templateUrl: "./manage.component.html",
    styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
    videoOrder = "1";
    clips: IClip[] = [];
    activeClip: IClip | null = null;
    constructor(private modalService: AuthModalService, private router: Router, private route: ActivatedRoute, private clipService: ClipService) {}
    ngOnInit(): void {
        this.route.queryParamMap.pipe(map(({ params }: Params) => params)).subscribe((params: Params) => {
            const value = params.sort;
            this.videoOrder = value === "2" ? value : "1";
        });
        this.clipService.getUserClips().subscribe((docs) => {
            this.clips = [];
            docs.forEach((doc) => {
                this.clips.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            console.log(this.clips);
        });
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
        this.activeClip = clip;
        this.modalService.toggleModal(ModalTypes.EDIT_CLIP);
    }
}
