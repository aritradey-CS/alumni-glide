import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Users, Calendar, Bell } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-card shadow-subtle">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">AlumniMatch AI</h1>
                <p className="text-sm text-muted-foreground">Intelligent Alumni Engagement</p>
              </div>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" className="gap-2" onClick={() => window.location.href = '/'}>
              <Users className="h-4 w-4" />
              Alumni Matching
            </Button>
            <Button variant="ghost" className="gap-2" onClick={() => window.location.href = '/student-projects'}>
              <Calendar className="h-4 w-4" />
              Student Projects
            </Button>
            <Button variant="ghost" className="gap-2" onClick={() => window.location.href = '/mentor-dashboard'}>
              <BrainCircuit className="h-4 w-4" />
              Mentor Dashboard
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
                3
              </Badge>
            </Button>
            <Button variant="professional" size="sm">
              Generate Match
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};