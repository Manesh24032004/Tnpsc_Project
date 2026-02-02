import { useParams, Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, Download, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

// Import subject images
import tamilImg from '@/assets/subjects/tamil.png';
import mathsImg from '@/assets/subjects/maths.png';
import scienceImg from '@/assets/subjects/science.png';
import socialImg from '@/assets/subjects/social.png';
import sirapuTamilImg from '@/assets/subjects/sirapu-tamil.png';
import historyImg from '@/assets/subjects/history.png';
import economicsImg from '@/assets/subjects/economics.png';
import politicalScienceImg from '@/assets/subjects/political-science.png';
import indianCultureImg from '@/assets/subjects/indian-culture.png';

const subjectImages: Record<string, string> = {
  'Tamil': tamilImg,
  'Maths': mathsImg,
  'Science': scienceImg,
  'Social': socialImg,
  'Sirapu Tamil': sirapuTamilImg,
  'History': historyImg,
  'Economics': economicsImg,
  'Political Science': politicalScienceImg,
  'அரசியலும் இந்திய பண்பாடும்': indianCultureImg,
};

const subjectsByStandard: Record<string, { name: string; tamilName: string }[]> = {
  '6': [
    { name: 'Tamil', tamilName: 'தமிழ்' },
    { name: 'Maths', tamilName: 'கணிதம்' },
    { name: 'Science', tamilName: 'அறிவியல்' },
    { name: 'Social', tamilName: 'சமூக அறிவியல்' },
  ],
  '7': [
    { name: 'Tamil', tamilName: 'தமிழ்' },
    { name: 'Maths', tamilName: 'கணிதம்' },
    { name: 'Science', tamilName: 'அறிவியல்' },
    { name: 'Social', tamilName: 'சமூக அறிவியல்' },
  ],
  '8': [
    { name: 'Tamil', tamilName: 'தமிழ்' },
    { name: 'Maths', tamilName: 'கணிதம்' },
    { name: 'Science', tamilName: 'அறிவியல்' },
    { name: 'Social', tamilName: 'சமூக அறிவியல்' },
  ],
  '9': [
    { name: 'Tamil', tamilName: 'தமிழ்' },
    { name: 'Maths', tamilName: 'கணிதம்' },
    { name: 'Science', tamilName: 'அறிவியல்' },
    { name: 'Social', tamilName: 'சமூக அறிவியல்' },
  ],
  '10': [
    { name: 'Tamil', tamilName: 'தமிழ்' },
    { name: 'Maths', tamilName: 'கணிதம்' },
    { name: 'Science', tamilName: 'அறிவியல்' },
    { name: 'Social', tamilName: 'சமூக அறிவியல்' },
  ],
  '11': [
    { name: 'Tamil', tamilName: 'தமிழ்' },
    { name: 'Sirapu Tamil', tamilName: 'சிறப்பு தமிழ்' },
    { name: 'History', tamilName: 'வரலாறு' },
    { name: 'Economics', tamilName: 'பொருளியல்' },
    { name: 'Political Science', tamilName: 'அரசியல் அறிவியல்' },
    { name: 'அரசியலும் இந்திய பண்பாடும்', tamilName: 'அரசியலும் இந்திய பண்பாடும்' },
  ],
  '12': [
    { name: 'Tamil', tamilName: 'தமிழ்' },
    { name: 'Sirapu Tamil', tamilName: 'சிறப்பு தமிழ்' },
    { name: 'History', tamilName: 'வரலாறு' },
    { name: 'Economics', tamilName: 'பொருளியல்' },
    { name: 'Political Science', tamilName: 'அரசியல் அறிவியல்' },
    { name: 'அரசியலும் இந்திய பண்பாடும்', tamilName: 'அரசியலும் இந்திய பண்பாடும்' },
  ],
};

const quotes = [
  'கல்வி கரையில் கற்போம்',
  'அறிவே சிறந்த ஆயுதம்',
  'படிப்பு ஒரு பயணம்',
  'கல்வியால் கண்டறிவோம்',
];

const StandardBooks = () => {
  const { grade } = useParams<{ grade: string }>();
  const subjects = subjectsByStandard[grade || '6'] || [];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/books/standards">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Standards
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">
            {grade}th Standard Books
          </h1>
          <p className="text-lg italic text-primary/80">
            {quotes[Math.floor(Math.random() * quotes.length)]}
          </p>
        </div>

        {/* Subjects Grid - 30% smaller */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {subjects.map((subject, index) => (
            <Card 
              key={subject.name}
              className="p-4 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-primary/20 hover:border-primary animate-slide-up rounded-[14px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center mb-3">
                {/* Circular Subject Image - 30% smaller */}
                <div className="w-[105px] h-[105px] mx-auto mb-3 rounded-full border-2 border-primary/30 shadow-soft overflow-hidden bg-background">
                  {subjectImages[subject.name] ? (
                    <img 
                      src={subjectImages[subject.name]} 
                      alt={`${subject.name} icon`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                      Add Image
                    </div>
                  )}
                </div>
                <h3 className="text-base font-bold text-foreground mb-1">
                  {subject.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {subject.tamilName}
                </p>
              </div>

              {/* PDF File Card - smaller */}
              <div className="mb-3">
                <div className="flex items-center gap-2 p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium truncate">{subject.name}.pdf</span>
                </div>
              </div>

              {/* Action Buttons - smaller */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
                  <BookOpen className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button variant="default" size="sm" className="flex-1 text-xs h-8">
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StandardBooks;
