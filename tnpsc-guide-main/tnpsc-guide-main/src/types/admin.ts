export interface FileItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  file_name: string;
  file_path: string;
  download_count: number;
  view_count?: number;
  created_at: string;
  updated_at?: string;
  file_size?: number;
  isVisible?: boolean;
  version?: string;
  uploaded_by?: string;
}

export interface AdminStats {
  totalVisitors: number;
  totalDownloads: number;
  totalUploads: number;
  totalUsers: number;
  syllabusDownloads: number;
  booksDownloads: number;
  papersDownloads: number;
  notesDownloads: number;
  tirukuralDownloads?: number;
  tamilScholarsDownloads?: number;
}

export interface ActivityItem {
  id: string;
  type: 'download' | 'upload' | 'view' | 'login';
  description: string;
  timestamp: string;
  user?: string;
}

export const CATEGORIES = [
  'Syllabus', 
  'School Books', 
  'Previous Papers', 
  'Study Notes', 
  'Tirukural', 
  'Tamil Scholars'
];

export const SUBCATEGORIES: Record<string, string[]> = {
  'Syllabus': [
    'G1-Prelims', 'G1-Mains',
    'G2-Prelims', 'G2-Mains',
    'G2A-Prelims', 'G2A-Mains',
    'G4-Prelims'
  ],
  'School Books': [
    '6th Standard', '7th Standard', '8th Standard',
    '9th Standard', '10th Standard', '11th Standard', '12th Standard'
  ],
  'Previous Papers': [
    'Group 1 - Prelims', 'Group 1 - Mains',
    'Group 2 - Prelims', 'Group 2 - Mains',
    'Group 2A - Prelims', 'Group 2A - Mains',
    'Group 4 - Prelims',
    '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'
  ],
  'Study Notes': [
    'Tamil', 'General Studies', 'Maths', 'Science',
    'History', 'Geography', 'Polity', 'Economy'
  ],
  'Tirukural': [
    'அறத்துப்பால்', 'பொருட்பால்', 'காமத்துப்பால்',
    'Complete Tirukural', 'Tirukural with Commentary'
  ],
  'Tamil Scholars': [
    'பாரதியார்', 'பாரதிதாசன்', 'உ. வே. சாமிநாதர்',
    'தெ. பொ. மீனாட்சிசுந்தரம்', 'சி. இலக்குவனார்', 'ஜி. யு. போப்',
    'தேவநேய பவானர்', 'பாவலரேறு பெருஞ்சித்திரனார்', 'வீரமாமுனிவர்',
    'கண்ணதாசன்', 'காயிதே மில்லத்', 'முடியரசன்', 'Other Scholars'
  ]
};

