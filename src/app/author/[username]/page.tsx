import { ClientUserArticles } from "@/components/client-user-articles";
import { VisitorBadge } from "@/components/visitor-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

interface AuthorPageProps {
    params: Promise<{
        username: string;
    }>;
    searchParams: Promise<{
        page?: string;
    }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
    const { username } = await params;

    return {
        title: `@${username} | DevArt`,
        description: `Articles by @${username} on DevArt - Discover programming articles and developer insights`,
        keywords: `${username}, programming, development, coding, articles, author`,
        openGraph: {
            title: `@${username} | DevArt`,
            description: `Articles by @${username} on DevArt`,
            type: 'profile',
            url: `https://devto.30tools.com/author/${username}`,
        },
        twitter: {
            card: 'summary',
            title: `@${username} | DevArt`,
            description: `Articles by @${username} on DevArt`,
        },
        alternates: {
            canonical: `https://devto.30tools.com/author/${username}`,
        },
    };
}

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
    const { username } = await params;
    const searchParamsData = await searchParams;
    const currentPage = parseInt(searchParamsData.page || '1');

    return (
        <div className="container mx-auto py-4 md:py-8 px-4 space-y-6 md:space-y-8">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Articles</span>
                </Link>
            </Button>

            {/* Author Profile Header */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col space-y-4 md:flex-row md:items-start md:space-y-0 md:space-x-6">
                        <Avatar className="h-20 w-20 md:h-24 md:w-24 self-center md:self-start">
                            <AvatarImage src={`https://dev.to/api/users/by_username?url=${username}`} alt={username} />
                            <AvatarFallback className="text-xl md:text-2xl">
                                <User className="h-8 w-8 md:h-12 md:w-12" />
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-4 text-center md:text-left">
                            <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold">@{username}</h1>
                                    <p className="text-lg md:text-xl text-muted-foreground">Developer & Writer</p>
                                </div>
                                <div className="self-center md:self-auto">
                                    <VisitorBadge />
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                                <Button variant="outline" size="sm" asChild>
                                    <a
                                        href={`https://dev.to/${username}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center space-x-2"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        <span>Dev.to Profile</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            {/* Author's Articles */}
            <Card>
                <CardHeader>
                    <CardTitle>Articles by @{username}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ClientUserArticles username={username} page={currentPage} />
                </CardContent>
            </Card>
        </div>
    );
}