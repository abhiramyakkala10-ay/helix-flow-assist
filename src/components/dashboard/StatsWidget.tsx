import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Minus } from "lucide-react";
import { Patient } from "@/types";

interface StatsWidgetProps {
  title: string;
  patients: Patient[];
  onClose: () => void;
  filterType: "all" | "discharged" | "pending" | "critical";
}

export const StatsWidget = ({ title, patients, onClose, filterType }: StatsWidgetProps) => {
  const [minimized, setMinimized] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical": return "destructive";
      case "Stable": return "secondary";
      case "Recovering": return "default";
      case "Discharged": return "outline";
      default: return "secondary";
    }
  };

  if (minimized) {
    return (
      <Card className="w-full max-w-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">{title}</CardTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMinimized(false)}
                className="h-6 w-6 p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMinimized(true)}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {patients.length === 0 ? (
            <p className="text-muted-foreground text-sm">No patients found</p>
          ) : (
            patients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{patient.name}</span>
                    <Badge variant={getStatusColor(patient.status) as "destructive" | "secondary" | "default" | "outline"}>
                      {patient.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Room {patient.room} • Dr. {patient.doctor}
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  {patient.expectedDischarge}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};