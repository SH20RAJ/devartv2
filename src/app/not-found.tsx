import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileQuestion, Home } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container mx-auto py-16">
            <Card className="max-w-md mx-auto">
                <CardContent className="pt-6">
                    <div className="text-center space-y-6">
                        <FileQuestion className="h-16 w-16 mx-auto text-muted-foreground" />
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">Page Not Found</h1>
                            <p className="text-muted-foreground">
                                The page you're looking for doesn't exist or has been moved.
                            </p>
                        </div>
                        <Button asChild>
                            <Link href="/" className="flex items-center space-x-2">
                                <Home className="h-4 w-4" />
                                <span>Back to Home</span>
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}