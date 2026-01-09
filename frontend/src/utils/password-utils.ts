export const getChecks = (password: string): {label: string, test: boolean}[] => ([
    {
        label: 'At least 6 characters',
        test: password.length >= 6,
    },
    {
        label: 'Contains uppercase letters',
        test: /[A-Z]/.test(password),
    },
    {
        label: 'Contains lowercase letters',
        test: /[a-z]/.test(password),
    },
    {
        label: 'Contains a number',
        test: /[0-9]/.test(password),
    },
    {
        label: 'Contains special characters',
        test: /[!@#$%^&*]/.test(password),
    },
]);

export const getStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.match(/[A-Z]/) && password.match(/[a-z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;
    return strength;
}

export const strengthToText: Record<number, string> = {
    0: "Very Weak",
    1: "Weak",
    2: "Fair",
    3: "Good",
    4: "Strong",
}

export const strengthToColor: Record<number, string> = {
    0: 'bg-gray-500',
    1: 'bg-red-500',
    2: 'bg-yellow-500',
    3: 'bg-yellow-500',
    4: 'bg-emerald-500',
}