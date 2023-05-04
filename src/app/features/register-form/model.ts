import { AlertColors } from "src/app/shared/types";

export type FormRegisterNames = "name" | "email" | "age" | "password" | "confirmPassword" | "phone";

export interface IAlert {
    isVisible: boolean;
    color: AlertColors;
    message: string;
}
