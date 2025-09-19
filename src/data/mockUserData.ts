import { Student, Mentor, Admin, ProjectIdea, Team, ProjectHighlight, PortfolioItem } from '@/types/users';

export const mockStudents: Student[] = [
  {
    id: 's1',
    name: 'Alex Chen',
    email: 'alex.chen@university.edu',
    role: 'student',
    club: 'computing-club',
    skills: ['React', 'Python', 'Machine Learning', 'UI/UX Design'],
    interests: ['AI', 'Web Development', 'Entrepreneurship'],
    currentYear: 3,
    context: 'Passionate computer science student with a focus on AI and web technologies. Experienced in full-stack development and machine learning projects.',
    linkedinUrl: 'https://linkedin.com/in/alexchen',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    projectHighlights: [
      {
        id: 'p1',
        title: 'Smart Campus Navigation',
        description: 'AI-powered indoor navigation system for university campus using computer vision',
        technologies: ['Python', 'OpenCV', 'TensorFlow', 'React Native'],
        status: 'completed',
        repositoryUrl: 'https://github.com/alexchen/smart-nav',
        achievements: ['Best Project Award', '95% accuracy rate']
      }
    ]
  },
  {
    id: 's2',
    name: 'Priya Sharma',
    email: 'priya.sharma@university.edu',
    role: 'student',
    club: 'e-cell',
    skills: ['Business Strategy', 'Market Research', 'Financial Modeling', 'Product Management'],
    interests: ['Startups', 'Fintech', 'Social Impact'],
    currentYear: 2,
    context: 'Entrepreneur-minded business student with experience in startup competitions and market analysis. Strong background in business development and strategy.',
    linkedinUrl: 'https://linkedin.com/in/priyasharma',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b194?w=150&h=150&fit=crop&crop=face',
    projectHighlights: [
      {
        id: 'p2',
        title: 'EcoMarket Startup',
        description: 'Sustainable marketplace connecting local farmers with urban consumers',
        technologies: ['Business Model Canvas', 'Market Research', 'Financial Planning'],
        status: 'in-progress',
        achievements: ['University Pitch Competition Winner', '$5K Seed Funding']
      }
    ]
  },
  {
    id: 's3',
    name: 'Rahul Verma',
    email: 'rahul.verma@university.edu',
    role: 'student',
    club: 'computing-club',
    skills: ['Blockchain', 'Smart Contracts', 'Node.js', 'Cybersecurity'],
    interests: ['Cryptocurrency', 'DeFi', 'Security'],
    currentYear: 4,
    context: 'Senior computer science student specializing in blockchain technology and cybersecurity. Active contributor to open-source crypto projects.',
    linkedinUrl: 'https://linkedin.com/in/rahulverma',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    projectHighlights: [
      {
        id: 'p3',
        title: 'Decentralized Learning Platform',
        description: 'Blockchain-based educational platform with tokenized rewards',
        technologies: ['Solidity', 'Web3.js', 'React', 'IPFS'],
        status: 'completed',
        repositoryUrl: 'https://github.com/rahulverma/defi-learn'
      }
    ]
  }
];

export const mockMentors: Mentor[] = [
  {
    id: 'm1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    role: 'mentor',
    type: 'faculty',
    expertise: ['Machine Learning', 'Data Science', 'Research Methodology'],
    currentProjects: 2,
    maxProjects: 4,
    availability: 'high',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    portfolio: [
      {
        id: 'port1',
        title: 'AI in Healthcare Research',
        description: 'Leading research on AI applications in medical diagnosis',
        category: 'research',
        date: new Date('2023-01-15'),
        url: 'https://research.university.edu/ai-healthcare'
      }
    ]
  },
  {
    id: 'm2',
    name: 'Michael Zhang',
    email: 'michael.zhang@techcorp.com',
    role: 'mentor',
    type: 'alumni',
    expertise: ['Entrepreneurship', 'Product Management', 'Venture Capital'],
    currentProjects: 1,
    maxProjects: 3,
    availability: 'medium',
    company: 'TechCorp Ventures',
    position: 'Senior Product Manager',
    location: 'San Francisco, CA',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    portfolio: [
      {
        id: 'port2',
        title: 'Successful Product Launches',
        description: 'Led 5 successful product launches generating $50M+ revenue',
        category: 'achievement',
        date: new Date('2023-06-01')
      }
    ]
  }
];

export const mockProjectIdeas: ProjectIdea[] = [
  {
    id: 'proj1',
    title: 'Sustainable Food Delivery Platform',
    description: 'An eco-friendly food delivery platform that promotes sustainable packaging and connects users with local organic restaurants. The platform will include carbon footprint tracking and rewards for eco-friendly choices.',
    category: 'startup-idea',
    requiredSkills: ['React Native', 'Business Strategy', 'UI/UX Design', 'Market Research'],
    preferredClubRatio: {
      computingClub: 2,
      eCell: 1
    },
    maxTeamSize: 3,
    postedBy: 's1',
    postedAt: new Date('2024-01-10'),
    status: 'open',
    difficulty: 'intermediate',
    estimatedDuration: '4-6 months',
    expectedOutcome: 'MVP with basic functionality and initial user base'
  },
  {
    id: 'proj2',
    title: 'AI-Powered Mental Health Chatbot',
    description: 'Develop an AI chatbot that provides mental health support and resources for university students. The bot will use NLP to detect emotional states and provide appropriate responses.',
    category: 'ai-ml',
    requiredSkills: ['Python', 'NLP', 'Psychology', 'Product Management'],
    preferredClubRatio: {
      computingClub: 2,
      eCell: 1
    },
    maxTeamSize: 3,
    postedBy: 's2',
    postedAt: new Date('2024-01-08'),
    status: 'team-forming',
    difficulty: 'advanced',
    estimatedDuration: '6-8 months',
    expectedOutcome: 'Functional chatbot with university pilot program'
  }
];

export const mockTeams: Team[] = [
  {
    id: 't1',
    projectIdea: mockProjectIdeas[1],
    members: [
      {
        student: mockStudents[0],
        role: 'Technical Lead',
        joinedAt: new Date('2024-01-12')
      },
      {
        student: mockStudents[1],
        role: 'Product Manager',
        joinedAt: new Date('2024-01-12')
      }
    ],
    mentor: mockMentors[0],
    status: 'forming',
    createdAt: new Date('2024-01-12'),
    progress: 15,
    milestones: [
      {
        id: 'ms1',
        title: 'Requirements Gathering',
        description: 'Complete user research and define system requirements',
        dueDate: new Date('2024-02-01'),
        status: 'in-progress'
      }
    ]
  }
];