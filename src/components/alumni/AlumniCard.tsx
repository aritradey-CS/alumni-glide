import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alumni } from "@/types/alumni";
import { MapPin, Building, Calendar, MessageCircle, Linkedin } from "lucide-react";

interface AlumniCardProps {
  alumni: Alumni;
  matchScore?: number;
  onContact?: () => void;
}

export const AlumniCard = ({ alumni, matchScore, onContact }: AlumniCardProps) => {
  const getAvailabilityColor = (availability: Alumni['availability']) => {
    switch (availability) {
      case 'high':
        return 'success';
      case 'medium':
        return 'warning';
      case 'low':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card variant="professional" className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              {alumni.avatarUrl ? (
                <img
                  src={alumni.avatarUrl}
                  alt={alumni.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold">
                  {alumni.name.split(' ').map(n => n[0]).join('')}
                </div>
              )}
              {matchScore && (
                <Badge 
                  variant="professional" 
                  className="absolute -top-1 -right-1 h-6 w-6 p-0 text-xs flex items-center justify-center"
                >
                  {matchScore}%
                </Badge>
              )}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">{alumni.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <Building className="h-3 w-3" />
                {alumni.currentPosition} at {alumni.currentCompany}
              </CardDescription>
            </div>
          </div>
          
          <Badge variant={getAvailabilityColor(alumni.availability)}>
            {alumni.availability} availability
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {alumni.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Class of {alumni.graduationYear} • {alumni.degree}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            {alumni.pastEngagement} past engagements
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Expertise</p>
          <div className="flex flex-wrap gap-1">
            {alumni.expertise.map((skill) => (
              <Badge key={skill} variant="expertise" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {alumni.bio}
        </p>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="professional" 
            size="sm" 
            className="flex-1"
            onClick={onContact}
          >
            Contact
          </Button>
          {alumni.linkedinUrl && (
            <Button variant="outline" size="sm">
              <Linkedin className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};