import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
      <Card className="max-w-md w-full mx-4 shadow-card">
        <CardContent className="p-8 text-center space-y-6">
          <div className="bg-gradient-medical text-primary-foreground px-4 py-2 rounded-lg font-bold text-2xl inline-block">
            HELIX
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => window.history.back()} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button asChild className="bg-gradient-medical">
              <a href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Return to Dashboard
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
