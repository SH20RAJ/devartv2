import { Suspense } from "react";
import { DevToAPI } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, ExternalLink } from "lucide-react";
import Link from "next/link";

async function PopularAuthors() {
    // Get articles from multiple pages to find diverse authors
    const [page1, page2, page3] = await Promise.all([
        DevToAPI.getLatestArticles(1, 30),
        DevToAPI.getLatestArticles(2, 30),
        DevToAPI.getTopArticles(1, 30),
    ]);

    const allArticles = [...page1, ...page2, ...page3];

    // Group articles by author and count
    const authorStats = allArticles.reduce((acc, article) => {
        const username = article.user.username;
        if (!acc[username]) {
            acc[username] = {
                user: article.user,
                articleCount: 0,
                totalReactions: 0,
                totalComments: 0,
                tags: new Set<string>(),
            };
        }
        acc[username].articleCount++;
        acc[username].totalReactions += article.public_reactions_count;
        acc[username].totalComments += article.comments_count;
        article.tag_list.forEach(tag => acc[username].tags.add(tag));
        return acc;
    }, {} as Record<string, any>);

    // Convert to array and sort by engagement
    const authors = Object.values(authorStats)
        .sort((a: any, b: any) => (b.totalReactions + b.totalComments) - (a.totalReactions + a.totalComments))
        .slice(0, 24); // Show top 24 authors

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {authors.map((authorData: any) => (
                <Card key={authorData.user.username} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                        <Link href={`/author/${authorData.user.username}`}>
                            <Avatar className="h-16 w-16 mx-auto mb-4">
                                <AvatarImage src={authorData.user.profile_image_90} alt={authorData.user.name} />
                                <AvatarFallback className="text-lg">{authorData.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        </Link>
                        <div className="space-y-1">
                            <Link
                                href={`/author/${authorData.user.username}`}
                                className="text-lg font-semibold hover:text-primary transition-colors"
                            >
                                {authorData.user.name}
                            </Link>
                            <p className="text-sm text-muted-foreground">@{authorData.user.username}</p>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-2 text-center text-sm">
                            <div>
                                <div className="font-semibold">{authorData.articleCount}</div>
                                <div className="text-muted-foreground">Articles</div>
                            </div>
                            <div>
                                <div className="font-semibold">{authorData.totalReactions}</div>
                                <div className="text-muted-foreground">Reactions</div>
                            </div>
                            <div>
                                <div className="font-semibold">{authorData.totalComments}</div>
                                <div className="text-muted-foreground">Comments</div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                            {Array.from(authorData.tags).slice(0, 3).map((tag: string) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                            {authorData.tags.size > 3 && (
                                <Badge variant="outline" className="text-xs">
                                    +{authorData.tags.size - 3}
                                </Badge>
                            )}
                        </div>

                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="flex-1" asChild>
                                <Link href={`/author/${authorData.user.username}`}>
                                    View Profile
                                </Link>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <a
                                    href={`https://dev.to/${authorData.user.username}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export const metadata = {
    title: "Popular Authors | DevArt",
    description: "Discover popular programming authors and developers in the community.",
};

export default function AuthorsPage() {
    return (
        <div className="container mx-auto py-8 space-y-8">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>
            </Button>

            {/* Page Header */}
            <div className="space-y-2">
                <div className="flex items-center space-x-3">
                    <Users className="h-8 w-8 text-primary" />
                    <h1 className="text-4xl font-bold tracking-tight">Popular Authors</h1>
                </div>
                <p className="text-xl text-muted-foreground">
                    Discover talented developers and their contributions to the community
                </p>
            </div>

            {/* Authors Grid */}
            <Card>
                <CardHeader>
                    <CardTitle>Featured Authors</CardTitle>
                    <CardDescription>
                        Authors with the most engaging content and active community participation
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <Card key={i} className="animate-pulse">
                                    <CardHeader className="text-center">
                                        <div className="h-16 w-16 bg-muted rounded-full mx-auto mb-4" />
                                        <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2" />
                                        <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            {Array.from({ length: 3 }).map((_, j) => (
                                                <div key={j} className="text-center">
                                                    <div className="h-4 bg-muted rounded mb-1" />
                                                    <div className="h-3 bg-muted rounded" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex space-x-1">
                                            {Array.from({ length: 3 }).map((_, j) => (
                                                <div key={j} className="h-5 bg-muted rounded flex-1" />
                                            ))}
                                        </div>
                                        <div className="h-8 bg-muted rounded" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    }>
                        <PopularAuthors />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}