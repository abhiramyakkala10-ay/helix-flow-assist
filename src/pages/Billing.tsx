import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  CreditCard, 
  Download, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BillingRecord } from "@/types";
import jsPDF from 'jspdf';

const Billing = () => {
  const { toast } = useToast();
  
  // Mock billing data
  const [billingRecords] = useState<BillingRecord[]>([
    {
      id: "B001",
      patientId: "P001",
      patientName: "John Smith",
      amount: 25750,
      status: "Paid",
      date: "2024-01-12",
      description: "Room charges, medications, lab tests"
    },
    {
      id: "B002",
      patientId: "P002",
      patientName: "Sarah Johnson",
      amount: 45850,
      status: "Pending",
      date: "2024-01-13",
      description: "Surgery, ICU charges, medications"
    },
    {
      id: "B003",
      patientId: "P003",
      patientName: "Rajesh Kumar",
      amount: 18500,
      status: "Overdue",
      date: "2024-01-08",
      description: "Diabetes management, consultations"
    },
    {
      id: "B004",
      patientId: "P004",
      patientName: "Priya Sharma",
      amount: 32000,
      status: "Paid",
      date: "2024-01-11",
      description: "Maternity care, room charges"
    }
  ]);

  const totalRevenue = billingRecords.reduce((sum, record) => sum + record.amount, 0);
  const paidAmount = billingRecords
    .filter(record => record.status === "Paid")
    .reduce((sum, record) => sum + record.amount, 0);
  const pendingAmount = billingRecords
    .filter(record => record.status === "Pending")
    .reduce((sum, record) => sum + record.amount, 0);
  const overdueAmount = billingRecords
    .filter(record => record.status === "Overdue")
    .reduce((sum, record) => sum + record.amount, 0);

  const handleExportBilling = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(32, 84, 147);
    doc.text('HELIX Hospital - Billing Report', 20, 20);
    
    // Current date
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 20, 30);
    
    // Financial Summary
    doc.setFontSize(14);
    doc.text('Financial Summary', 20, 45);
    doc.setFontSize(10);
    doc.text(`Total Revenue: ₹${totalRevenue.toLocaleString('en-IN')}`, 20, 55);
    doc.text(`Paid Amount: ₹${paidAmount.toLocaleString('en-IN')}`, 20, 65);
    doc.text(`Pending Amount: ₹${pendingAmount.toLocaleString('en-IN')}`, 20, 75);
    doc.text(`Overdue Amount: ₹${overdueAmount.toLocaleString('en-IN')}`, 20, 85);
    
    // Billing Records Table
    doc.setFontSize(14);
    doc.text('Billing Records', 20, 105);
    
    let yPos = 115;
    doc.setFontSize(8);
    doc.text('Bill ID', 20, yPos);
    doc.text('Patient Name', 50, yPos);
    doc.text('Amount (₹)', 100, yPos);
    doc.text('Status', 130, yPos);
    doc.text('Date', 155, yPos);
    
    yPos += 10;
    billingRecords.forEach((record, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(record.id, 20, yPos);
      doc.text(record.patientName, 50, yPos);
      doc.text(record.amount.toLocaleString('en-IN'), 100, yPos);
      doc.text(record.status, 130, yPos);
      doc.text(new Date(record.date).toLocaleDateString('en-IN'), 155, yPos);
      yPos += 8;
    });
    
    doc.save('billing-report.pdf');
    toast({
      title: "Report Downloaded",
      description: "Billing report has been downloaded successfully.",
    });
  };

  const handleGenerateInvoice = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(32, 84, 147);
    doc.text('HELIX Hospital - Invoice', 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice Date: ${new Date().toLocaleDateString('en-IN')}`, 20, 30);
    doc.text('Invoice #: INV-2024-001', 20, 40);
    
    // Sample invoice data
    doc.setFontSize(12);
    doc.text('Bill To:', 20, 60);
    doc.setFontSize(10);
    doc.text('John Smith', 20, 70);
    doc.text('Room: 101', 20, 80);
    doc.text('Patient ID: P001', 20, 90);
    
    // Services
    doc.setFontSize(12);
    doc.text('Services:', 20, 110);
    doc.setFontSize(10);
    doc.text('Room Charges: ₹15,000', 30, 120);
    doc.text('Medications: ₹5,750', 30, 130);
    doc.text('Lab Tests: ₹5,000', 30, 140);
    doc.text('Total Amount: ₹25,750', 30, 155);
    
    doc.save('invoice.pdf');
    toast({
      title: "Invoice Generated",
      description: "Invoice has been generated and downloaded.",
    });
  };

  const handleFinancialReport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(32, 84, 147);
    doc.text('HELIX Hospital - Financial Report', 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Report Period: ${new Date().toLocaleDateString('en-IN')}`, 20, 30);
    
    // Monthly Summary
    doc.setFontSize(14);
    doc.text('Monthly Financial Summary', 20, 50);
    doc.setFontSize(10);
    
    const monthlyData = [
      { category: 'Total Revenue', amount: totalRevenue },
      { category: 'Collections', amount: paidAmount },
      { category: 'Outstanding', amount: pendingAmount + overdueAmount },
      { category: 'Collection Rate', amount: ((paidAmount / totalRevenue) * 100) }
    ];
    
    let yPos = 65;
    monthlyData.forEach(item => {
      doc.text(`${item.category}:`, 20, yPos);
      if (item.category === 'Collection Rate') {
        doc.text(`${item.amount.toFixed(1)}%`, 100, yPos);
      } else {
        doc.text(`₹${item.amount.toLocaleString('en-IN')}`, 100, yPos);
      }
      yPos += 10;
    });
    
    doc.save('financial-report.pdf');
    toast({
      title: "Financial Report Downloaded",
      description: "Monthly financial report has been downloaded.",
    });
  };

  const handleOverdueAlerts = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(220, 38, 38);
    doc.text('HELIX Hospital - Overdue Alerts', 20, 20);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 20, 30);
    
    const overdueRecords = billingRecords.filter(record => record.status === "Overdue");
    
    doc.setFontSize(14);
    doc.text(`Total Overdue Amount: ₹${overdueAmount.toLocaleString('en-IN')}`, 20, 50);
    doc.text(`Number of Overdue Bills: ${overdueRecords.length}`, 20, 65);
    
    doc.setFontSize(12);
    doc.text('Overdue Bills:', 20, 85);
    
    let yPos = 100;
    doc.setFontSize(10);
    overdueRecords.forEach((record, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${index + 1}. ${record.patientName} - ₹${record.amount.toLocaleString('en-IN')} (Due: ${new Date(record.date).toLocaleDateString('en-IN')})`, 20, yPos);
      yPos += 15;
    });
    
    doc.save('overdue-alerts.pdf');
    toast({
      title: "Overdue Report Downloaded",
      description: "Overdue alerts report has been downloaded.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "secondary";
      case "Pending": return "default";
      case "Overdue": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid": return <CheckCircle className="h-4 w-4" />;
      case "Pending": return <Clock className="h-4 w-4" />;
      case "Overdue": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Billing Management</h1>
            <p className="text-muted-foreground">Monitor payments and financial transactions</p>
          </div>
          
          <Button onClick={handleExportBilling} className="bg-gradient-medical">
            <Download className="h-4 w-4 mr-2" />
            Export Billing Report
          </Button>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-medical text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Total Revenue</p>
                  <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-medical-green/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Paid Amount</p>
                  <p className="text-2xl font-bold text-medical-green">₹{paidAmount.toLocaleString('en-IN')}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-medical-green" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-medical-orange/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pending Amount</p>
                  <p className="text-2xl font-bold text-medical-orange">₹{pendingAmount.toLocaleString('en-IN')}</p>
                </div>
                <Clock className="h-8 w-8 text-medical-orange" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-medical-red/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Overdue Amount</p>
                  <p className="text-2xl font-bold text-medical-red">₹{overdueAmount.toLocaleString('en-IN')}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-medical-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Balance Display */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Current Balance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-medical-green">₹{paidAmount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-muted-foreground">Total Collected</p>
                <p className="text-xs text-medical-green mt-1">
                  {((paidAmount / totalRevenue) * 100).toFixed(1)}% of total revenue
                </p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-medical-orange">₹{pendingAmount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-muted-foreground">Pending Collection</p>
                <p className="text-xs text-medical-orange mt-1">
                  {((pendingAmount / totalRevenue) * 100).toFixed(1)}% of total revenue
                </p>
              </div>
              
              <div className="text-center p-4 border rounded-lg">
                <p className="text-3xl font-bold text-medical-red">₹{overdueAmount.toLocaleString('en-IN')}</p>
                <p className="text-sm text-muted-foreground">Overdue Amount</p>
                <p className="text-xs text-medical-red mt-1">
                  Requires immediate attention
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Amount (INR)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {billingRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.id}</TableCell>
                    <TableCell>{record.patientName}</TableCell>
                    <TableCell className="font-bold">
                      ₹{record.amount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={getStatusColor(record.status) as "destructive" | "secondary" | "default" | "outline"}
                        className="flex items-center gap-1"
                      >
                        {getStatusIcon(record.status)}
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{new Date(record.date).toLocaleDateString('en-IN')}</TableCell>
                    <TableCell className="max-w-xs truncate">{record.description}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {record.status === "Pending" && (
                          <Button size="sm" className="bg-gradient-medical">
                            Send Reminder
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-medical transition-shadow" onClick={handleGenerateInvoice}>
            <CardContent className="p-6 text-center">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Generate Invoice</h3>
              <p className="text-sm text-muted-foreground">Create new patient invoice</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-medical transition-shadow" onClick={handleFinancialReport}>
            <CardContent className="p-6 text-center">
              <Download className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Financial Report</h3>
              <p className="text-sm text-muted-foreground">Download monthly report</p>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer hover:shadow-medical transition-shadow" onClick={handleOverdueAlerts}>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-medical-red" />
              <h3 className="font-semibold mb-2">Overdue Alerts</h3>
              <p className="text-sm text-muted-foreground">Manage payment reminders</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Billing;