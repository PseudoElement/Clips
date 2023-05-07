export type AlertColors = "red" | "blue" | "green";
export interface IAlert {
    isVisible: boolean;
    color: AlertColors;
    message: string;
}
