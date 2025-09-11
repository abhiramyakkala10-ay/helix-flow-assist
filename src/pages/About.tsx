import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  Target, 
  Users, 
  Shield, 
  Brain,
  Stethoscope,
  Award,
  Mail,
  Phone,
  MapPin,
  CheckCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const About = () => {
  const { toast } = useToast();

  const handleContactClick = () => {
    toast({
      title: "Contact Information",
      description: "For inquiries, please reach out to our support team.",
    });
  };

  const keyFeatures = [
    {
      icon: <Users className="h-6 w-6 text-medical-blue" />,
      title: "Patient Management",
      description: "Comprehensive patient records and discharge planning system"
    },
    {
      icon: <Brain className="h-6 w-6 text-medical-green" />,
      title: "AI-Powered Insights",
      description: "Intelligent discharge recommendations and automated summaries"
    },
    {
      icon: <Shield className="h-6 w-6 text-medical-orange" />,
      title: "Secure Data Handling",
      description: "HIPAA-compliant security with encrypted patient information"
    },
    {
      icon: <Stethoscope className="h-6 w-6 text-medical-red" />,
      title: "Medical Integration",
      description: "Seamless integration with existing hospital management systems"
    }
  ];

  const leadershipTeam = [
    {
      name: "Dr. Rajesh Patel",
      role: "Chief Medical Officer",
      department: "Internal Medicine",
      image: "",
      experience: "15+ years"
    },
    {
      name: "Priya Sharma",
      role: "Director of Operations",
      department: "Hospital Administration",
      image: "",
      experience: "12+ years"
    },
    {
      name: "Dr. Amit Kumar",
      role: "Head of Technology",
      department: "Medical Informatics",
      image: "",
      experience: "10+ years"
    },
    {
      name: "Dr. Sunita Gupta",
      role: "Quality Assurance Lead",
      department: "Patient Safety",
      image: "",
      experience: "18+ years"
    }
  ];

  const complianceBadges = [
    { name: "HIPAA Compliant", icon: <Shield className="h-4 w-4" /> },
    { name: "ISO 27001 Certified", icon: <Award className="h-4 w-4" /> },
    { name: "SOC 2 Type II", icon: <CheckCircle className="h-4 w-4" /> },
    { name: "GDPR Compliant", icon: <Shield className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8 space-y-8">
        
        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="bg-gradient-medical text-primary-foreground px-6 py-3 rounded-lg font-bold text-3xl inline-block">
            HELIX
          </div>
          <h1 className="text-4xl font-bold text-foreground">Hospital Discharge Management System</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Streamlining hospital discharge processes with intelligent automation, 
            comprehensive patient management, and seamless workflow integration.
          </p>
        </div>

        {/* About MedDischarge */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Heart className="h-6 w-6 text-medical-red" />
              About MedDischarge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground leading-relaxed">
              HELIX MedDischarge is a state-of-the-art hospital discharge management system designed to 
              revolutionize the way healthcare institutions handle patient transitions from inpatient to 
              outpatient care. Our platform combines cutting-edge technology with intuitive design to 
              ensure seamless, efficient, and error-free discharge processes.
            </p>
            <p className="text-foreground leading-relaxed">
              Built by healthcare professionals for healthcare professionals, HELIX understands the 
              complexities and critical nature of discharge planning. Our system reduces administrative 
              burden, minimizes errors, and improves patient satisfaction while ensuring compliance 
              with healthcare regulations.
            </p>
          </CardContent>
        </Card>

        {/* Mission */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground text-lg leading-relaxed">
              To empower healthcare institutions with intelligent, efficient, and secure discharge 
              management solutions that enhance patient care quality, reduce operational costs, and 
              improve overall healthcare outcomes through technology-driven innovation.
            </p>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Award className="h-6 w-6 text-medical-green" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                  <div className="p-2 rounded-lg bg-background">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What We Do */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-medical-blue" />
              What We Do
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="bg-medical-blue-light p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-medical-blue" />
                </div>
                <h3 className="font-semibold">Patient Care Coordination</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive patient tracking from admission to successful discharge
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="bg-green-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Brain className="h-8 w-8 text-medical-green" />
                </div>
                <h3 className="font-semibold">Intelligent Automation</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered discharge planning and automated workflow management
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="bg-orange-50 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-medical-orange" />
                </div>
                <h3 className="font-semibold">Data Security</h3>
                <p className="text-sm text-muted-foreground">
                  Enterprise-grade security ensuring patient data protection and privacy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leadership Team */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Leadership Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadershipTeam.map((member, index) => (
                <div key={index} className="text-center space-y-3">
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">{member.role}</p>
                    <p className="text-xs text-muted-foreground">{member.department}</p>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {member.experience}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" />
              Get in Touch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@helix.hospital</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+91-1800-HELIX-01</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Headquarters</p>
                  <p className="text-sm text-muted-foreground">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <Button onClick={handleContactClick} className="bg-gradient-medical">
                Contact Our Team
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Compliance Badges */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Security & Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-4">
              {complianceBadges.map((badge, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="px-4 py-2 flex items-center gap-2 bg-background"
                >
                  {badge.icon}
                  {badge.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;