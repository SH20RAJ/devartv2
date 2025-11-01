import { VisitorBadge } from "@/components/visitor-badge";
import { ClientArticlesGrid } from "@/components/client-articles-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

interface HomeProps {
  searchParams: Promise<{
    page?: string;
    tab?: string;
  }>;
}

export const metadata: Metadata = {
  title: "DevArt - Programming Articles & Developer Resources",
  description: "Discover the latest programming articles, coding tutorials, and developer resources from the Dev.to community. Stay updated with trending tech content.",
  keywords: "programming, development, coding, tutorials, javascript, python, react, nextjs, web development, software engineering",
  openGraph: {
    title: "DevArt - Programming Articles & Developer Resources",
    description: "Discover the latest programming articles, coding tutorials, and developer resources from the Dev.to community.",
    type: "website",
    url: "https://devto.30tools.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevArt - Programming Articles & Developer Resources",
    description: "Discover the latest programming articles, coding tutorials, and developer resources from the Dev.to community.",
  },
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1');
  const activeTab = params.tab || 'latest';

  return (
    <div className="container mx-auto py-4 md:py-8 px-4 space-y-6 md:space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">DevArt</h1>
            <p className="text-base md:text-xl text-muted-foreground">
              Discover the latest programming articles and developer insights
            </p>
          </div>
          <div className="self-start md:self-auto">
            <VisitorBadge />
          </div>
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
              <ClientArticlesGrid
                type="latest"
                page={currentPage}
                baseUrl="/"
                searchParams={{ tab: 'latest' }}
              />
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
              <ClientArticlesGrid
                type="top"
                page={currentPage}
                baseUrl="/"
                searchParams={{ tab: 'trending' }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}