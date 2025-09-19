import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Student } from "@/types/users";
import { Linkedin, Github, ExternalLink, Star, Users, Award } from "lucide-react";

interface StudentProfileCardProps {
  student: Student;
  matchScore?: number;
  suggestedRole?: string;
  onInvite?: () => void;
  onViewProfile?: () => void;
}

export const StudentProfileCard = ({ 
  student, 
  matchScore, 
  suggestedRole, 
  onInvite, 
  onViewProfile 
}: StudentProfileCardProps) => {
  const getClubColor = (club: Student['club']) => {
    return club === 'computing-club' ? 'professional' : 'warning';
  };

  const getClubLabel = (club: Student['club']) => {
    return club === 'computing-club' ? 'Computing Club' : 'E-Cell';
  };

  return (
    <Card variant="professional" className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              {student.avatarUrl ? (
                <img
                  src={student.avatarUrl}
                  alt={student.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              {matchScore && (
                <Badge 
                  variant="success" 
                  className="absolute -top-1 -right-1 h-6 w-6 p-0 text-xs flex items-center justify-center"
                >
                  {matchScore}%
                </Badge>
              )}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{student.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Badge variant={getClubColor(student.club)}>
                  {getClubLabel(student.club)}
                </Badge>
                <span>Year {student.currentYear}</span>
              </CardDescription>
            </div>
          </div>
          
          {suggestedRole && (
            <Badge variant="expertise" className="text-xs">
              {suggestedRole}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium mb-2">Skills & Expertise</p>
            <div className="flex flex-wrap gap-1">
              {student.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="expertise" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {student.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{student.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-2">Interests</p>
            <div className="flex flex-wrap gap-1">
              {student.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} variant="location" className="text-xs">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">About</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {student.context}
          </p>
        </div>

        {student.projectHighlights && student.projectHighlights.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium flex items-center gap-1">
              <Award className="h-4 w-4" />
              Project Highlights
            </p>
            <div className="space-y-2">
              {student.projectHighlights.slice(0, 2).map((project) => (
                <div key={project.id} className="p-2 rounded bg-muted/50">
                  <p className="text-sm font-medium">{project.title}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {project.status}
                    </Badge>
                    {project.achievements && project.achievements.length > 0 && (
                      <Badge variant="success" className="text-xs">
                        {project.achievements[0]}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button 
            variant="professional" 
            size="sm" 
            className="flex-1"
            onClick={onInvite}
          >
            <Users className="h-4 w-4 mr-1" />
            Invite to Team
          </Button>
          {student.linkedinUrl && (
            <Button variant="outline" size="sm">
              <Linkedin className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};