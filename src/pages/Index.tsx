import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, Users, Activity, AlertTriangle, TrendingUp } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { StatsWidget } from "@/components/dashboard/StatsWidget";
import { usePatients } from "@/hooks/usePatients";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';

const Index = () => {
  const { getDashboardStats, getPatientsByFilter } = usePatients();
  const { toast } = useToast();
  const navigate = useNavigate();
  const stats = getDashboardStats();
  
  const [activeWidget, setActiveWidget] = useState<{
    type: "all" | "discharged" | "pending" | "critical" | null;
    title: string;
  } | null>(null);

  const handleStatsClick = (type: "all" | "discharged" | "pending" | "critical", title: string) => {
    if (type === "all") {
      // Quick navigation to Patient Management
      navigate("/patients");
    } else {
      setActiveWidget({ type, title });
    }
  };

  const handleGenerateReport = () => {
    try {
      const doc = new jsPDF();
      const today = new Date().toLocaleDateString('en-IN');
      
      // Title
      doc.setFontSize(20);
      doc.text('HELIX - Daily Discharge Report', 20, 30);
      
      // Date
      doc.setFontSize(12);
      doc.text(`Generated on: ${today}`, 20, 45);
      
      // Stats table
      doc.setFontSize(14);
      doc.text('Dashboard Statistics', 20, 65);
      
      const tableData = [
        ['Metric', 'Count'],
        ['Total Patients', stats.totalPatients.toString()],
        ['Discharged Today', stats.dischargedToday.toString()],
        ['Pending Discharge', stats.pendingDischarge.toString()],
        ['Critical Cases', stats.criticalCases.toString()]
      ];
      
      let yPos = 80;
      tableData.forEach((row, index) => {
        if (index === 0) {
          doc.setFont(undefined, 'bold');
        } else {
          doc.setFont(undefined, 'normal');
        }
        doc.text(row[0], 20, yPos);
        doc.text(row[1], 100, yPos);
        yPos += 15;
      });
      
      // Save the PDF
      doc.save(`helix-daily-report-${today.replace(/\//g, '-')}.pdf`);
      
      toast({
        title: "Report Downloaded",
        description: "Daily discharge report has been generated and downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive"
      });
    }
  };

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const recentDischarges = getPatientsByFilter("discharged").slice(0, 3);
  const pendingTasks = [
    { id: 1, task: "Review discharge paperwork for Room 101A", priority: "High" },
    { id: 2, task: "Insurance verification for P002", priority: "Medium" },
    { id: 3, task: "Schedule follow-up for discharged patients", priority: "Low" },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Dr. Sarah Johnson</p>
          </div>
          
          {/* Date and Generate Report */}
          <Card className="bg-card shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {today}
                </div>
                <Button onClick={handleGenerateReport} className="bg-gradient-medical">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            color="blue"
            onClick={() => handleStatsClick("all", "All Patients")}
          />
          <StatsCard
            title="Discharged Today"
            value={stats.dischargedToday}
            icon={TrendingUp}
            color="green"
            onClick={() => handleStatsClick("discharged", "Discharged Today")}
          />
          <StatsCard
            title="Pending Discharge"
            value={stats.pendingDischarge}
            icon={Activity}
            color="orange"
            onClick={() => handleStatsClick("pending", "Pending Discharge")}
          />
          <StatsCard
            title="Critical Cases"
            value={stats.criticalCases}
            icon={AlertTriangle}
            color="red"
            onClick={() => handleStatsClick("critical", "Critical Cases")}
          />
        </div>

        {/* Active Widget */}
        {activeWidget && (
          <div className="flex justify-center">
            <StatsWidget
              title={activeWidget.title}
              patients={getPatientsByFilter(activeWidget.type)}
              onClose={() => setActiveWidget(null)}
              filterType={activeWidget.type}
            />
          </div>
        )}

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Recent Discharges */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-medical-green" />
                Recent Discharges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentDischarges.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No recent discharges today</p>
                ) : (
                  recentDischarges.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium text-sm">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">Room {patient.room} • {patient.condition}</p>
                      </div>
                      <Badge variant="secondary">Discharged</Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-medical-orange" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="text-sm">{task.task}</p>
                    </div>
                    <Badge 
                      variant={task.priority === "High" ? "destructive" : "secondary"}
                      className={task.priority === "Medium" ? "bg-medical-orange text-white" : ""}
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
