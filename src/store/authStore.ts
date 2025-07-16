import { create } from "zustand";
import { persist } from "zustand/middleware";
import { showSuccess, showError } from "@/utils/toast";

interface AuthState {
  phoneNumber: string;
  countryCode: string;
  isAuthenticated: boolean;
  login: (phone: string, code: string) => void;
  logout: () => void;
  verifyOtp: (otp: string) => Promise<boolean>;
  sendOtp: () => Promise<void>;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      phoneNumber: "",
      countryCode: "+1",
      isAuthenticated: false,
      login: (phone, code) => set({ phoneNumber: phone, countryCode: code }),
      logout: () => set({ isAuthenticated: false }),
      resetAuth: () => set({ phoneNumber: "", countryCode: "+1", isAuthenticated: false }),
      verifyOtp: async (otp) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            // Accept any 6-digit number as valid OTP
            if (/^\d{6}$/.test(otp)) {
              set({ isAuthenticated: true });
              showSuccess("OTP verified successfully!");
              resolve(true);
            } else {
              showError("Invalid OTP. Please enter a 6-digit number.");
              resolve(false);
            }
          }, 1500);
        });
      },
      sendOtp: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            showSuccess("OTP sent to your phone!");
            resolve();
          }, 1000);
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);