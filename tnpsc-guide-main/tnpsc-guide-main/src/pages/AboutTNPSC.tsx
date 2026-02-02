import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { MapPin, Users, GraduationCap, FileCheck, Award } from 'lucide-react';

const examGroups = [
  {
    name: 'Group 1 Services',
    code: 'G1',
    posts: ['Deputy Collector', 'Deputy Superintendent of Police', 'Assistant Commissioner (Commercial Tax)', 'District Registrar', 'District Employment Officer', 'Assistant Director of Rural Development'],
  },
  {
    name: 'Group 2 Services',
    code: 'G2',
    posts: ['Assistant Section Officer', 'Assistant Inspector of Labour', 'Sub-Registrar Grade II', 'Special Deputy Collector', 'Executive Officer Grade I'],
  },
  {
    name: 'Group 2A Services',
    code: 'G2A',
    posts: ['Junior Inspector of Cooperative Societies', 'Revenue Assistant', 'Personal Clerk', 'Accountant in Treasuries', 'Audit Inspector'],
  },
  {
    name: 'Group 3 Services',
    code: 'G3',
    posts: ['Junior Superintendent', 'Sergeant', 'Assistant Jailer', 'Sub Inspector of Fisheries'],
  },
  {
    name: 'Group 4 Services',
    code: 'G4',
    posts: ['Junior Assistant', 'Typist', 'Steno-Typist', 'Village Administrative Officer', 'Field Surveyor', 'Draftsman'],
  },
  {
    name: 'Group 7 Services',
    code: 'G7',
    posts: ['Executive Officer Grade IV', 'Bill Collector', 'Revenue Inspector'],
  },
  {
    name: 'Group 8 Services',
    code: 'G8',
    posts: ['Last Grade Service', 'Office Assistant', 'Watchman'],
  },
  {
    name: 'Combined Engineering Services (CESE)',
    code: 'CESE',
    posts: ['Assistant Engineer (Civil)', 'Assistant Engineer (Electrical)', 'Assistant Engineer (Mechanical)'],
  },
  {
    name: 'Tamil Nadu Forest Service',
    code: 'TNFS',
    posts: ['Forest Range Officer', 'District Forest Officer', 'Wildlife Warden'],
  },
  {
    name: 'Agricultural Officer',
    code: 'AO',
    posts: ['Agricultural Officer', 'Assistant Agricultural Officer', 'Horticultural Officer'],
  },
  {
    name: 'Veterinary Assistant Surgeon',
    code: 'VAS',
    posts: ['Veterinary Assistant Surgeon', 'Animal Husbandry Officer'],
  },
  {
    name: 'Drug Inspector',
    code: 'DI',
    posts: ['Drug Inspector', 'Assistant Drug Controller'],
  },
];

const eligibilityCriteria = [
  {
    group: 'Group 1 (G1)',
    age: '21-32 years',
    education: "Bachelor's Degree in any discipline from a recognized university",
    relaxation: 'SC/ST/BC/MBC: 5 years, PWD: 10 years, Ex-Servicemen: As per rules',
  },
  {
    group: 'Group 2 (G2)',
    age: '18-30 years',
    education: "Bachelor's Degree from a recognized university",
    relaxation: 'SC/ST/BC/MBC: 5 years, PWD: 10 years',
  },
  {
    group: 'Group 2A (G2A)',
    age: '18-30 years',
    education: "Bachelor's Degree from a recognized university",
    relaxation: 'SC/ST/BC/MBC: 5 years, PWD: 10 years',
  },
  {
    group: 'Group 4 (G4)',
    age: '18-30 years',
    education: 'SSLC (10th Standard) Pass / Higher Secondary for some posts',
    relaxation: 'SC/ST/BC/MBC: 5 years, PWD: 10 years',
  },
  {
    group: 'CESE',
    age: '21-30 years',
    education: 'B.E/B.Tech in relevant Engineering discipline',
    relaxation: 'SC/ST/BC/MBC: 5 years, PWD: 10 years',
  },
  {
    group: 'Forest Service',
    age: '21-30 years',
    education: "Bachelor's Degree in Forestry/Agriculture/Science",
    relaxation: 'SC/ST/BC/MBC: 5 years, PWD: 10 years',
  },
];

const selectionProcess = [
  {
    group: 'Group 1 (G1)',
    stages: [
      'Preliminary Examination (Objective - 200 marks)',
      'Main Examination (Written - 6 papers)',
      'Oral Test / Interview (100 marks)',
      'Document Verification',
      'Final Merit List & Counselling',
    ],
    note: 'Interview is mandatory for Group 1',
  },
  {
    group: 'Group 2 (G2)',
    stages: [
      'Preliminary Examination (Objective - 100 marks)',
      'Main Examination (Written - 2 papers)',
      'Document Verification',
      'Counselling',
    ],
    note: 'No interview for Group 2',
  },
  {
    group: 'Group 2A (G2A)',
    stages: [
      'Single Written Examination (Objective - 200 marks)',
      'Document Verification',
      'Counselling',
    ],
    note: 'No Prelims or Interview for Group 2A',
  },
  {
    group: 'Group 4 (G4)',
    stages: [
      'Single Written Examination (Objective - 150 marks)',
      'Document Verification',
      'Counselling only - No Interview',
    ],
    note: 'Simplest selection process - only written exam and counselling',
  },
  {
    group: 'CESE',
    stages: [
      'Written Examination (Engineering subjects)',
      'Oral Test (for some posts)',
      'Document Verification',
      'Counselling',
    ],
    note: 'Technical examination based on engineering specialization',
  },
  {
    group: 'VAO',
    stages: [
      'Written Examination (Objective - 100 marks)',
      'Document Verification',
      'Counselling',
    ],
    note: 'No interview - direct counselling after written exam',
  },
];

