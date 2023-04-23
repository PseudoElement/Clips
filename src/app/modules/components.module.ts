import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestComponent } from "../components/test/test.component";
import { PostComponent } from "../components/post/post.component";

@NgModule({
     declarations: [TestComponent, PostComponent],
     imports: [CommonModule],
     exports: [TestComponent, PostComponent],
})
export class ComponentsModule {}
