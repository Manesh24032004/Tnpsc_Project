import { BookOpen, ScrollText, ClipboardList } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';

const syllabusCategories = [
  {
    id: 'g1',
    title: 'G-1 Syllabus',
    description: 'Group 1 Examination - Complete syllabus with all subjects and topics',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    link: '/syllabus/g1'
  },
  {
    id: 'g2',
    title: 'G-2/IIA Syllabus',
    description: 'Group 2 & IIA Examinations - Detailed syllabus and exam pattern',
    icon: ScrollText,
    color: 'from-purple-500 to-pink-500',
    link: '/syllabus/g2'
  },
  {
    id: 'g4',
    title: 'G-IV Syllabus',
    description: 'Group 4 Examination - Subject-wise syllabus and preparation guide',
    icon: ClipboardList,
    color: 'from-orange-500 to-red-500',
    link: '/syllabus/g4'
  }
];

const Syllabus = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">TNPSC தேர்வு பாடத்திட்டம்</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            "கற்றதனால் ஆய பயன் என்கொல் வாலறிவன் நற்றாள் தொழாஅர் எனில்"
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Upload and download official syllabus PDFs for TNPSC examinations
          </p>
        </div>

        {/* Syllabus Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {syllabusCategories.map((category, index) => {
            const Icon = category.icon;
            
            return (
              <Link 
                key={category.id}
                to={category.link}
              >
                <Card 
                  className="p-6 transition-all duration-300 hover:shadow-elegant border-2 border-accent/30 hover:border-primary animate-slide-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center shadow-soft mb-4`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground text-center mb-2">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center">
                      {category.description}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground italic">
            "படிப்பே சிறந்த செல்வம்"
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Syllabus;