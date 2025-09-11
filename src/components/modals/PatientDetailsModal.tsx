import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Patient } from "@/types";
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  Heart, 
  Shield, 
  Pill,
  AlertTriangle,
  CreditCard
} from "lucide-react";

interface PatientDetailsModalProps {
  patient: Patient;
  open: boolean;
  onClose: () => void;
}

export const PatientDetailsModal = ({ patient, open, onClose }: PatientDetailsModalProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical": return "destructive";
      case "Stable": return "secondary";
      case "Recovering": return "default";
      case "Discharged": return "outline";
      default: return "secondary";
    }
  };

  // Mock billing data
  const billingInfo = {
    totalAmount: 45750,
    paidAmount: 20000,
    pendingAmount: 25750,
    lastPayment: "2024-01-10",
    items: [
      { description: "Room Charges (5 days)", amount: 15000 },
      { description: "Medical Procedures", amount: 18500 },
      { description: "Medications", amount: 7250 },
      { description: "Laboratory Tests", amount: 5000 },
    ]
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Patient Details - {patient.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Patient ID:</span>
                <span className="font-medium">{patient.id}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Name:</span>
                <span className="font-medium">{patient.name}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Age/Gender:</span>
                <span className="font-medium">{patient.age} / {patient.gender}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Blood Type:</span>
                <span className="font-medium">{patient.bloodType || "Not specified"}</span>
              </div>

              <Separator />
              
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Phone:</p>
                  <p className="font-medium">{patient.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Address:</p>
                  <p className="font-medium">{patient.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Emergency Contact:</p>
                  <p className="font-medium">{patient.emergencyContact}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="h-5 w-5 text-medical-red" />
                Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Room:</span>
                <span className="font-medium">{patient.room}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Condition:</span>
                <span className="font-medium">{patient.condition}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status:</span>
                <Badge variant={getStatusColor(patient.status) as "destructive" | "secondary" | "default" | "outline"}>
                  {patient.status}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Attending Doctor:</span>
                <span className="font-medium">Dr. {patient.doctor}</span>
              </div>

              <Separator />
              
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Admission Date:</p>
                  <p className="font-medium">{patient.admissionDate}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Expected Discharge:</p>
                  <p className="font-medium">{patient.expectedDischarge}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Insurance:</p>
                  <p className="font-medium">{patient.insurance}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allergies & Medications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-medical-orange" />
                Allergies & Medications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Allergies:</p>
                <p className="font-medium">{patient.allergies || "None reported"}</p>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-2">
                <Pill className="h-4 w-4 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">Current Medications:</p>
                  <p className="font-medium">{patient.medications || "None prescribed"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Billing Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold text-foreground">₹{billingInfo.totalAmount.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-medical-green">₹{billingInfo.paidAmount.toLocaleString('en-IN')}</p>
                  <p className="text-sm text-muted-foreground">Paid</p>
                </div>
              </div>
              
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-medical-red">₹{billingInfo.pendingAmount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Billing Breakdown:</p>
                {billingInfo.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.description}</span>
                    <span className="font-medium">₹{item.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};