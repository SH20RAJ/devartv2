"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { Code2, Home, TrendingUp, Users } from "lucide-react";

export function Navigation() {
    return (
        <header className="sticky top-0 z-50 w-full mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center space-x-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <Code2 className="h-6 w-6" />
                        <span className="font-bold text-xl">DevArt</span>
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

                <div className="flex items-center space-x-4">
                    <div className="w-full max-w-sm">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </header>
    );
}