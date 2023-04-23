import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SandboxComponent } from "./pages/sandbox/sandbox.component";

const routes: Routes = [
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
