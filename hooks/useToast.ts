import { ToastContext, ToastContextType } from "../contexts/toast";
import { useContext } from "react";

const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within");
  }
  return context;
};

export default useToast;
