import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { showError, showSuccess } from "@/utils/toast";

interface AuthState {
  isAuthenticated: boolean;
  phoneNumber: string | null;
  countryCode: string | null;
  setPhoneAndCode: (phone: string, code: string) => void;
  verifyOtp: (otp: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      phoneNumber: null,
      countryCode: null,
      setPhoneAndCode: (phone: string, code: string) => {
        set({ phoneNumber: phone, countryCode: code });
      },
      verifyOtp: (otp: string) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            // Simulate OTP verification
            if (otp === "123456") {
              set({ isAuthenticated: true });
              showSuccess("Login successful!");
              resolve(true);
            } else {
              showError("Invalid OTP. Please try again.");
              resolve(false);
            }
          }, 1000);
        });
      },
      logout: () => {
        set({
          isAuthenticated: false,
          phoneNumber: null,
          countryCode: null,
        });
        showSuccess("You have been logged out.");
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);