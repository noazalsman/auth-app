import { getStrength, strengthToColor, strengthToText } from "../../utils/password-utils";
import { PasswordChecks } from "./PasswordChecks"

export const PasswordStrengthSection = ({password}: {password: string}) => {
    const strength = getStrength(password);
    const strengthText = strengthToText[strength];

    const getIsColored = (index: number) => {
        return strength >= index + 1;
    }

    return (
        <div className="space-y-2">
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <h2 className="text-xs font-medium text-gray-500">Password Strength</h2>
                    <p className="text-xs text-gray-500">{strengthText}</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className={`w-[25%] h-1 ${getIsColored(0) ? strengthToColor[strength] : 'bg-gray-300'}`}></div>
                    <div className={`w-[25%] h-1 ${getIsColored(1) ? strengthToColor[strength] : 'bg-gray-300'}`}></div>
                    <div className={`w-[25%] h-1 ${getIsColored(2) ? strengthToColor[strength] : 'bg-gray-300'}`}></div>
                    <div className={`w-[25%] h-1 ${getIsColored(3) ? strengthToColor[strength] : 'bg-gray-300'}`}></div>
                </div>
            </div>

            <PasswordChecks password={password} />
        </div>
    )
}