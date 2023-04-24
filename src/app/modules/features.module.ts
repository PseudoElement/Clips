import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthModalComponent } from "../features/auth-modal/auth-modal.component";
import { ComponentsModule } from "./components.module";

@NgModule({
     declarations: [AuthModalComponent],
     imports: [CommonModule, ComponentsModule],
     exports: [AuthModalComponent],
})
export class FeaturesModule {}
