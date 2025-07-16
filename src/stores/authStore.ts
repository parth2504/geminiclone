import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'sonner';

interface AuthState {
  phoneNumber: string;
  countryCode: string;
  isAuthenticated: boolean;
  login: (phone: string, code: string) => void;
  logout: () => void;
  verifyOtp: (otp: string) => Promise<boolean>;
  sendOtp: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      phoneNumber: '',
      countryCode: '+1',
      isAuthenticated: false,
      login: (phone, code) => set({ phoneNumber: phone, countryCode: code }),
      logout: () => set({ isAuthenticated: false }),
      verifyOtp: async (otp) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (otp === '123456') {
              set({ isAuthenticated: true });
              toast.success('OTP verified successfully!');
              resolve(true);
            } else {
              toast.error('Invalid OTP. Please try again.');
              resolve(false);
            }
          }, 1500);
        });
      },
      sendOtp: async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            toast.success('OTP sent to your phone!');
            resolve();
          }, 1000);
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);