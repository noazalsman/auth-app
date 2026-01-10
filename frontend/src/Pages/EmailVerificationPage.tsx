import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";

export const EmailVerificationPage = () => {
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const { verifyEmail, isLoading, error } = useAuthStore();
    const navigate = useNavigate();
    
    const handleChange = (index: number, value: string) => {
        // Only allow single digit
        const digit = value.slice(-1);
        if (digit && !/^\d$/.test(digit)) return;

        const newCode = [...code];
        newCode[index] = digit;
        setCode(newCode);

        // Move to next input if a digit was entered
        if (digit && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Move to previous input on backspace if current input is empty
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        
        // Only process if it's a valid 6-digit code
        if (/^\d{1,6}$/.test(pastedData)) {
            const digits = pastedData.split("").slice(0, 6);
            const newCode = [...code];
            
            digits.forEach((digit, i) => {
                newCode[i] = digit;
            });
            
            setCode(newCode);
            
            // Focus the next empty input or the last one
            const nextEmptyIndex = digits.length < 6 ? digits.length : 5;
            inputRefs.current[nextEmptyIndex]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const verificationCode = code.join("");
        
        if (verificationCode.length !== 6) return;
        
        try {
            await verifyEmail(verificationCode);
            toast.success("Email verified successfully");
            navigate("/");
        } catch (err) {
            console.error("Error verifying email", err);
        }
    };

    const isComplete = code.every(digit => digit !== "");

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-emerald-800 mb-2">
                Verify Your Email
            </h1>
            <p className="text-gray-500 text-center text-sm mb-8">
                Enter the 6-digit code sent to your email address
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center gap-2">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-14 text-center text-2xl font-semibold rounded-lg border-2 border-gray-200 bg-stone-50 
                                       focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none
                                       transition-all duration-150"
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={!isComplete || isLoading}
                    className="w-full py-3 px-4 bg-emerald-600 text-white font-medium rounded-md 
                               hover:bg-emerald-700 disabled:bg-emerald-400
                               transition-colors duration-150"
                >
                    {isLoading ? (
                        <Loader className="w-5 h-5 animate-spin mx-auto" />
                    ) : (
                        "Verify Email"
                    )}
                </button>
            </form>
        </div>
    );
};
