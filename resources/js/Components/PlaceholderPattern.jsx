import { useId } from 'react';

export function PlaceholderPattern() {
    const patternId = useId();

    return (
        <svg className="absolute inset-0 h-full w-full text-gray-100 dark:text-gray-800" fill="none">
            <defs>
                <pattern
                    id={patternId}
                    x="0"
                    y="0"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"
                        stroke="currentColor"
                        strokeWidth="0.5"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
    );
}
