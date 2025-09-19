import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlumniCard } from "@/components/alumni/AlumniCard";
import { Shortlist } from "@/types/alumni";
import { FileText, Send, CheckCircle, Clock, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShortlistViewProps {
  shortlist: Shortlist;
  onApprove?: () => void;
}

export const ShortlistView = ({ shortlist, onApprove }: ShortlistViewProps) => {
  const { toast } = useToast();

  const copyOutreachMessage = (message: string) => {
    navigator.clipboard.writeText(message);
    toast({
      title: "Copied to clipboard",
      description: "Outreach message has been copied to your clipboard.",
    });
  };

  const getStatusColor = (status: Shortlist['status']) => {
    switch (status) {
      case 'draft':
        return 'warning';
      case 'reviewed':
        return 'secondary';
      case 'approved':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <Card variant="highlight">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="professional">
                  {shortlist.event.type.toUpperCase()}
                </Badge>
                <Badge variant={getStatusColor(shortlist.status)}>
                  {shortlist.status.toUpperCase()}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{shortlist.event.title}</CardTitle>
              <CardDescription className="mt-2 max-w-2xl">
                {shortlist.event.description}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export
              </Button>
              {shortlist.status === 'draft' && (
                <Button variant="professional" size="sm" onClick={onApprove}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Shortlist
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <p className="text-sm font-medium">Duration</p>
              <p className="text-sm text-muted-foreground">{shortlist.event.duration}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Audience</p>
              <p className="text-sm text-muted-foreground">{shortlist.event.audience}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Generated</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {shortlist.generatedAt.toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Required Expertise</p>
            <div className="flex flex-wrap gap-2">
              {shortlist.event.requiredExpertise.map((expertise) => (
                <Badge key={expertise} variant="expertise">
                  {expertise}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-lg font-semibold mb-4">
          AI-Generated Matches ({shortlist.matches.length})
        </h3>
        <div className="grid gap-6 lg:grid-cols-2">
          {shortlist.matches.map((match, index) => (
            <div key={match.alumni.id} className="space-y-4">
              <AlumniCard 
                alumni={match.alumni} 
                matchScore={match.matchScore}
                onContact={() => toast({
                  title: "Contact initiated",
                  description: `Reached out to ${match.alumni.name}`,
                })}
              />
              
              <Card variant="elevated">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    Suggested Outreach Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-muted rounded-lg p-3 text-sm whitespace-pre-line">
                    {match.suggestedOutreach}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium mb-1">Match Reasons</p>
                      <div className="flex flex-wrap gap-1">
                        {match.reasons.map((reason, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyOutreachMessage(match.suggestedOutreach)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};