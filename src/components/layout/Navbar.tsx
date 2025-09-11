import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Settings, 
  LogOut, 
  FileText,
  Download,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Patient Management", href: "/patients" },
  { name: "Billing", href: "/billing" },
  { name: "User Profile", href: "/profile" },
  { name: "About", href: "/about" },
];

export const Navbar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [currentUser] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@helix.hospital",
    avatar: "",
  });

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your data export is being prepared...",
    });
  };

  const handleBulkAction = () => {
    toast({
      title: "Bulk Action",
      description: "Select patients to perform bulk actions",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report Generation",
      description: "Generating comprehensive report...",
    });
  };

  return (
    <nav className="bg-card border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-medical text-primary-foreground px-3 py-1 rounded-lg font-bold text-xl">
                HELIX
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? "text-primary bg-medical-blue-light"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Quick Actions */}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExport}
              className="hidden lg:flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBulkAction}
              className="hidden lg:flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              Bulk Actions
            </Button>

            <Button 
              size="sm" 
              onClick={handleGenerateReport}
              className="hidden lg:flex items-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {currentUser.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-card border shadow-md" align="end">
                <div className="px-4 py-3 border-b">
                  <p className="text-sm font-medium">{currentUser.name}</p>
                  <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                </div>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};