import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="relative min-h-[70vh] w-full flex flex-col items-center justify-center overflow-hidden bg-background text-foreground transition-colors duration-300">

            {/* Ambient Background Grid & Blue Soft Light */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/15 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Spinner Container */}
            <div className="relative z-10 flex flex-col items-center gap-4 p-6 rounded-2xl border border-blue-500/15 bg-background/50 backdrop-blur-md shadow-xl">
                <div className="relative flex items-center justify-center">
                    {/* Glowing Ring */}
                    <div className="absolute h-12 w-12 rounded-full bg-blue-500/20 blur-md animate-pulse" />

                    {/* Animated Spinner Icon */}
                    <Loader2 className="h-10 w-10 animate-spin text-blue-600 dark:text-blue-400" />
                </div>

                {/* Loading Text */}
                <div className="space-y-1 text-center">
                    <p className="text-sm font-semibold tracking-wide text-foreground">
                        Loading...
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Fetching the latest content
                    </p>
                </div>
            </div>

        </div>
    );
}