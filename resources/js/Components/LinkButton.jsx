import { Link } from '@inertiajs/react';
import React from 'react';

export default function LinkButton({ Disabled, Text, CustomClass = null, Icon, URL }) {
    return (
        <>
            <Link
                href={URL}
                className={`shadow-theme-xs my-3 flex w-full max-w-[200px] items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-600 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10 ${CustomClass} ${Disabled && 'pointer-events-none cursor-not-allowed opacity-25 dark:opacity-40'} `}
            >
                {Text}

                <div className="mx-2">{Icon ? Icon : ''}</div>
            </Link>
        </>
    );
}
