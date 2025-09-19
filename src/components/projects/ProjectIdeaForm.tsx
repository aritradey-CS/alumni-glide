import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Lightbulb, Users, Target } from "lucide-react";
import { ProjectIdea } from "@/types/users";

interface ProjectIdeaFormProps {
  onSubmit: (projectIdea: Partial<ProjectIdea>) => void;
}

export const ProjectIdeaForm = ({ onSubmit }: ProjectIdeaFormProps) => {
  const [formData, setFormData] = useState<Partial<ProjectIdea>>({
    title: '',
    description: '',
    category: 'web-development',
    requiredSkills: [],
    preferredClubRatio: { computingClub: 2, eCell: 1 },
    maxTeamSize: 3,
    difficulty: 'intermediate',
    estimatedDuration: '',
    expectedOutcome: '',
  });

  const [skillInput, setSkillInput] = useState('');

  const categories = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-app', label: 'Mobile App' },
    { value: 'ai-ml', label: 'AI/ML' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'iot', label: 'IoT' },
    { value: 'startup-idea', label: 'Startup Idea' },
    { value: 'research', label: 'Research' },
  ];

  const addSkill = () => {
    if (skillInput.trim() && !formData.requiredSkills?.includes(skillInput.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...(prev.requiredSkills || []), skillInput.trim()]
      }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills?.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      postedAt: new Date(),
      status: 'open',
    });
  };

  return (
    <Card variant="highlight">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <Lightbulb className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle>Post New Project Idea</CardTitle>
            <CardDescription>
              Share your project vision and find the perfect team
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="e.g., AI-Powered Learning Assistant"
                value={formData.title || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as ProjectIdea['category'] }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project idea, its goals, and what you hope to achieve..."
                value={formData.description || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value as ProjectIdea['difficulty'] }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Estimated Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 3-4 months"
                  value={formData.estimatedDuration || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, estimatedDuration: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Required Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a required skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {formData.requiredSkills && formData.requiredSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.requiredSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="expertise"
                      className="cursor-pointer"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Team Composition (AI will match based on club ratios)</Label>
              <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">2-3 members</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Users className="h-3 w-3" />
                    Computing Club (Technical)
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-primary">1-2 members</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Target className="h-3 w-3" />
                    E-Cell (Management)
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="outcome">Expected Outcome</Label>
              <Textarea
                id="outcome"
                placeholder="What do you expect to achieve by the end of this project?"
                value={formData.expectedOutcome || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, expectedOutcome: e.target.value }))}
                rows={2}
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            variant="professional"
            size="lg"
            disabled={!formData.title || !formData.description || !formData.requiredSkills?.length}
          >
            <Lightbulb className="h-5 w-5 mr-2" />
            Post Project Idea
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};