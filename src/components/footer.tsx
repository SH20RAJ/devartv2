import { Code2, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
            <div className="container py-8">
                <div className="grid gap-8 md:grid-cols-4">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <Code2 className="h-6 w-6" />
                            <span className="font-bold text-xl">DevArt</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Discover the latest programming articles and developer insights from the Dev.to community.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Explore</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Latest Articles
                                </Link>
                            </li>
                            <li>
                                <Link href="/trending" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Trending
                                </Link>
                            </li>
                            <li>
                                <Link href="/authors" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Popular Authors
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="https://dev.to"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Dev.to Community
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://dev.to/api"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Dev.to API
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">About</h3>
                        <p className="text-sm text-muted-foreground">
                            Built with Next.js, shadcn/ui, and the Dev.to API to showcase modern web development practices.
                        </p>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t flex items-center justify-between text-sm text-muted-foreground">
                    <p>© 2024 DevArt. All rights reserved.</p>
                    <div className="flex items-center space-x-1">
                        <span>Made with</span>
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>for developers</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}