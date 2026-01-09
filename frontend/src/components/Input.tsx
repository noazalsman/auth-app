import React from 'react';

interface InputProps {
    icon: React.ElementType;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const Input: React.FC<InputProps> = ({icon: Icon, ...props}) => {
    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {<Icon className="size-5 text-gray-400" />}
            </div>
            <input
                {...props}
                className="pl-10 pr-4 py-2 w-full rounded-md shadow-sm bg-stone-50 focus:ring-2 focus:ring-stone-300 sm:text-sm focus:outline-none"
            />
        </div>
    );
};

export default Input;