import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Edit, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Activity,
  Shield,
  Stethoscope,
  Clock,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { User as UserType, Activity as ActivityType } from "@/types";

const UserProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [user, setUser] = useState<UserType>({
    id: "U001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@helix.hospital",
    role: "Senior Physician",
    department: "Internal Medicine",
    phone: "+91-9876543210",
    emergencyContact: "Dr. Michael Johnson - +91-9876543211",
    profileImage: ""
  });

  const [editForm, setEditForm] = useState(user);

  // Mock recent activities
  const recentActivities: ActivityType[] = [
    {
      id: "A001",
      type: "discharge",
      description: "Discharged patient P004 (Priya Sharma)",
      timestamp: "2024-01-13T14:30:00Z",
      userId: "U001"
    },
    {
      id: "A002",
      type: "admission",
      description: "Admitted new patient P002 (Sarah Johnson)",
      timestamp: "2024-01-12T09:15:00Z",
      userId: "U001"
    },
    {
      id: "A003",
      type: "billing",
      description: "Updated billing for patient P001",
      timestamp: "2024-01-12T16:45:00Z",
      userId: "U001"
    },
    {
      id: "A004",
      type: "report",
      description: "Generated daily discharge report",
      timestamp: "2024-01-11T18:00:00Z",
      userId: "U001"
    }
  ];

  const handleEditProfile = () => {
    setIsEditing(true);
    setEditForm(user);
  };

  const handleSaveProfile = () => {
    setUser(editForm);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm(user);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "discharge": return <CheckCircle className="h-4 w-4 text-medical-green" />;
      case "admission": return <User className="h-4 w-4 text-medical-blue" />;
      case "billing": return <Shield className="h-4 w-4 text-medical-orange" />;
      case "report": return <Activity className="h-4 w-4 text-primary" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
            <p className="text-muted-foreground">Manage Your Personal Information and Preferences</p>
          </div>
          
          {!isEditing ? (
            <Button onClick={handleEditProfile} className="bg-gradient-medical">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSaveProfile} className="bg-gradient-medical">
                Save Changes
              </Button>
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Profile Overview */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-muted-foreground">{user.role}</p>
                <Badge variant="secondary" className="mt-2">
                  {user.department}
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{user.department}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="lg:col-span-2 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={editForm.role}
                        onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={editForm.department}
                        onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      value={editForm.emergencyContact}
                      onChange={(e) => setEditForm({...editForm, emergencyContact: e.target.value})}
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                      <p className="text-foreground font-medium">{user.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Email Address</Label>
                      <p className="text-foreground font-medium">{user.email}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Phone Number</Label>
                      <p className="text-foreground font-medium">{user.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Role</Label>
                      <p className="text-foreground font-medium">{user.role}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">Department</Label>
                      <p className="text-foreground font-medium">{user.department}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Emergency Contact</Label>
                    <p className="text-foreground font-medium">{user.emergencyContact}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;