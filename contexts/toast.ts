import {createContext} from "react";

export type MESSAGE_TYPE = "success" | "error" | "info" | "warning"

export type ToastContextType = {
    toast: string,
    type: MESSAGE_TYPE | undefined,
    showToast: (message: string, type?: MESSAGE_TYPE) => void
}

export const ToastContext = createContext<ToastContextType>({
    toast: '',
    type: 'success',
    showToast: (message, type) => undefined,
})
