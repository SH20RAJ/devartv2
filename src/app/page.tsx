import { Suspense } from "react";
import { DevToAPI } from "@/lib/api";
import { ArticleCard } from "@/components/article-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

async function LatestArticles() {
  const articles = await DevToAPI.getLatestArticles(1, 12);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

async function TopArticles() {
  const articles = await DevToAPI.getTopArticles(1, 12);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">DevArt</h1>
        <p className="text-xl text-muted-foreground">
          Discover the latest programming articles and developer insights
        </p>
      </div>

      <Tabs defaultValue="latest" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="latest">Latest Articles</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
        </TabsList>

        <TabsContent value="latest" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Latest Articles</CardTitle>
              <CardDescription>
                Fresh content from the developer community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSkeleton count={12} />}>
                <LatestArticles />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trending Articles</CardTitle>
              <CardDescription>
                Popular articles from the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<LoadingSkeleton count={12} />}>
                <TopArticles />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}