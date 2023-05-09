import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { map } from "rxjs";
import { ClipService } from "src/app/services/clip.service";

@Component({
    selector: "app-manage",
    templateUrl: "./manage.component.html",
    styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
    videoOrder = "1";
    constructor(private router: Router, private route: ActivatedRoute, private clipService: ClipService) {}
    ngOnInit(): void {
        this.route.queryParamMap.pipe(map(({ params }: Params) => params)).subscribe((params: Params) => {
            const value = params.sort;
            this.videoOrder = value === "2" ? value : "1";
        });
        this.clipService.getUserClips().subscribe(console.log);
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
}
