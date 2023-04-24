import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SandboxComponent } from "../pages/sandbox/sandbox.component";
import { ComponentsModule } from "./components.module";
import { FeaturesModule } from "./features.module";

@NgModule({
     declarations: [SandboxComponent],
     imports: [CommonModule, ComponentsModule, FeaturesModule],
})
export class PagesModule {}
