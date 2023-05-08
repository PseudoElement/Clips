import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthModalComponent } from "../features/auth-modal/auth-modal.component";
import { ComponentsModule } from "./components.module";
import { LoginFormComponent } from "../features/login-form/login-form.component";
import { RegisterFormComponent } from "../features/register-form/register-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { VideosComponent } from "../features/videos/videos.component";
import { DirectivesModule } from "./directives.module";

@NgModule({
    declarations: [AuthModalComponent, LoginFormComponent, RegisterFormComponent, VideosComponent],
    imports: [CommonModule, ComponentsModule, ReactiveFormsModule, FormsModule, SharedModule, RouterModule],
    exports: [AuthModalComponent, LoginFormComponent, RegisterFormComponent, VideosComponent],
})
export class FeaturesModule {}
