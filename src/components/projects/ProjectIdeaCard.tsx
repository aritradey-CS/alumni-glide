import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectIdea } from "@/types/users";
import { Calendar, Clock, Users, Target, Star, GitBranch } from "lucide-react";

interface ProjectIdeaCardProps {
  projectIdea: ProjectIdea;
  onJoinTeam?: () => void;
  onViewDetails?: () => void;
  currentUserClub?: 'computing-club' | 'e-cell';
}

export const ProjectIdeaCard = ({ 
  projectIdea, 
  onJoinTeam, 
  onViewDetails,
  currentUserClub 
}: ProjectIdeaCardProps) => {
  const getCategoryColor = (category: ProjectIdea['category']) => {
    switch (category) {
      case 'ai-ml': return 'professional';
      case 'web-development': return 'success';
      case 'mobile-app': return 'warning';
      case 'blockchain': return 'expertise';
      case 'startup-idea': return 'destructive';
      default: return 'secondary';
    }
  };

  const getDifficultyColor = (difficulty: ProjectIdea['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: ProjectIdea['status']) => {
    switch (status) {
      case 'open': return 'success';
      case 'team-forming': return 'warning';
      case 'in-progress': return 'professional';
      case 'completed': return 'secondary';
      default: return 'outline';
    }
  };

  const isEligible = currentUserClub === 'computing-club' || currentUserClub === 'e-cell';

  return (
    <Card variant="elevated" className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant={getCategoryColor(projectIdea.category)}>
                {projectIdea.category.replace('-', ' ').toUpperCase()}
              </Badge>
              <Badge variant={getStatusColor(projectIdea.status)}>
                {projectIdea.status.replace('-', ' ').toUpperCase()}
              </Badge>
            </div>
            <CardTitle className="text-xl mb-2">{projectIdea.title}</CardTitle>
            <CardDescription className="line-clamp-3">
              {projectIdea.description}
            </CardDescription>
          </div>
          <Badge variant={getDifficultyColor(projectIdea.difficulty)}>
            {projectIdea.difficulty}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {projectIdea.estimatedDuration}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Posted {projectIdea.postedAt.toLocaleDateString()}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            Max {projectIdea.maxTeamSize} members
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-2">Required Skills</p>
            <div className="flex flex-wrap gap-1">
              {projectIdea.requiredSkills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="expertise" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {projectIdea.requiredSkills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{projectIdea.requiredSkills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Team Composition</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1 p-2 rounded bg-primary/10">
                <GitBranch className="h-3 w-3" />
                <span>{projectIdea.preferredClubRatio.computingClub} Computing Club</span>
              </div>
              <div className="flex items-center gap-1 p-2 rounded bg-accent/10">
                <Target className="h-3 w-3" />
                <span>{projectIdea.preferredClubRatio.eCell} E-Cell</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-1">Expected Outcome</p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {projectIdea.expectedOutcome}
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button 
            variant="professional" 
            size="sm" 
            className="flex-1"
            onClick={onJoinTeam}
            disabled={!isEligible || projectIdea.status !== 'open'}
          >
            <Star className="h-4 w-4 mr-1" />
            {projectIdea.status === 'open' ? 'Join Team' : 'View Team'}
          </Button>
          <Button variant="outline" size="sm" onClick={onViewDetails}>
            Details
          </Button>
        </div>

        {!isEligible && (
          <p className="text-xs text-muted-foreground text-center">
            Only Computing Club and E-Cell members can join projects
          </p>
        )}
      </CardContent>
    </Card>
  );
};