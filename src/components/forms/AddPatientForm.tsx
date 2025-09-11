import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Patient } from "@/types";
import { Loader2 } from "lucide-react";

interface AddPatientFormProps {
  onSubmit: (patient: Omit<Patient, "id">) => void;
  loading?: boolean;
}

export const AddPatientForm = ({ onSubmit, loading }: AddPatientFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    room: "",
    condition: "",
    status: "",
    doctor: "",
    expectedDischarge: "",
    admissionDate: "",
    emergencyContact: "",
    phone: "",
    address: "",
    insurance: "",
    bloodType: "",
    allergies: "",
    medications: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const patientData: Omit<Patient, "id"> = {
      ...formData,
      age: parseInt(formData.age),
      gender: formData.gender as "Male" | "Female" | "Other",
      status: formData.status as "Critical" | "Stable" | "Recovering" | "Discharged",
    };
    
    onSubmit(patientData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Enter patient name"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            placeholder="Enter age"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="room">Room Number *</Label>
          <Input
            id="room"
            value={formData.room}
            onChange={(e) => handleChange("room", e.target.value)}
            placeholder="e.g., 101A"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="condition">Medical Condition *</Label>
          <Input
            id="condition"
            value={formData.condition}
            onChange={(e) => handleChange("condition", e.target.value)}
            placeholder="Primary diagnosis"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Critical">Critical</SelectItem>
              <SelectItem value="Stable">Stable</SelectItem>
              <SelectItem value="Recovering">Recovering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="doctor">Attending Doctor *</Label>
          <Input
            id="doctor"
            value={formData.doctor}
            onChange={(e) => handleChange("doctor", e.target.value)}
            placeholder="Doctor name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expectedDischarge">Expected Discharge Date *</Label>
          <Input
            id="expectedDischarge"
            type="date"
            value={formData.expectedDischarge}
            onChange={(e) => handleChange("expectedDischarge", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="admissionDate">Admission Date *</Label>
          <Input
            id="admissionDate"
            type="date"
            value={formData.admissionDate}
            onChange={(e) => handleChange("admissionDate", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="10-digit phone number"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContact">Emergency Contact *</Label>
          <Input
            id="emergencyContact"
            value={formData.emergencyContact}
            onChange={(e) => handleChange("emergencyContact", e.target.value)}
            placeholder="Name - Phone"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="insurance">Insurance Provider</Label>
          <Input
            id="insurance"
            value={formData.insurance}
            onChange={(e) => handleChange("insurance", e.target.value)}
            placeholder="Insurance company name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bloodType">Blood Type</Label>
          <Select value={formData.bloodType} onValueChange={(value) => handleChange("bloodType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Complete address with pin code"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="allergies">Allergies</Label>
        <Textarea
          id="allergies"
          value={formData.allergies}
          onChange={(e) => handleChange("allergies", e.target.value)}
          placeholder="Known allergies (if any)"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="medications">Current Medications</Label>
        <Textarea
          id="medications"
          value={formData.medications}
          onChange={(e) => handleChange("medications", e.target.value)}
          placeholder="Current medications and dosages"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit" disabled={loading} className="bg-gradient-medical">
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Add Patient
        </Button>
      </div>
    </form>
  );
};