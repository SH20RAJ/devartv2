"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container mx-auto py-16 px-4">
            <Card className="max-w-md mx-auto">
                <CardContent className="pt-6">
                    <div className="text-center space-y-6">
                        <AlertTriangle className="h-16 w-16 mx-auto text-destructive" />
                        <div className="space-y-2">
                            <h1 className="text-2xl font-bold">Something went wrong!</h1>
                            <p className="text-muted-foreground">
                                An error occurred while loading the content. Please try again.
                            </p>
                        </div>
                        <Button onClick={reset} className="flex items-center space-x-2">
                            <RefreshCw className="h-4 w-4" />
                            <span>Try Again</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}