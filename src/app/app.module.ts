import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ComponentsModule } from "./modules/components.module";
import { PagesModule } from "./modules/pages.module";
import { UserModule } from "./modules/user.module";
import { FeaturesModule } from "./modules/features.module";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "src/environments/environment";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ComponentsModule,
        PagesModule,
        UserModule,
        FeaturesModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
