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
import { SharedModule } from "./shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { httpTranslateLoaderFactory } from "../app.module";
import { HttpClient } from "@angular/common/http";

@NgModule({
    declarations: [SandboxComponent, HomeComponent, AboutComponent, ManageComponent, UploadComponent, ClipComponent, NotFoundComponent],
    imports: [
        CommonModule,
        ComponentsModule,
        FeaturesModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    exports: [HomeComponent, AboutComponent, ManageComponent, UploadComponent, ClipComponent, NotFoundComponent],
})
export class PagesModule {}
