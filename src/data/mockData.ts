import { Alumni, Event, AlumniMatch, Shortlist } from '@/types/alumni';

export const mockAlumni: Alumni[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah.chen@techcorp.com',
    phone: '+1-555-0123',
    graduationYear: 2018,
    degree: 'Computer Science',
    currentCompany: 'TechCorp Industries',
    currentPosition: 'Senior Software Engineer',
    location: 'San Francisco, CA',
    expertise: ['Machine Learning', 'Python', 'Data Science', 'AI'],
    availability: 'high',
    pastEngagement: 3,
    linkedinUrl: 'https://linkedin.com/in/sarahchen',
    bio: 'Passionate about AI and machine learning with 6+ years of experience building scalable ML systems.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b194?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus.j@startupventures.com',
    phone: '+1-555-0456',
    graduationYear: 2015,
    degree: 'Business Administration',
    currentCompany: 'Startup Ventures',
    currentPosition: 'Co-Founder & CEO',
    location: 'New York, NY',
    expertise: ['Entrepreneurship', 'Leadership', 'Fundraising', 'Strategy'],
    availability: 'medium',
    pastEngagement: 5,
    linkedinUrl: 'https://linkedin.com/in/marcusjohnson',
    bio: 'Serial entrepreneur with multiple successful exits. Passionate about mentoring the next generation of business leaders.',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@biotech.com',
    phone: '+1-555-0789',
    graduationYear: 2016,
    degree: 'Biotechnology',
    currentCompany: 'BioInnovate Labs',
    currentPosition: 'Research Director',
    location: 'Boston, MA',
    expertise: ['Biotechnology', 'Research', 'Drug Development', 'Lab Management'],
    availability: 'high',
    pastEngagement: 2,
    linkedinUrl: 'https://linkedin.com/in/emilyrodriguez',
    bio: 'Leading research in breakthrough drug development with a focus on rare diseases.',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david.kim@designstudio.com',
    phone: '+1-555-0321',
    graduationYear: 2019,
    degree: 'Industrial Design',
    currentCompany: 'Creative Design Studio',
    currentPosition: 'Senior UX Designer',
    location: 'Seattle, WA',
    expertise: ['UX Design', 'Product Design', 'User Research', 'Prototyping'],
    availability: 'high',
    pastEngagement: 1,
    linkedinUrl: 'https://linkedin.com/in/davidkim',
    bio: 'Award-winning designer focused on creating intuitive and accessible digital experiences.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@sustainabletech.com',
    phone: '+1-555-0654',
    graduationYear: 2017,
    degree: 'Environmental Engineering',
    currentCompany: 'Sustainable Tech Solutions',
    currentPosition: 'VP of Engineering',
    location: 'Portland, OR',
    expertise: ['Sustainability', 'Clean Energy', 'Environmental Engineering', 'Green Technology'],
    availability: 'medium',
    pastEngagement: 4,
    linkedinUrl: 'https://linkedin.com/in/lisathompson',
    bio: 'Champion of sustainable technology solutions with expertise in renewable energy systems.',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    type: 'i-talk',
    title: 'AI in Modern Software Development',
    description: 'Interactive talk about the role of artificial intelligence in transforming software development practices.',
    requiredExpertise: ['Machine Learning', 'AI', 'Software Development'],
    preferredLocation: 'San Francisco, CA',
    duration: '45 minutes',
    audience: 'Computer Science students',
    scheduledDate: new Date('2024-03-15')
  },
  {
    id: '2',
    type: 'workshop',
    title: 'Entrepreneurship Fundamentals',
    description: 'Hands-on workshop covering the basics of starting and scaling a successful business.',
    requiredExpertise: ['Entrepreneurship', 'Business Strategy', 'Leadership'],
    duration: '2 hours',
    audience: 'Business students and aspiring entrepreneurs'
  },
  {
    id: '3',
    type: 'mentorship',
    title: 'UX Design Career Guidance',
    description: 'One-on-one mentorship program for students interested in pursuing UX design careers.',
    requiredExpertise: ['UX Design', 'Product Design', 'Career Development'],
    duration: 'Ongoing (6 months)',
    audience: 'Design students'
  }
];

export const mockShortlists: Shortlist[] = [
  {
    id: '1',
    event: mockEvents[0],
    matches: [
      {
        alumni: mockAlumni[0],
        matchScore: 95,
        reasons: ['Perfect expertise match in AI/ML', 'High availability', 'Located in target area', 'Strong engagement history'],
        suggestedOutreach: `Hi Sarah,\n\nWe have an exciting opportunity for an I-Talk on "AI in Modern Software Development" scheduled for March 15th. Given your expertise in machine learning and AI, you'd be perfect for this 45-minute session with our Computer Science students.\n\nWould you be interested in sharing your insights? The talk would be at our San Francisco campus.\n\nBest regards,\nAlumni Relations Team`
      },
      {
        alumni: mockAlumni[3],
        matchScore: 75,
        reasons: ['Related tech background', 'High availability', 'Good engagement potential'],
        suggestedOutreach: `Hi David,\n\nWe're organizing an I-Talk on AI in software development and think your product design perspective could add valuable insights about AI's impact on user experience.\n\nWould you be interested in participating as a co-speaker?\n\nBest regards,\nAlumni Relations Team`
      }
    ],
    generatedAt: new Date('2024-01-15'),
    status: 'draft'
  }
];