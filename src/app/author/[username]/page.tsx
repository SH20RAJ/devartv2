import { Suspense } from "react";
import { DevToAPI } from "@/lib/api";
import { ArticleCard } from "@/components/article-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowLeft, Github, Twitter, Globe } from "lucide-react";
import Link from "next/link";

interface AuthorPageProps {
    params: Promise<{
        username: string;
    }>;
}

async function AuthorArticles({ username }: { username: string }) {
    const articles = await DevToAPI.getUserArticles(username, 1, 20);

    if (articles.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground">No articles found for this author.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>
    );
}

export async function generateMetadata({ params }: AuthorPageProps) {
    const { username } = await params;
    const articles = await DevToAPI.getUserArticles(username, 1, 1);
    const author = articles[0]?.user;

    if (!author) {
        return {
            title: "Author Not Found",
        };
    }

    return {
        title: `${author.name} (@${author.username}) | DevArt`,
        description: `Articles by ${author.name} on DevArt`,
    };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const { username } = await params;
    const articles = await DevToAPI.getUserArticles(username, 1, 1);
    const author = articles[0]?.user;

    if (!author) {
        return (
            <div className="container mx-auto py-8 px-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Author Not Found</h1>
                    <p className="text-muted-foreground mb-8">
                        The author you're looking for doesn't exist or has no articles.
                    </p>
                    <Button asChild>
                        <Link href="/">Back to Home</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            {/* Back Button */}
            <Button variant="ghost" asChild className="mb-4">
                <Link href="/" className="flex items-center space-x-2">
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Articles</span>
                </Link>
            </Button>

            {/* Author Profile */}
            <Card>
                <CardHeader>
                    <div className="flex items-start space-x-6">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={author.profile_image} alt={author.name} />
                            <AvatarFallback className="text-2xl">{author.name.charAt(0)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold">{author.name}</h1>
                                <p className="text-xl text-muted-foreground">@{author.username}</p>
                            </div>

                            <div className="flex items-center space-x-4">
                                {author.twitter_username && (
                                    <Button variant="outline" size="sm" asChild>
                                        <a
                                            href={`https://twitter.com/${author.twitter_username}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2"
                                        >
                                            <Twitter className="h-4 w-4" />
                                            <span>Twitter</span>
                                        </a>
                                    </Button>
                                )}

                                {author.github_username && (
                                    <Button variant="outline" size="sm" asChild>
                                        <a
                                            href={`https://github.com/${author.github_username}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2"
                                        >
                                            <Github className="h-4 w-4" />
                                            <span>GitHub</span>
                                        </a>
                                    </Button>
                                )}

                                {author.website_url && (
                                    <Button variant="outline" size="sm" asChild>
                                        <a
                                            href={author.website_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center space-x-2"
                                        >
                                            <Globe className="h-4 w-4" />
                                            <span>Website</span>
                                        </a>
                                    </Button>
                                )}

                                <Button variant="outline" size="sm" asChild>
                                    <a
                                        href={`https://dev.to/${author.username}`}
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
                    <CardTitle>Articles by {author.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<LoadingSkeleton count={6} />}>
                        <AuthorArticles username={username} />
                    </Suspense>
                </CardContent>
            </Card>
        </div>
    );
}