import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { AlumniCard } from "@/components/alumni/AlumniCard";
import { AIMatchingInterface } from "@/components/matching/AIMatchingInterface";
import { ShortlistView } from "@/components/shortlist/ShortlistView";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockAlumni, mockShortlists } from "@/data/mockData";
import { Event, Shortlist, AlumniMatch } from "@/types/alumni";
import { Users, Sparkles, Target } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-banner.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'matching' | 'shortlist'>('overview');
  const [currentShortlist, setCurrentShortlist] = useState<Shortlist | null>(mockShortlists[0]);
  const { toast } = useToast();

  const handleGenerateMatches = (event: Event) => {
    // Simulate AI matching algorithm
    const matches: AlumniMatch[] = mockAlumni
      .filter(alumni => 
        alumni.expertise.some(skill => 
          event.requiredExpertise.some(req => 
            skill.toLowerCase().includes(req.toLowerCase()) || 
            req.toLowerCase().includes(skill.toLowerCase())
          )
        )
      )
      .slice(0, 3)
      .map(alumni => {
        const matchingSkills = alumni.expertise.filter(skill =>
          event.requiredExpertise.some(req => 
            skill.toLowerCase().includes(req.toLowerCase()) || 
            req.toLowerCase().includes(skill.toLowerCase())
          )
        );
        
        const baseScore = 60 + (matchingSkills.length * 10);
        const availabilityBonus = alumni.availability === 'high' ? 15 : alumni.availability === 'medium' ? 8 : 0;
        const engagementBonus = Math.min(alumni.pastEngagement * 2, 10);
        
        const matchScore = Math.min(baseScore + availabilityBonus + engagementBonus, 100);
        
        const reasons = [
          `${matchingSkills.length} matching expertise areas`,
          `${alumni.availability} availability`,
          `${alumni.pastEngagement} past engagements`,
        ];
        
        if (alumni.location.includes('CA') && event.preferredLocation?.includes('CA')) {
          reasons.push('Located in preferred area');
        }

        const suggestedOutreach = `Hi ${alumni.name.split(' ')[0]},

We have an exciting opportunity for a ${event.type} on "${event.title}" that aligns perfectly with your expertise in ${matchingSkills.slice(0, 2).join(' and ')}.

${event.description}

This ${event.duration} session would be perfect for our ${event.audience}. Given your background at ${alumni.currentCompany} and your experience with ${matchingSkills[0]}, you'd bring invaluable insights to our students.

Would you be interested in participating? We'd love to have you share your expertise with the next generation.

Best regards,
Alumni Relations Team`;

        return {
          alumni,
          matchScore,
          reasons,
          suggestedOutreach,
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore);

    const newShortlist: Shortlist = {
      id: Date.now().toString(),
      event,
      matches,
      generatedAt: new Date(),
      status: 'draft',
    };

    setCurrentShortlist(newShortlist);
    setActiveTab('shortlist');
    
    toast({
      title: "AI matching completed!",
      description: `Found ${matches.length} high-quality matches for your event.`,
    });
  };

  const handleApproveShortlist = () => {
    if (currentShortlist) {
      setCurrentShortlist({
        ...currentShortlist,
        status: 'approved'
      });
      toast({
        title: "Shortlist approved!",
        description: "The alumni have been notified and outreach messages are ready to send.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-xl">
              <div 
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${heroImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
                <div className="relative h-full flex items-center">
                  <div className="max-w-2xl text-primary-foreground">
                    <h1 className="text-4xl font-bold mb-4">
                      AI-Powered Alumni Matching
                    </h1>
                    <p className="text-lg opacity-90 mb-6">
                      Automatically identify the most relevant alumni for I-Talks, workshops, and mentorships. 
                      Get ready-to-use shortlists with contact details and personalized outreach messages.
                    </p>
                    <Button 
                      variant="secondary" 
                      size="lg"
                      onClick={() => setActiveTab('matching')}
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Start AI Matching
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <StatsOverview />

            {/* Quick Actions */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card 
                variant="professional" 
                className="cursor-pointer transition-smooth hover:shadow-glow"
                onClick={() => setActiveTab('matching')}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-primary">
                      <Sparkles className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle>AI Matching</CardTitle>
                      <CardDescription>Generate intelligent alumni matches</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card 
                variant="elevated" 
                className="cursor-pointer transition-smooth hover:shadow-glow"
                onClick={() => setActiveTab('shortlist')}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-secondary">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>View Shortlists</CardTitle>
                      <CardDescription>Review generated matches</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              <Card variant="elevated" className="cursor-pointer transition-smooth hover:shadow-glow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-secondary">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Alumni Database</CardTitle>
                      <CardDescription>Browse all alumni profiles</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Recent Alumni */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">Recently Active Alumni</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockAlumni.slice(0, 3).map((alumni) => (
                  <AlumniCard 
                    key={alumni.id} 
                    alumni={alumni}
                    onContact={() => toast({
                      title: "Contact initiated",
                      description: `Reached out to ${alumni.name}`,
                    })}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matching' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">AI Matching Engine</h1>
                <p className="text-muted-foreground mt-2">
                  Describe your event and let our AI find the perfect alumni matches
                </p>
              </div>
              <Button variant="outline" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </Button>
            </div>
            
            <AIMatchingInterface onGenerateMatches={handleGenerateMatches} />
          </div>
        )}

        {activeTab === 'shortlist' && currentShortlist && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Generated Shortlist</h1>
                <p className="text-muted-foreground mt-2">
                  Review AI-generated matches and outreach messages
                </p>
              </div>
              <Button variant="outline" onClick={() => setActiveTab('overview')}>
                Back to Overview
              </Button>
            </div>
            
            <ShortlistView 
              shortlist={currentShortlist} 
              onApprove={handleApproveShortlist}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
