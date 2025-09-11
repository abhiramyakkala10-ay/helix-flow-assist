import { useState, useEffect } from "react";
import { Patient, DashboardStats } from "@/types";

// Mock data for demonstration
const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "John Smith",
    age: 45,
    gender: "Male",
    room: "101A",
    condition: "Pneumonia",
    status: "Stable",
    doctor: "Dr. Anderson",
    expectedDischarge: "2024-01-15",
    admissionDate: "2024-01-10",
    emergencyContact: "Jane Smith - 9876543210",
    phone: "9876543210",
    address: "123 Main St, Mumbai, MH 400001",
    insurance: "HDFC Health Insurance",
    bloodType: "O+",
    allergies: "Penicillin",
    medications: "Amoxicillin, Paracetamol"
  },
  {
    id: "P002",
    name: "Sarah Johnson",
    age: 32,
    gender: "Female",
    room: "102B",
    condition: "Appendicitis",
    status: "Critical",
    doctor: "Dr. Patel",
    expectedDischarge: "2024-01-20",
    admissionDate: "2024-01-12",
    emergencyContact: "Mike Johnson - 9876543211",
    phone: "9876543211",
    address: "456 Park Ave, Delhi, DL 110001",
    insurance: "Star Health Insurance",
    bloodType: "A+",
    allergies: "None",
    medications: "Morphine, Antibiotics"
  },
  {
    id: "P003",
    name: "Rajesh Kumar",
    age: 58,
    gender: "Male",
    room: "103C",
    condition: "Diabetes Management",
    status: "Recovering",
    doctor: "Dr. Sharma",
    expectedDischarge: "2024-01-14",
    admissionDate: "2024-01-08",
    emergencyContact: "Priya Kumar - 9876543212",
    phone: "9876543212",
    address: "789 Gandhi Rd, Bangalore, KA 560001",
    insurance: "Max Bupa Health Insurance",
    bloodType: "B+",
    allergies: "Shellfish",
    medications: "Insulin, Metformin"
  },
  {
    id: "P004",
    name: "Priya Sharma",
    age: 28,
    gender: "Female",
    room: "104A",
    condition: "Maternity Care",
    status: "Discharged",
    doctor: "Dr. Gupta",
    expectedDischarge: "2024-01-13",
    admissionDate: "2024-01-11",
    emergencyContact: "Amit Sharma - 9876543213",
    phone: "9876543213",
    address: "321 Temple St, Chennai, TN 600001",
    insurance: "Bajaj Allianz Health Insurance",
    bloodType: "AB+",
    allergies: "None",
    medications: "Prenatal vitamins"
  }
];

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addPatient = async (patientData: Omit<Patient, "id">) => {
    setLoading(true);
    try {
      const newPatient: Patient = {
        ...patientData,
        id: `P${(patients.length + 1).toString().padStart(3, "0")}`,
      };
      setPatients(prev => [...prev, newPatient]);
      return newPatient;
    } catch (err) {
      setError("Failed to add patient");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (id: string, updates: Partial<Patient>) => {
    setLoading(true);
    try {
      setPatients(prev => 
        prev.map(patient => 
          patient.id === id ? { ...patient, ...updates } : patient
        )
      );
    } catch (err) {
      setError("Failed to update patient");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getDashboardStats = (): DashboardStats => {
    const today = new Date().toISOString().split('T')[0];
    
    return {
      totalPatients: patients.length,
      dischargedToday: patients.filter(p => 
        p.status === "Discharged" && p.expectedDischarge === today
      ).length,
      pendingDischarge: patients.filter(p => 
        p.status !== "Discharged" && p.expectedDischarge <= today
      ).length,
      criticalCases: patients.filter(p => p.status === "Critical").length,
    };
  };

  const getPatientsByFilter = (filter: "all" | "discharged" | "pending" | "critical") => {
    const today = new Date().toISOString().split('T')[0];
    
    switch (filter) {
      case "discharged":
        return patients.filter(p => p.status === "Discharged" && p.expectedDischarge === today);
      case "pending":
        return patients.filter(p => p.status !== "Discharged" && p.expectedDischarge <= today);
      case "critical":
        return patients.filter(p => p.status === "Critical");
      default:
        return patients;
    }
  };

  return {
    patients,
    loading,
    error,
    addPatient,
    updatePatient,
    getDashboardStats,
    getPatientsByFilter,
  };
};