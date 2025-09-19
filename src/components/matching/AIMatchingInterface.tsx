import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Sparkles, Users, Calendar } from "lucide-react";
import { Event } from "@/types/alumni";

interface AIMatchingInterfaceProps {
  onGenerateMatches: (event: Event) => void;
}

export const AIMatchingInterface = ({ onGenerateMatches }: AIMatchingInterfaceProps) => {
  const [eventData, setEventData] = useState<Partial<Event>>({
    type: 'i-talk',
    title: '',
    description: '',
    requiredExpertise: [],
    duration: '',
    audience: '',
  });
  
  const [expertiseInput, setExpertiseInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const addExpertise = () => {
    if (expertiseInput.trim() && !eventData.requiredExpertise?.includes(expertiseInput.trim())) {
      setEventData(prev => ({
        ...prev,
        requiredExpertise: [...(prev.requiredExpertise || []), expertiseInput.trim()]
      }));
      setExpertiseInput('');
    }
  };

  const removeExpertise = (expertise: string) => {
    setEventData(prev => ({
      ...prev,
      requiredExpertise: prev.requiredExpertise?.filter(e => e !== expertise)
    }));
  };

  const handleGenerate = async () => {
    if (!eventData.title || !eventData.description || !eventData.requiredExpertise?.length) {
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const event: Event = {
        id: Date.now().toString(),
        type: eventData.type as Event['type'],
        title: eventData.title!,
        description: eventData.description!,
        requiredExpertise: eventData.requiredExpertise!,
        duration: eventData.duration!,
        audience: eventData.audience!,
      };
      
      onGenerateMatches(event);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <Card variant="highlight" className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-primary">
            <BrainCircuit className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              AI Matching Engine
              <Sparkles className="h-5 w-5 text-primary" />
            </CardTitle>
            <CardDescription>
              Describe your event and let AI find the perfect alumni matches
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="event-type">Event Type</Label>
            <Select 
              value={eventData.type} 
              onValueChange={(value) => setEventData(prev => ({ ...prev, type: value as Event['type'] }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="i-talk">I-Talk</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="mentorship">Mentorship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              placeholder="e.g., AI in Modern Software Development"
              value={eventData.title || ''}
              onChange={(e) => setEventData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this event is about, the topics to be covered, and what makes it valuable..."
              value={eventData.description || ''}
              onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 45 minutes"
                value={eventData.duration || ''}
                onChange={(e) => setEventData(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                placeholder="e.g., Computer Science students"
                value={eventData.audience || ''}
                onChange={(e) => setEventData(prev => ({ ...prev, audience: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Required Expertise</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add expertise area..."
                value={expertiseInput}
                onChange={(e) => setExpertiseInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addExpertise()}
              />
              <Button type="button" variant="outline" onClick={addExpertise}>
                Add
              </Button>
            </div>
            {eventData.requiredExpertise && eventData.requiredExpertise.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {eventData.requiredExpertise.map((expertise) => (
                  <Badge
                    key={expertise}
                    variant="expertise"
                    className="cursor-pointer"
                    onClick={() => removeExpertise(expertise)}
                  >
                    {expertise} ×
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || !eventData.title || !eventData.description || !eventData.requiredExpertise?.length}
          className="w-full"
          variant="professional"
          size="lg"
        >
          {isGenerating ? (
            <>
              <BrainCircuit className="h-5 w-5 animate-spin mr-2" />
              Analyzing Alumni Database...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Generate AI Matches
            </>
          )}
        </Button>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">2,847</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Users className="h-3 w-3" />
              Alumni in Database
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">94%</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3" />
              Match Accuracy
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">2.3s</div>
            <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              <Calendar className="h-3 w-3" />
              Avg Processing Time
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};