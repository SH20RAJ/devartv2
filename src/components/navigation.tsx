"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { Code2, Home, TrendingUp, Users } from "lucide-react";

export function Navigation() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex h-16 items-center justify-between">
                <div className="flex items-center space-x-4 md:space-x-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <Code2 className="h-5 w-5 md:h-6 md:w-6" />
                        <span className="font-bold text-lg md:text-xl">DevArt</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/" className="flex items-center space-x-2">
                                <Home className="h-4 w-4" />
                                <span>Home</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/trending" className="flex items-center space-x-2">
                                <TrendingUp className="h-4 w-4" />
                                <span>Trending</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/authors" className="flex items-center space-x-2">
                                <Users className="h-4 w-4" />
                                <span>Authors</span>
                            </Link>
                        </Button>
                    </nav>
                </div>

                <div className="flex items-center space-x-2 md:space-x-4 flex-1 justify-end">
                    <div className="w-full max-w-[200px] md:max-w-sm">
                        <Suspense fallback={<div className="h-8 md:h-9 w-full bg-muted rounded-md animate-pulse" />}>
                            <SearchBar />
                        </Suspense>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden border-t bg-background/95">
                <div className="container mx-auto px-4 py-2">
                    <nav className="flex items-center justify-around">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/" className="flex flex-col items-center space-y-1">
                                <Home className="h-4 w-4" />
                                <span className="text-xs">Home</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/trending" className="flex flex-col items-center space-y-1">
                                <TrendingUp className="h-4 w-4" />
                                <span className="text-xs">Trending</span>
                            </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/authors" className="flex flex-col items-center space-y-1">
                                <Users className="h-4 w-4" />
                                <span className="text-xs">Authors</span>
                            </Link>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}