import React from 'react';

function Logo({ className = '' }) {
    return (
        <div
            className={`inline-flex items-center font-bold tracking-tight select-none ${className}`}
        >
            {/* Brand Text with Responsive Font Sizes */}
            <span className="text-xl sm:text-2xl md:text-3xl text-slate-900 dark:text-slate-100 transition-colors duration-300">
                Code
                <span className="text-blue-600 dark:text-blue-400">
                    Ink
                </span>
                {/* Subtle dot accent */}
                <span className="text-indigo-600 dark:text-indigo-400">.</span>
            </span>
        </div>
    );
}

export default Logo;