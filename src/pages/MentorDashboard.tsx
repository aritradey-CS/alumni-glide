import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockMentors, mockTeams, mockStudents } from "@/data/mockUserData";
import { Mentor, Team, Student } from "@/types/users";
import { Users, Award, Calendar, Search, Plus, MapPin, Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MentorDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'portfolio'>('overview');
  const [currentMentor] = useState<Mentor>(mockMentors[0]); // Simulate logged-in mentor
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const mentorProjects = mockTeams.filter(team => team.mentor.id === currentMentor.id);
  const allStudents = mockStudents;

  const stats = [
    {
      title: "Active Projects",
      value: currentMentor.currentProjects.toString(),
      max: currentMentor.maxProjects.toString(),
      icon: Users,
    },
    {
      title: "Students Mentored",
      value: (mentorProjects.reduce((acc, team) => acc + team.members.length, 0)).toString(),
      change: "This semester",
      icon: Award,
    },
    {
      title: "Completion Rate",
      value: "94%",
      change: "Success rate",
      icon: Calendar,
    },
    {
      title: "Availability",
      value: currentMentor.availability,
      change: "Current status",
      icon: MapPin,
    },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <Card variant="highlight">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {currentMentor.avatarUrl ? (
                      <img
                        src={currentMentor.avatarUrl}
                        alt={currentMentor.name}
                        className="h-16 w-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                        {currentMentor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl">Welcome back, {currentMentor.name}!</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Badge variant="professional">
                        {currentMentor.type === 'faculty' ? 'Faculty' : 'Alumni'}
                      </Badge>
                      {currentMentor.company && (
                        <span className="flex items-center gap-1 text-sm">
                          <Building className="h-3 w-3" />
                          {currentMentor.position} at {currentMentor.company}
                        </span>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title} variant="professional">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {stat.value}
                        {stat.max && <span className="text-lg text-muted-foreground">/{stat.max}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Expertise Areas */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Your Expertise Areas</CardTitle>
                <CardDescription>
                  Skills you bring to student projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {currentMentor.expertise.map((skill) => (
                    <Badge key={skill} variant="expertise">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Current Projects</h2>
                <Button variant="outline" onClick={() => setActiveTab('projects')}>
                  View All Projects
                </Button>
              </div>
              
              {mentorProjects.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {mentorProjects.slice(0, 2).map((team) => (
                    <Card key={team.id} variant="elevated">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{team.projectIdea.title}</CardTitle>
                            <CardDescription>
                              {team.projectIdea.category.replace('-', ' ').toUpperCase()}
                            </CardDescription>
                          </div>
                          <Badge variant="professional">
                            {team.status.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium mb-2">Team Members ({team.members.length})</p>
                            <div className="flex -space-x-2">
                              {team.members.map((member) => (
                                <div
                                  key={member.student.id}
                                  className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold border-2 border-background"
                                  title={member.student.name}
                                >
                                  {member.student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium mb-1">Progress</p>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className="bg-gradient-primary h-2 rounded-full" 
                                style={{ width: `${team.progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{team.progress}% complete</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card variant="elevated">
                  <CardContent className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Active Projects</h3>
                    <p className="text-muted-foreground">
                      You'll be automatically assigned to projects that match your expertise.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">My Projects</h1>
                <p className="text-muted-foreground mt-2">
                  Manage and track all your mentoring projects
                </p>
              </div>
              <Button variant="outline" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </Button>
            </div>

            {mentorProjects.length > 0 ? (
              <div className="grid gap-6">
                {mentorProjects.map((team) => (
                  <Card key={team.id} variant="professional">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{team.projectIdea.title}</CardTitle>
                          <CardDescription className="mt-2">
                            {team.projectIdea.description}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="professional">
                            {team.projectIdea.category.replace('-', ' ').toUpperCase()}
                          </Badge>
                          <Badge variant="success">
                            {team.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        <div>
                          <p className="text-sm font-medium mb-2">Team Members</p>
                          <div className="space-y-2">
                            {team.members.map((member) => (
                              <div key={member.student.id} className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-semibold">
                                  {member.student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{member.student.name}</p>
                                  <p className="text-xs text-muted-foreground">{member.role}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Progress</p>
                          <div className="w-full bg-muted rounded-full h-2 mb-2">
                            <div 
                              className="bg-gradient-primary h-2 rounded-full" 
                              style={{ width: `${team.progress}%` }}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">{team.progress}% complete</p>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">Milestones</p>
                          <div className="space-y-1">
                            {team.milestones.map((milestone) => (
                              <div key={milestone.id} className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${
                                  milestone.status === 'completed' ? 'bg-success' : 
                                  milestone.status === 'in-progress' ? 'bg-warning' : 'bg-muted'
                                }`} />
                                <p className="text-xs">{milestone.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4 pt-4 border-t">
                        <Button variant="professional" size="sm">
                          Message Team
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card variant="elevated">
                <CardContent className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
                  <h3 className="text-xl font-semibold mb-4">No Active Projects</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    You'll be automatically assigned to projects that match your expertise areas. 
                    Students and the AI matching system will connect you with relevant projects.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">My Portfolio</h1>
                <p className="text-muted-foreground mt-2">
                  Your achievements and contributions
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setActiveTab('overview')}>
                  Back to Overview
                </Button>
                <Button variant="professional">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </div>

            <div className="grid gap-6">
              {currentMentor.portfolio.map((item) => (
                <Card key={item.id} variant="elevated">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription className="mt-2">
                          {item.description}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="professional">
                          {item.category.toUpperCase()}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          {item.date.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  {item.technologies && (
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <Badge key={tech} variant="expertise" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={activeTab === 'overview' ? 'professional' : 'ghost'}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </Button>
          <Button
            variant={activeTab === 'projects' ? 'professional' : 'ghost'}
            onClick={() => setActiveTab('projects')}
          >
            My Projects
          </Button>
          <Button
            variant={activeTab === 'portfolio' ? 'professional' : 'ghost'}
            onClick={() => setActiveTab('portfolio')}
          >
            Portfolio
          </Button>
        </div>

        {getTabContent()}
      </main>
    </div>
  );
};

export default MentorDashboard;