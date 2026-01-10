import { create } from "zustand";
import axios from "axios"

interface AuthStore {
    user: object | null;
    isAuthenticated: boolean;
    error: string | null;
    isLoading: boolean;
    isCheckingAuth: boolean;

    signup: (name: string, email: string, password: string) => Promise<void>;
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
}));