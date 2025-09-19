export interface Alumni {
  id: string;
  name: string;
  email: string;
  phone?: string;
  graduationYear: number;
  degree: string;
  currentCompany: string;
  currentPosition: string;
  location: string;
  expertise: string[];
  availability: 'high' | 'medium' | 'low';
  pastEngagement: number; // Number of past engagements
  linkedinUrl?: string;
  bio: string;
  avatarUrl?: string;
}

export interface Event {
  id: string;
  type: 'i-talk' | 'workshop' | 'mentorship';
  title: string;
  description: string;
  requiredExpertise: string[];
  preferredLocation?: string;
  duration: string;
  audience: string;
  scheduledDate?: Date;
}

export interface AlumniMatch {
  alumni: Alumni;
  matchScore: number;
  reasons: string[];
  suggestedOutreach: string;
}

export interface Shortlist {
  id: string;
  event: Event;
  matches: AlumniMatch[];
  generatedAt: Date;
  status: 'draft' | 'reviewed' | 'approved';
}