import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthModalComponent } from "../features/auth-modal/auth-modal.component";
import { ComponentsModule } from "./components.module";
import { LoginFormComponent } from "../features/login-form/login-form.component";
import { RegisterFormComponent } from "../features/register-form/register-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./shared.module";
import { RouterModule } from "@angular/router";
import { VideosComponent } from "../features/videos/videos.component";
import { EditModalComponent } from "../features/edit-modal/edit-modal.component";
import { ClipListComponent } from "../features/clip-list/clip-list.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { httpTranslateLoaderFactory } from "../app.module";
import { HttpClient } from "@angular/common/http";
import { NavComponent } from "../features/nav/nav.component";

@NgModule({
    declarations: [AuthModalComponent, LoginFormComponent, RegisterFormComponent, VideosComponent, EditModalComponent, ClipListComponent, NavComponent],
    imports: [
        CommonModule,
        ComponentsModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        RouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    exports: [NavComponent, AuthModalComponent, LoginFormComponent, RegisterFormComponent, VideosComponent, EditModalComponent, ClipListComponent],
})
export class FeaturesModule {}
