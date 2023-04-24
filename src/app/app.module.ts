import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./modules/components.module";
import { PagesModule } from "./modules/pages.module";
import { UserModule } from "./modules/user.module";
import { FeaturesModule } from "./modules/features.module";

@NgModule({
     declarations: [AppComponent],
     imports: [BrowserModule, AppRoutingModule, ComponentsModule, PagesModule, UserModule, FeaturesModule],
     providers: [],
     bootstrap: [AppComponent],
})
export class AppModule {}
