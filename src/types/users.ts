export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'mentor' | 'admin';
  avatarUrl?: string;
  linkedinUrl?: string;
  phone?: string;
  graduationYear?: number;
  currentYear?: number; // For students
}

export interface Student extends User {
  role: 'student';
  club: 'computing-club' | 'e-cell';
  skills: string[];
  interests: string[];
  projectHighlights: ProjectHighlight[];
  context: string; // Bio/background
  currentYear: number;
  gpa?: number;
}

export interface Mentor extends User {
  role: 'mentor';
  type: 'faculty' | 'alumni';
  expertise: string[];
  currentProjects: number;
  maxProjects: number;
  portfolio: PortfolioItem[];
  availability: 'high' | 'medium' | 'low';
  location?: string;
  company?: string;
  position?: string;
}

export interface Admin extends User {
  role: 'admin';
  department: string;
  permissions: string[];
}

export interface ProjectHighlight {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
  imageUrl?: string;
  repositoryUrl?: string;
  demoUrl?: string;
  achievements?: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: 'project' | 'research' | 'publication' | 'achievement';
  date: Date;
  url?: string;
  technologies?: string[];
}

export interface ProjectIdea {
  id: string;
  title: string;
  description: string;
  category: 'web-development' | 'mobile-app' | 'ai-ml' | 'blockchain' | 'iot' | 'startup-idea' | 'research';
  requiredSkills: string[];
  preferredClubRatio: {
    computingClub: number; // 2-3
    eCell: number; // 1-2
  };
  maxTeamSize: number; // Always 3
  postedBy: string; // Student ID
  postedAt: Date;
  status: 'open' | 'team-forming' | 'in-progress' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedDuration: string;
  expectedOutcome: string;
  resources?: string[];
}

export interface TeamMember {
  student: Student;
  role: string;
  joinedAt: Date;
  contribution?: string;
}

export interface Team {
  id: string;
  projectIdea: ProjectIdea;
  members: TeamMember[];
  mentor: Mentor;
  status: 'forming' | 'active' | 'completed' | 'paused';
  createdAt: Date;
  progress: number; // 0-100
  milestones: Milestone[];
  communicationChannel?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string[];
}

export interface TeamMatch {
  student: Student;
  matchScore: number;
  reasons: string[];
  suggestedRole: string;
}

export interface MentorAssignment {
  mentor: Mentor;
  matchScore: number;
  reasons: string[];
  availability: boolean;
}