import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: "blue" | "green" | "orange" | "red";
  onClick?: () => void;
}

const colorClasses = {
  blue: "bg-medical-blue-light text-medical-blue border-medical-blue/20",
  green: "bg-green-50 text-medical-green border-medical-green/20",
  orange: "bg-orange-50 text-medical-orange border-medical-orange/20",
  red: "bg-red-50 text-medical-red border-medical-red/20",
};

export const StatsCard = ({ title, value, icon: Icon, color, onClick }: StatsCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-medical ${onClick ? 'hover:scale-105' : ''}`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
          </div>
          <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};