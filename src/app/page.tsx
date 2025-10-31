import { Suspense } from "react";
import { DevToAPI } from "@/lib/api";
import { ArticleCard } from "@/components/article-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { VisitorBadge } from "@/components/visitor-badge";
import { Pagination } from "@/components/pagination";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

interface HomeProps {
  searchParams: {
    page?: string;
    tab?: string;
  };
}

async function LatestArticles({ page }: { page: number }) {
  const articles = await DevToAPI.getLatestArticles(page, 12);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={10}
        baseUrl="/"
        searchParams={{ tab: 'latest' }}
      />
    </div>
  );
}

async function TopArticles({ page }: { page: number }) {
  const articles = await DevToAPI.getTopArticles(page, 12);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={10}
        baseUrl="/"
        searchParams={{ tab: 'trending' }}
      />
    </div>
  );
}

export default function Home({ searchParams }: HomeProps) {
  const currentPage = parseInt(searchParams.page || '1');
  const activeTab = searchParams.tab || 'latest';

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">DevArt</h1>
            <p className="text-xl text-muted-foreground">
              Discover the latest programming articles and developer insights
            </p>
          </div>
          <VisitorBadge />
        </div>
      </div>

      <Tabs value={activeTab} className="space-y-6">
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
                <LatestArticles page={currentPage} />
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
                <TopArticles page={currentPage} />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}