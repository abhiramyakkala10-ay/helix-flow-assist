import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Eye, Users, Activity, AlertTriangle, TrendingUp } from "lucide-react";
import { usePatients } from "@/hooks/usePatients";
import { useToast } from "@/hooks/use-toast";
import { Patient } from "@/types";
import { AddPatientForm } from "@/components/forms/AddPatientForm";
import { PatientDetailsModal } from "@/components/modals/PatientDetailsModal";

const PatientManagement = () => {
  const { patients, getDashboardStats, addPatient, loading } = usePatients();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const stats = getDashboardStats();

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPatient = async (patientData: Omit<Patient, "id">) => {
    try {
      await addPatient(patientData);
      setShowAddForm(false);
      toast({
        title: "Patient Added",
        description: `${patientData.name} has been successfully added to the system.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add patient. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical": return "destructive";
      case "Stable": return "secondary";
      case "Recovering": return "default";
      case "Discharged": return "outline";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Patient Management</h1>
            <p className="text-muted-foreground">Manage patient records and discharge planning</p>
          </div>
          
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-medical">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
              </DialogHeader>
              <AddPatientForm onSubmit={handleAddPatient} loading={loading} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-medical-blue-light border-medical-blue/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-medical-blue" />
                <div>
                  <p className="text-2xl font-bold text-medical-blue">{stats.totalPatients}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-medical-red/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-medical-red" />
                <div>
                  <p className="text-2xl font-bold text-medical-red">{stats.criticalCases}</p>
                  <p className="text-sm text-muted-foreground">Critical</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-medical-green/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-8 w-8 text-medical-green" />
                <div>
                  <p className="text-2xl font-bold text-medical-green">
                    {patients.filter(p => p.status === "Stable").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Stable</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-medical-orange/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Activity className="h-8 w-8 text-medical-orange" />
                <div>
                  <p className="text-2xl font-bold text-medical-orange">
                    {patients.filter(p => p.status === "Recovering").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Recovering</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search patients by name, ID, or doctor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Critical">Critical</SelectItem>
                  <SelectItem value="Stable">Stable</SelectItem>
                  <SelectItem value="Recovering">Recovering</SelectItem>
                  <SelectItem value="Discharged">Discharged</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
        </Card>

        {/* Patient List */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Patient List ({filteredPatients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age/Gender</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Expected Discharge</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}/{patient.gender}</TableCell>
                    <TableCell>{patient.room}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(patient.status) as "destructive" | "secondary" | "default" | "outline"}>
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell>Dr. {patient.doctor}</TableCell>
                    <TableCell>{patient.expectedDischarge}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedPatient(patient)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Patient Details Modal */}
        {selectedPatient && (
          <PatientDetailsModal
            patient={selectedPatient}
            open={!!selectedPatient}
            onClose={() => setSelectedPatient(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PatientManagement;