import { useNavigate } from "react-router-dom";
import { User, Calendar, Clock, Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { formatDate, formatDateTime } from "../utils/date-utils";

const DashboardPage = () => {
    const { user, logout, isLoading, error } = useAuthStore();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error("Error logging out", err);
        }
    }

    return (
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-5">
            <h1 className="text-2xl font-bold text-center text-emerald-800">Dashboard</h1>

            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <User size={20} />
                    Profile Information
                </h2>
                <div className="space-y-2 text-stone-700">
                    <p><span className="font-medium">Name:</span> {user?.name}</p>
                    <p><span className="font-medium">Email:</span> {user?.email}</p>
                </div>
            </div>

            <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                <h2 className="text-lg font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                    <Calendar size={20} />
                    Account Activity
                </h2>
                <div className="space-y-2 text-stone-700">
                    <p className="flex items-center gap-2">
                        <Clock size={16} className="text-stone-500" />
                        <span className="font-medium">Joined:</span> {user?.createdAt ? formatDate(user.createdAt) : "---"}
                    </p>
                    <p className="flex items-center gap-2">
                        <Clock size={16} className="text-stone-500" />
                        <span className="font-medium">Last Login:</span> {user?.lastLogin ? formatDateTime(user.lastLogin) : "--"}
                    </p>
                </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button onClick={handleLogout} disabled={isLoading} className="w-full py-2 px-4 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                {isLoading ? <Loader size={24} className="animate-spin mx-auto" /> : "Logout"}
            </button>
        </div>
    );
};

export default DashboardPage;
