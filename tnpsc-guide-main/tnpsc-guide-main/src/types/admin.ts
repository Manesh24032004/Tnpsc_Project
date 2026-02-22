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

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
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

