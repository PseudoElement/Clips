import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthModalComponent } from "../features/auth-modal/auth-modal.component";
import { ComponentsModule } from "./components.module";
import { LoginFormComponent } from "../features/login-form/login-form.component";
import { RegisterFormComponent } from "../features/register-form/register-form.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [AuthModalComponent, LoginFormComponent, RegisterFormComponent],
    imports: [CommonModule, ComponentsModule, ReactiveFormsModule],
    exports: [AuthModalComponent, LoginFormComponent, RegisterFormComponent],
})
export class FeaturesModule {}
