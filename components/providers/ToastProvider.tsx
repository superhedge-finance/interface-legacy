import React, {useState} from "react";
import {MESSAGE_TYPE, ToastContext} from "../../contexts/toast";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<string>('')
    const [type, setType] = useState<MESSAGE_TYPE>()

    const showToast = (message: string, type?: MESSAGE_TYPE) => {
        setToast(message)
        setType(type)

        setTimeout(() => {
            setToast('')
            setType(undefined)
        }, 5000)
    }

    return (
        <ToastContext.Provider
            value={{
                toast,
                type,
                showToast
            }}
        >
            {children}
        </ToastContext.Provider>
    )
}
