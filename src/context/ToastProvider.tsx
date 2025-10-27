import React, { createContext, useContext, useState } from "react";
import { View } from "react-native";
import Toast from "@/components/Toast";

type ToastContextValue = {
  showToast: (
    message: string,
    type?: "success" | "error" | "info",
    duration?: number
  ) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
    duration: number;
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
    duration = 3000
  ) => {
    setToast({ message, type, duration });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <View style={{ flex: 1 }}>
        {children}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onHide={() => setToast(null)}
          />
        )}
      </View>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
