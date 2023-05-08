import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SandboxComponent } from "./pages/sandbox/sandbox.component";
import { HomeComponent } from "./pages/home/home.component";
import { AboutComponent } from "./pages/about/about.component";
import { ManageComponent } from "./pages/manage/manage.component";
import { UploadComponent } from "./pages/upload/upload.component";
import { ClipComponent } from "./pages/clip/clip.component";

const routes: Routes = [
    { path: "", component: HomeComponent },
    {
        path: "manage",
        component: ManageComponent,
        data: {
            authOnly: true,
        },
    },
    {
        path: "upload",
        component: UploadComponent,
        data: {
            authOnly: true,
        },
    },
    {
        path: "clip/:id",
        component: ClipComponent,
    },
    { path: "about", component: AboutComponent },
    { path: "hidden", component: SandboxComponent },
    {
        path: "**",
        redirectTo: "",
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
