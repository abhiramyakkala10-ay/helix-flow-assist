export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  room: string;
  condition: string;
  status: "Critical" | "Stable" | "Recovering" | "Discharged";
  doctor: string;
  expectedDischarge: string;
  admissionDate: string;
  emergencyContact: string;
  phone: string;
  address: string;
  insurance: string;
  bloodType?: string;
  allergies?: string;
  medications?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  phone: string;
  emergencyContact: string;
  profileImage?: string;
}

export interface BillingRecord {
  id: string;
  patientId: string;
  patientName: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
  description: string;
}

export interface Activity {
  id: string;
  type: "discharge" | "admission" | "billing" | "report";
  description: string;
  timestamp: string;
  userId: string;
}

export interface DashboardStats {
  totalPatients: number;
  dischargedToday: number;
  pendingDischarge: number;
  criticalCases: number;
}