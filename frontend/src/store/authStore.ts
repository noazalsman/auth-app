import { create } from "zustand";
import axios from "axios"

export interface User {
    _id: string;
    name: string;
    email: string;
    isVerified: boolean;
    lastLogin: Date;
}

interface AuthStore {
    user: User | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
    isCheckingAuth: boolean;

    signup: (name: string, email: string, password: string) => Promise<void>;
    verifyEmail: (token: string) => Promise<void>;
    checkAuth: () => Promise<void>;
}

const API_URL = "http://localhost:3000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: false,

    signup: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { name, email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            // @ts-expect-error - axios error type is not typed
            set({ error: error.response?.data?.message || "An error occurred", isLoading: false });
            throw error;
        }
    },
    verifyEmail: async (token: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { token });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            // @ts-expect-error - axios error type is not typed
            set({ error: error.response?.data?.message || "An error occurred", isLoading: false });
            throw error;
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
        } catch {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false });
        }
    }
}));