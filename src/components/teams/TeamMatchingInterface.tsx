import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProjectIdea, Student, TeamMatch } from "@/types/users";
import { StudentProfileCard } from "@/components/students/StudentProfileCard";
import { BrainCircuit, Sparkles, Users, Search, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TeamMatchingInterfaceProps {
  projectIdea: ProjectIdea;
  availableStudents: Student[];
  onFormTeam: (matches: TeamMatch[]) => void;
}

export const TeamMatchingInterface = ({ 
  projectIdea, 
  availableStudents, 
  onFormTeam 
}: TeamMatchingInterfaceProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClub, setFilterClub] = useState<'all' | 'computing-club' | 'e-cell'>('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiMatches, setAiMatches] = useState<TeamMatch[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const { toast } = useToast();

  const generateAIMatches = async () => {
    setIsGenerating(true);
    
    // Simulate AI matching algorithm
    setTimeout(() => {
      const computingStudents = availableStudents.filter(s => s.club === 'computing-club');
      const eCellStudents = availableStudents.filter(s => s.club === 'e-cell');
      
      const matches: TeamMatch[] = [];
      
      // Select top Computing Club members (2-3)
      const topComputing = computingStudents
        .map(student => {
          const skillMatches = student.skills.filter(skill =>
            projectIdea.requiredSkills.some(req => 
              skill.toLowerCase().includes(req.toLowerCase()) || 
              req.toLowerCase().includes(skill.toLowerCase())
            )
          ).length;
          
          const interestMatches = student.interests.filter(interest =>
            projectIdea.category.includes(interest.toLowerCase()) ||
            projectIdea.title.toLowerCase().includes(interest.toLowerCase())
          ).length;
          
          const yearBonus = student.currentYear >= 2 ? 10 : 0;
          const projectBonus = student.projectHighlights.length * 5;
          
          const matchScore = Math.min(60 + (skillMatches * 15) + (interestMatches * 10) + yearBonus + projectBonus, 100);
          
          const reasons = [
            `${skillMatches} matching skills`,
            `${interestMatches} relevant interests`,
            `Year ${student.currentYear} student`,
            `${student.projectHighlights.length} project highlights`
          ].filter(reason => !reason.includes('0'));
          
          return {
            student,
            matchScore,
            reasons,
            suggestedRole: skillMatches > 2 ? 'Technical Lead' : 'Developer'
          };
        })
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, projectIdea.preferredClubRatio.computingClub);
      
      // Select top E-Cell members (1-2)
      const topECell = eCellStudents
        .map(student => {
          const skillMatches = student.skills.filter(skill =>
            ['business', 'management', 'strategy', 'marketing', 'finance'].some(bizSkill =>
              skill.toLowerCase().includes(bizSkill)
            )
          ).length;
          
          const entrepreneurshipBonus = student.interests.includes('Entrepreneurship') ? 15 : 0;
          const yearBonus = student.currentYear >= 2 ? 10 : 0;
          
          const matchScore = Math.min(55 + (skillMatches * 20) + entrepreneurshipBonus + yearBonus, 100);
          
          const reasons = [
            `${skillMatches} business skills`,
            'E-Cell member',
            `Year ${student.currentYear} student`,
            'Strong management background'
          ];
          
          return {
            student,
            matchScore,
            reasons,
            suggestedRole: skillMatches > 1 ? 'Product Manager' : 'Business Analyst'
          };
        })
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, projectIdea.preferredClubRatio.eCell);
      
      matches.push(...topComputing, ...topECell);
      setAiMatches(matches);
      setIsGenerating(false);
      
      toast({
        title: "AI matching completed!",
        description: `Found ${matches.length} optimal team members for your project.`,
      });
    }, 2000);
  };

  const filteredStudents = availableStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesClub = filterClub === 'all' || student.club === filterClub;
    return matchesSearch && matchesClub;
  });

  const toggleStudentSelection = (student: Student) => {
    setSelectedStudents(prev => {
      const isSelected = prev.find(s => s.id === student.id);
      if (isSelected) {
        return prev.filter(s => s.id !== student.id);
      } else if (prev.length < projectIdea.maxTeamSize - 1) { // -1 for project poster
        return [...prev, student];
      }
      return prev;
    });
  };

  return (
    <div className="space-y-6">
      <Card variant="highlight">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <BrainCircuit className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                AI Team Formation
                <Sparkles className="h-5 w-5 text-primary" />
              </CardTitle>
              <CardDescription>
                Find the perfect team members for "{projectIdea.title}"
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm font-medium">Required Team Composition</p>
              <div className="flex gap-2">
                <Badge variant="professional">
                  {projectIdea.preferredClubRatio.computingClub} Computing Club
                </Badge>
                <Badge variant="warning">
                  {projectIdea.preferredClubRatio.eCell} E-Cell
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Required Skills</p>
              <div className="flex flex-wrap gap-1">
                {projectIdea.requiredSkills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="expertise" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {projectIdea.requiredSkills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{projectIdea.requiredSkills.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Available Students</p>
              <p className="text-2xl font-bold text-primary">{availableStudents.length}</p>
            </div>
          </div>

          <Button 
            onClick={generateAIMatches}
            disabled={isGenerating}
            className="w-full"
            variant="professional"
            size="lg"
          >
            {isGenerating ? (
              <>
                <BrainCircuit className="h-5 w-5 animate-spin mr-2" />
                Analyzing Student Profiles...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate AI Team Matches
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {aiMatches.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI-Recommended Team ({aiMatches.length} members)
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {aiMatches.map((match) => (
              <StudentProfileCard
                key={match.student.id}
                student={match.student}
                matchScore={match.matchScore}
                suggestedRole={match.suggestedRole}
                onInvite={() => toast({
                  title: "Invitation sent!",
                  description: `${match.student.name} has been invited to join the team.`,
                })}
              />
            ))}
          </div>
          <Button 
            variant="success" 
            size="lg" 
            className="w-full"
            onClick={() => onFormTeam(aiMatches)}
          >
            <Users className="h-5 w-5 mr-2" />
            Form Team with AI Recommendations
          </Button>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Browse All Students</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilterClub(filterClub === 'all' ? 'computing-club' : filterClub === 'computing-club' ? 'e-cell' : 'all')}
            >
              <Filter className="h-4 w-4 mr-2" />
              {filterClub === 'all' ? 'All Clubs' : filterClub === 'computing-club' ? 'Computing Club' : 'E-Cell'}
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <StudentProfileCard
              key={student.id}
              student={student}
              onInvite={() => toggleStudentSelection(student)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};