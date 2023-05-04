import { Injectable } from "@angular/core";
import { ModalTypes } from "../shared/enums";

interface Modal {
    id: ModalTypes;
    isVisible: boolean;
}
@Injectable({
    providedIn: "root",
})
export class AuthModalService {
    private modals: Modal[] = [];
    constructor() {}
    isModalOpen(id: ModalTypes): boolean {
        return !!this.modals.find((modal) => modal.id === id)?.isVisible;
    }
    toggleModal(id: ModalTypes) {
        const modal = this.modals.find((modal) => modal.id === id);
        if (modal) {
            modal.isVisible = !modal.isVisible;
        }
    }
    unregister(id: string) {
        this.modals = this.modals.filter((modal) => modal.id !== id);
    }
    register(id: ModalTypes) {
        this.modals.push({ id, isVisible: false });
    }
}
