"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    searchParams?: Record<string, string>;
}

export function Pagination({ currentPage, totalPages, baseUrl, searchParams = {} }: PaginationProps) {
    const createUrl = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        return `${baseUrl}?${params.toString()}`;
    };

    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    if (totalPages <= 1) return null;

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="sm"
                asChild={currentPage > 1}
                disabled={currentPage <= 1}
            >
                {currentPage > 1 ? (
                    <Link href={createUrl(currentPage - 1)} className="flex items-center space-x-1">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                    </Link>
                ) : (
                    <span className="flex items-center space-x-1">
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                    </span>
                )}
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
                {visiblePages.map((page, index) => (
                    <div key={index}>
                        {page === '...' ? (
                            <Button variant="ghost" size="sm" disabled>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        ) : (
                            <Button
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                asChild={currentPage !== page}
                                disabled={currentPage === page}
                            >
                                {currentPage === page ? (
                                    <span>{page}</span>
                                ) : (
                                    <Link href={createUrl(page as number)}>{page}</Link>
                                )}
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="sm"
                asChild={currentPage < totalPages}
                disabled={currentPage >= totalPages}
            >
                {currentPage < totalPages ? (
                    <Link href={createUrl(currentPage + 1)} className="flex items-center space-x-1">
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                ) : (
                    <span className="flex items-center space-x-1">
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                    </span>
                )}
            </Button>
        </div>
    );
}