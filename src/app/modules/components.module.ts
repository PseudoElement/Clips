import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestComponent } from "../components/test/test.component";
import { PostComponent } from "../components/post/post.component";
import { ModalComponent } from "../components/modal/modal.component";
import { TabsContainerComponent } from "../components/tabs-container/tabs-container.component";
import { TabComponent } from "../components/tab/tab.component";
import { InputComponent } from "../components/input/input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "./shared.module";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { AlertComponent } from "../components/alert/alert.component";
import { RouterModule } from "@angular/router";
import { DropdownComponent } from "../components/dropdown/dropdown.component";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { httpTranslateLoaderFactory } from "../app.module";
import { HttpClient } from "@angular/common/http";

@NgModule({
    declarations: [TestComponent, PostComponent, ModalComponent, TabsContainerComponent, TabComponent, InputComponent, AlertComponent, DropdownComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        NgxMaskDirective,
        NgxMaskPipe,
        RouterModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: httpTranslateLoaderFactory,
                deps: [HttpClient],
            },
        }),
    ],
    exports: [TestComponent, PostComponent, ModalComponent, TabsContainerComponent, TabComponent, InputComponent, AlertComponent, DropdownComponent],
    providers: [provideNgxMask()],
})
export class ComponentsModule {}
