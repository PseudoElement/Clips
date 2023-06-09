import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-sandbox",
    templateUrl: "./sandbox.component.html",
    styleUrls: ["./sandbox.component.scss"],
})
export class SandboxComponent {
    title = "hosting-ang";
    name = "Luis";
    imgURL = "https://picsum.photos/id/237/500/500";
    currentDate = new Date();
    cost = 2000;
    temperature = 25.7;
    pizza = {
        toppings: ["peperoni", "bacon"],
        size: "large",
    };
    blueClass = false;
    fontSize = 46;
    images = ["https://picsum.photos/id/237/500/500", "https://picsum.photos/id/23/500/500", "https://picsum.photos/id/29/500/500"];
    language = "ru";
    constructor(public translate: TranslateService) {}

    onSelectChange(e: Event) {
        this.translate.use((e.target as HTMLSelectElement).value);
    }

    getName() {
        return this.name;
    }
    changeImage(e: Event) {
        this.imgURL = (e.target as HTMLInputElement).value;
    }
    logImg(e: string) {
        console.log(e);
    }
}