const AboutTNPSC = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">About TNPSC</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tamil Nadu Public Service Commission
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* What is TNPSC */}
          <Card className="p-6 animate-slide-up">
            <h2 className="text-2xl font-bold text-primary mb-4">What is TNPSC?</h2>
            <p className="text-muted-foreground mb-4">
              The Tamil Nadu Public Service Commission (TNPSC) is a constitutional body established under Article 315 of the 
              Constitution of India. It was established in 1929 and is responsible for conducting examinations 
              and recruiting candidates for various civil service positions in the state of Tamil Nadu.
            </p>
            <p className="text-muted-foreground mb-4">
              TNPSC plays a crucial role in selecting qualified candidates for government jobs, ensuring merit-based 
              selection and providing equal opportunities to all citizens of Tamil Nadu.
            </p>
          </Card>

          {/* TNPSC Office Location with Map */}
          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.05s' }}>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">TNPSC Office Location</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Head Office Address</h3>
                  <p className="text-muted-foreground">
                    Tamil Nadu Public Service Commission<br />
                    TNPSC Road, Broadway<br />
                    Chennai - 600 003<br />
                    Tamil Nadu, India
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Contact</h3>
                  <p className="text-muted-foreground">
                    Phone: 044-2536 0524<br />
                    Website: www.tnpsc.gov.in<br />
                    Email: tnpsc@tn.gov.in
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-soft border-2 border-accent/30">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.546476456456!2d80.27863731482196!3d13.093398390779093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3362%3A0x6e61a24eb6a2757!2sTamil%20Nadu%20Public%20Service%20Commission!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TNPSC Office Location"
                ></iframe>
              </div>
            </div>
          </Card>

          {/* Exam Groups */}
          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">TNPSC Exam Groups</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              TNPSC conducts various examinations for different groups of services. Each group has specific posts with varying eligibility criteria.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {examGroups.map((group, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg hover:bg-primary/10 transition-colors">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-bold rounded">
                      {group.code}
                    </span>
                    <h3 className="font-semibold text-foreground text-sm">{group.name}</h3>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {group.posts.slice(0, 3).map((post, idx) => (
                      <li key={idx}>• {post}</li>
                    ))}
                    {group.posts.length > 3 && (
                      <li className="text-primary">+ {group.posts.length - 3} more posts</li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </Card>

          {/* Eligibility Criteria */}
          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">Eligibility Criteria</h2>
            </div>
            <div className="space-y-4">
              {eligibilityCriteria.map((criteria, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <h3 className="font-bold text-foreground mb-3 text-lg border-b border-accent/30 pb-2">
                    {criteria.group}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-primary">Age Limit:</span>
                      <p className="text-muted-foreground">{criteria.age}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Education:</span>
                      <p className="text-muted-foreground">{criteria.education}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-primary">Age Relaxation:</span>
                      <p className="text-muted-foreground">{criteria.relaxation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-primary/10 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">Common Requirements:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Must be an Indian citizen</li>
                <li>• Must be a native of Tamil Nadu / have studied in Tamil Nadu</li>
                <li>• Must know Tamil language (Read and Write)</li>
                <li>• Should not have more than one spouse living</li>
              </ul>
            </div>
          </Card>

          {/* Selection Process */}
          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-4">
              <FileCheck className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-primary">Selection Process</h2>
            </div>
            <div className="space-y-4">
              {selectionProcess.map((process, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-foreground text-lg">{process.group}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {process.stages.map((stage, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-foreground">{stage}</span>
                        {idx < process.stages.length - 1 && (
                          <span className="text-muted-foreground">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-primary bg-primary/10 p-2 rounded">
                    ⓘ {process.note}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Important Notes */}
          <Card className="p-6 bg-gradient-primary text-primary-foreground animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-xl font-bold mb-3">📋 Important Notes</h3>
            <ul className="space-y-2 text-primary-foreground/90">
              <li>✓ Always check the official TNPSC notification for accurate information</li>
              <li>✓ Age relaxation varies based on community certificate</li>
              <li>✓ Reservation rules apply as per Government of Tamil Nadu norms</li>
              <li>✓ Candidates should regularly visit www.tnpsc.gov.in for updates</li>
              <li>✓ Apply online through the One Time Registration (OTR) system</li>
            </ul>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutTNPSC;