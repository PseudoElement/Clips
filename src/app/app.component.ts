import { Component, OnInit } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable, Subject, Subscription, filter, map, of, switchMap, tap } from "rxjs";
import { NotFoundComponent } from "./pages/not-found/not-found.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    isNotFoundComponent = false;
    obs$?: Subscription;
    constructor(public auth: AuthService, public route: ActivatedRoute, private router: Router) {}

    ngOnInit(): void {
        this.auth.signIn("user@mail.ru", "old228");
    }

    ngAfterContentInit() {
        this.obs$ = this.router.events
            .pipe(
                filter((e) => e instanceof NavigationEnd),
                map((e) => this.route.firstChild?.component?.name)
            )
            .subscribe((val) => {
                this.isNotFoundComponent = val === "NotFoundComponent";
            });
    }
    ngOnDestroy() {
        this.obs$?.unsubscribe();
    }
}
