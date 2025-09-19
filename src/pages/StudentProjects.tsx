import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { ProjectIdeaForm } from "@/components/projects/ProjectIdeaForm";
import { ProjectIdeaCard } from "@/components/projects/ProjectIdeaCard";
import { TeamMatchingInterface } from "@/components/teams/TeamMatchingInterface";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProjectIdeas, mockStudents } from "@/data/mockUserData";
import { ProjectIdea, Student, TeamMatch } from "@/types/users";
import { Plus, Users, Lightbulb, Target, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentProjects = () => {
  const [activeTab, setActiveTab] = useState<'browse' | 'post' | 'team-matching'>('browse');
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>(mockProjectIdeas);
  const [selectedProject, setSelectedProject] = useState<ProjectIdea | null>(null);
  const [currentUser] = useState<Student>(mockStudents[0]); // Simulate logged-in student
  const { toast } = useToast();

  const handlePostProject = (newProject: Partial<ProjectIdea>) => {
    const project: ProjectIdea = {
      ...newProject,
      id: Date.now().toString(),
      postedBy: currentUser.id,
      postedAt: new Date(),
      status: 'open',
      maxTeamSize: 3,
    } as ProjectIdea;
    
    setProjectIdeas(prev => [project, ...prev]);
    setActiveTab('browse');
    
    toast({
      title: "Project posted successfully!",
      description: "Your project idea is now visible to potential team members.",
    });
  };

  const handleJoinTeam = (projectIdea: ProjectIdea) => {
    setSelectedProject(projectIdea);
    setActiveTab('team-matching');
  };

  const handleFormTeam = (matches: TeamMatch[]) => {
    toast({
      title: "Team formed successfully!",
      description: `Your team of ${matches.length + 1} members has been created. A mentor will be assigned automatically.`,
    });
    setActiveTab('browse');
  };

  const stats = [
    {
      title: "Active Projects",
      value: projectIdeas.filter(p => p.status === 'open').length.toString(),
      change: "+3 this week",
      icon: Lightbulb,
    },
    {
      title: "Teams Formed",
      value: "24",
      change: "+8 this month",
      icon: Users,
    },
    {
      title: "Success Rate",
      value: "87%",
      change: "+5% improvement",
      icon: Target,
    },
    {
      title: "Active Students",
      value: mockStudents.length.toString(),
      change: "Online now",
      icon: TrendingUp,
    },
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case 'browse':
        return (
          <div className="space-y-6">
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
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="flex gap-4">
              <Button 
                variant="professional" 
                size="lg"
                onClick={() => setActiveTab('post')}
              >
                <Plus className="h-5 w-5 mr-2" />
                Post New Project
              </Button>
              <Button variant="outline" size="lg">
                <Users className="h-5 w-5 mr-2" />
                My Teams
              </Button>
            </div>

            {/* Project Ideas Grid */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Discover Project Ideas</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projectIdeas.map((projectIdea) => (
                  <ProjectIdeaCard
                    key={projectIdea.id}
                    projectIdea={projectIdea}
                    currentUserClub={currentUser.club}
                    onJoinTeam={() => handleJoinTeam(projectIdea)}
                    onViewDetails={() => toast({
                      title: "Project Details",
                      description: `Viewing details for "${projectIdea.title}"`,
                    })}
                  />
                ))}
              </div>
            </div>
          </div>
        );

      case 'post':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Post New Project Idea</h1>
                <p className="text-muted-foreground mt-2">
                  Share your innovative project idea and find the perfect collaborators
                </p>
              </div>
              <Button variant="outline" onClick={() => setActiveTab('browse')}>
                Back to Browse
              </Button>
            </div>
            
            <ProjectIdeaForm onSubmit={handlePostProject} />
          </div>
        );

      case 'team-matching':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Team Formation</h1>
                <p className="text-muted-foreground mt-2">
                  AI-powered team matching for optimal collaboration
                </p>
              </div>
              <Button variant="outline" onClick={() => setActiveTab('browse')}>
                Back to Projects
              </Button>
            </div>
            
            {selectedProject && (
              <TeamMatchingInterface
                projectIdea={selectedProject}
                availableStudents={mockStudents.filter(s => s.id !== currentUser.id)}
                onFormTeam={handleFormTeam}
              />
            )}
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
        {getTabContent()}
      </main>
    </div>
  );
};

export default StudentProjects;