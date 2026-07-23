import React from 'react';
import LeftSidebar from '@/components/dashboard/LeftSidebar';

function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen w-full">
            <div className="flex">
                <LeftSidebar />
                {/* Fixed: Added min-w-0 and overflow-x-hidden */}
                <div className="flex-1 min-w-0 overflow-x-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default layout;