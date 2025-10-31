"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        }
    };

    const clearSearch = () => {
        setQuery('');
        router.push('/');
    };

    return (
        <form onSubmit={handleSearch} className="relative flex items-center space-x-2">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    type="text"
                    placeholder="Search articles, tags, authors..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 pr-10"
                />
                {query && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={clearSearch}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    >
                        <X className="h-3 w-3" />
                    </Button>
                )}
            </div>
            <Button type="submit" size="sm">
                Search
            </Button>
        </form>
    );
}