export const DEMO_FILES: FileItem[] = [
  // Syllabus
  { id: '1', title: 'Group 1 Prelims Syllabus 2024', description: 'Complete syllabus for TNPSC Group 1 Prelims', category: 'Syllabus', subcategory: 'G1-Prelims', file_name: 'g1-prelims-syllabus.pdf', file_path: '/demo/g1-prelims.pdf', download_count: 245, view_count: 520, created_at: '2024-01-15', file_size: 2500000, isVisible: true, version: '2.0' },
  { id: '2', title: 'Group 1 Mains Syllabus 2024', description: 'Complete syllabus for TNPSC Group 1 Mains', category: 'Syllabus', subcategory: 'G1-Mains', file_name: 'g1-mains-syllabus.pdf', file_path: '/demo/g1-mains.pdf', download_count: 198, view_count: 410, created_at: '2024-01-15', file_size: 3200000, isVisible: true, version: '2.0' },
  { id: '3', title: 'Group 2 Prelims Syllabus 2024', description: 'Complete syllabus for TNPSC Group 2 Prelims', category: 'Syllabus', subcategory: 'G2-Prelims', file_name: 'g2-prelims-syllabus.pdf', file_path: '/demo/g2-prelims.pdf', download_count: 312, view_count: 680, created_at: '2024-01-20', file_size: 1800000, isVisible: true, version: '1.5' },
  { id: '4', title: 'Group 4 Syllabus 2024', description: 'Complete syllabus for TNPSC Group 4', category: 'Syllabus', subcategory: 'G4-Prelims', file_name: 'g4-syllabus.pdf', file_path: '/demo/g4.pdf', download_count: 423, view_count: 890, created_at: '2024-02-15', file_size: 1200000, isVisible: true, version: '1.0' },
  
  // School Books
  { id: '5', title: '10th Standard Tamil Book', description: 'Tamil textbook for 10th standard', category: 'School Books', subcategory: '10th Standard', file_name: 'tamil-10th.pdf', file_path: '/demo/tamil-10th.pdf', download_count: 189, view_count: 340, created_at: '2024-01-20', file_size: 15000000, isVisible: true },
  { id: '6', title: '12th Standard Science Book', description: 'Science textbook for 12th standard', category: 'School Books', subcategory: '12th Standard', file_name: 'science-12th.pdf', file_path: '/demo/science-12th.pdf', download_count: 156, view_count: 280, created_at: '2024-01-25', file_size: 18000000, isVisible: true },
  
  // Previous Papers
  { id: '7', title: 'Group 2 Previous Paper 2023', description: 'Previous year question paper', category: 'Previous Papers', subcategory: 'Group 2 - Prelims', file_name: 'group2-2023.pdf', file_path: '/demo/group2-2023.pdf', download_count: 312, view_count: 560, created_at: '2024-02-01', file_size: 1800000, isVisible: true },
  { id: '8', title: 'Group 1 Previous Paper 2023', description: 'Previous year question paper for Group 1', category: 'Previous Papers', subcategory: 'Group 1 - Prelims', file_name: 'group1-2023.pdf', file_path: '/demo/group1-2023.pdf', download_count: 287, view_count: 490, created_at: '2024-02-05', file_size: 2100000, isVisible: true },
  
  // Study Notes
  { id: '9', title: 'General Studies Notes', description: 'Comprehensive GS notes', category: 'Study Notes', subcategory: 'General Studies', file_name: 'gs-notes.pdf', file_path: '/demo/gs-notes.pdf', download_count: 156, view_count: 320, created_at: '2024-02-10', file_size: 5200000, isVisible: true },
  { id: '10', title: 'Tamil Grammar Notes', description: 'Complete Tamil grammar notes', category: 'Study Notes', subcategory: 'Tamil', file_name: 'tamil-grammar.pdf', file_path: '/demo/tamil-grammar.pdf', download_count: 134, view_count: 275, created_at: '2024-02-12', file_size: 3800000, isVisible: true },
  { id: '11', title: 'History Notes - Freedom Struggle', description: 'Indian freedom struggle notes', category: 'Study Notes', subcategory: 'History', file_name: 'history-freedom.pdf', file_path: '/demo/history-freedom.pdf', download_count: 98, view_count: 210, created_at: '2024-02-18', file_size: 4200000, isVisible: false },
  
  // Tirukural
  { id: '12', title: 'திருக்குறள் - அறத்துப்பால்', description: 'Tirukural Arathuppal with meaning', category: 'Tirukural', subcategory: 'அறத்துப்பால்', file_name: 'tirukural-arathuppal.pdf', file_path: '/demo/tirukural-arathuppal.pdf', download_count: 278, view_count: 520, created_at: '2024-01-10', file_size: 4500000, isVisible: true },
  { id: '13', title: 'திருக்குறள் - பொருட்பால்', description: 'Tirukural Porutpal with meaning', category: 'Tirukural', subcategory: 'பொருட்பால்', file_name: 'tirukural-porutpal.pdf', file_path: '/demo/tirukural-porutpal.pdf', download_count: 234, view_count: 445, created_at: '2024-01-12', file_size: 5200000, isVisible: true },
  { id: '14', title: 'Complete Tirukural PDF', description: 'Full Tirukural with all 1330 kurals', category: 'Tirukural', subcategory: 'Complete Tirukural', file_name: 'tirukural-complete.pdf', file_path: '/demo/tirukural-complete.pdf', download_count: 456, view_count: 890, created_at: '2024-01-05', file_size: 12000000, isVisible: true },
  
  // Tamil Scholars
  { id: '15', title: 'பாரதியார் கவிதைகள்', description: 'Complete collection of Bharathiyar poems', category: 'Tamil Scholars', subcategory: 'பாரதியார்', file_name: 'bharathiyar-poems.pdf', file_path: '/demo/bharathiyar-poems.pdf', download_count: 345, view_count: 670, created_at: '2024-02-01', file_size: 8500000, isVisible: true },
  { id: '16', title: 'பாரதிதாசன் படைப்புகள்', description: 'Works of Bharathidasan', category: 'Tamil Scholars', subcategory: 'பாரதிதாசன்', file_name: 'bharathidasan-works.pdf', file_path: '/demo/bharathidasan-works.pdf', download_count: 234, view_count: 456, created_at: '2024-02-05', file_size: 7200000, isVisible: true },
  { id: '17', title: 'கண்ணதாசன் கவிதைகள்', description: 'Kannadasan poetry collection', category: 'Tamil Scholars', subcategory: 'கண்ணதாசன்', file_name: 'kannadasan-poems.pdf', file_path: '/demo/kannadasan-poems.pdf', download_count: 289, view_count: 534, created_at: '2024-02-08', file_size: 6800000, isVisible: true },
];

export const DEMO_STATS: AdminStats = {
  totalVisitors: 12458,
  totalDownloads: 3850,
  totalUploads: 67,
  totalUsers: 2156,
  syllabusDownloads: 1178,
  booksDownloads: 345,
  papersDownloads: 599,
  notesDownloads: 388,
  tirukuralDownloads: 968,
  tamilScholarsDownloads: 868,
};

export const DEMO_ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'download', description: 'Group 1 Syllabus downloaded', timestamp: '2 minutes ago', user: 'user123@gmail.com' },
  { id: '2', type: 'login', description: 'New user registered', timestamp: '5 minutes ago', user: 'newuser@gmail.com' },
  { id: '3', type: 'download', description: 'Tamil Notes downloaded', timestamp: '12 minutes ago', user: 'student@email.com' },
  { id: '4', type: 'view', description: 'Group 4 Syllabus viewed', timestamp: '18 minutes ago' },
  { id: '5', type: 'download', description: '10th Tamil Book downloaded', timestamp: '25 minutes ago', user: 'reader@mail.com' },
  { id: '6', type: 'upload', description: 'New file uploaded by admin', timestamp: '1 hour ago' },
  { id: '7', type: 'download', description: 'Previous Paper 2023 downloaded', timestamp: '1 hour ago' },
  { id: '8', type: 'view', description: 'Quiz page visited', timestamp: '2 hours ago' },
];
