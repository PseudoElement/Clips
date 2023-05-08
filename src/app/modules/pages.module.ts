import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SandboxComponent } from "../pages/sandbox/sandbox.component";
import { ComponentsModule } from "./components.module";
import { FeaturesModule } from "./features.module";
import { HomeComponent } from "../pages/home/home.component";
import { AboutComponent } from "../pages/about/about.component";
import { ManageComponent } from "../pages/manage/manage.component";
import { UploadComponent } from "../pages/upload/upload.component";
import { RouterModule } from "@angular/router";
import { ClipComponent } from "../pages/clip/clip.component";
import { NotFoundComponent } from "../pages/not-found/not-found.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [SandboxComponent, HomeComponent, AboutComponent, ManageComponent, UploadComponent, ClipComponent, NotFoundComponent],
    imports: [CommonModule, ComponentsModule, FeaturesModule, RouterModule, SharedModule],
    exports: [HomeComponent, AboutComponent, ManageComponent, UploadComponent, ClipComponent, NotFoundComponent],
})
export class PagesModule {}
