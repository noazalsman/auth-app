import { getChecks } from "../../utils/password-utils";

export const PasswordChecks = ({password}: {password: string}) => {
    const checks = getChecks(password);

    return (
        <div>
            {checks.map((check) => (
                <div key={check.label} className="flex items-center gap-2">
                    {check.test ? (
                        <span className="text-xs text-emerald-500">✓</span>
                    ) : (
                        <span className="text-xs text-gray-500">✗</span>
                    )}
                    <span className={`text-xs ${check.test ? 'text-emerald-500' : 'text-gray-500'}`}>{check.label}</span>
                </div>
            ))}
        </div>
    )
}