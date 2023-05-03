import { AfterContentInit, Component, ContentChildren, OnInit, QueryList } from "@angular/core";
import { TabComponent } from "../tab/tab.component";

@Component({
    selector: "app-tabs-container",
    templateUrl: "./tabs-container.component.html",
    styleUrls: ["./tabs-container.component.scss"],
})
export class TabsContainerComponent implements AfterContentInit {
    @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList();
    constructor() {}
    ngAfterContentInit(): void {
        const activeTab = this.tabs?.find((tab) => tab.isActive);
        if (!activeTab) {
            this.setActiveTab(this.tabs.first);
        } else {
        }
    }
    setActiveTab(tab: TabComponent) {
        this.tabs.forEach((tab) => (tab.isActive = false));
        tab.isActive = true;
        return false;
    }
}
