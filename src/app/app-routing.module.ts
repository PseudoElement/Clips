import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SandboxComponent } from "./pages/sandbox/sandbox.component";
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ManageComponent } from "./pages/manage/manage.component";
import { UploadComponent } from "./pages/upload/upload.component";
import { ClipComponent } from "./pages/clip/clip.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
import { AngularFireAuthGuard, redirectUnauthorizedTo } from "@angular/fire/compat/auth-guard";
import { ClipService } from "./services/clip.service";

const redirectToHome = () => redirectUnauthorizedTo("/");

const routes: Routes = [
    { path: "", component: HomeComponent },
    {
        path: "manage",
        canActivate: [AngularFireAuthGuard],
        component: ManageComponent,
        data: {
            authOnly: true,
            authGuardPipe: () => redirectToHome(),
        },
    },
    {
        path: "upload",
        component: UploadComponent,
        canActivate: [AngularFireAuthGuard],
        data: {
            authOnly: true,
            authGuardPipe: () => redirectToHome(),
        },
    },
    {
        path: "clip/:id",
        component: ClipComponent,
        resolve: {
            clip: ClipService,
        },
    },
    { path: "about", component: AboutComponent },
    { path: "hidden", component: SandboxComponent },
    { path: "not-found", component: NotFoundComponent },
    {
        path: "**",
        redirectTo: "not-found",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
