"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";

interface VisitorBadgeProps {
    className?: string;
}

function VisitorBadgeContent({ className = "" }: VisitorBadgeProps) {
    const pathname = usePathname();
    const encodedPath = encodeURIComponent(`https://dev.30tools.com${pathname}`);

    return (
        <div className={`inline-block ${className}`}>
            <a
                href={`https://visitorbadge.io/status?path=${encodedPath}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src={`https://api.visitorbadge.io/api/combined?path=${encodedPath}&countColor=%23263759&style=flat-square&labelStyle=upper`}
                    alt="Visitor Badge"
                    className="inline-block"
                />
            </a>
        </div>
    );
}

export function VisitorBadge({ className = "" }: VisitorBadgeProps) {
    return (
        <Suspense fallback={<div className={`inline-block h-5 w-20 bg-muted rounded ${className}`} />}>
            <VisitorBadgeContent className={className} />
        </Suspense>
    );
}