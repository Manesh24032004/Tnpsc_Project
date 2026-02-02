import { FileText, Book, BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Import images
import tamilBookImg from '@/assets/tamil-book.jpg';
import mathsBookImg from '@/assets/maths-book.jpg';
import scienceBookImg from '@/assets/science-book.jpg';
import socialBookImg from '@/assets/social-book.jpg';

const books = [
  { name: 'Tamil', subject: 'Language', image: tamilBookImg },
  { name: 'Maths', subject: 'Mathematics', image: mathsBookImg },
  { name: 'Science', subject: 'Science', image: scienceBookImg },
  { name: 'Social Science', subject: 'Social Studies', image: socialBookImg },
];

export const ContentGrid = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Past Year Question Papers - Simple Button Style like Books */}
      <Card className="p-6 h-fit animate-slide-up">
        <div className="flex items-center gap-4 p-2 border-b border-muted pb-4 mb-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft">
            <FileText className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Past Year Questions</h3>
            <p className="text-sm text-muted-foreground">முந்தைய ஆண்டு வினாத்தாள்கள்</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-lg text-muted-foreground mb-6 text-center italic">
            "பழைய வினாக்கள் புதிய வெற்றிக்கு வழி"
          </p>
          <Link to="/previous-papers">
            <Button 
              size="lg" 
              className="text-base px-10 py-5 h-auto shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              <FileText className="h-5 w-5 mr-2" />
              View All Years
            </Button>
          </Link>
        </div>
      </Card>

      {/* Books */}
      <Card className="p-6 h-fit animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center gap-4 p-2 border-b border-muted pb-4 mb-4">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-soft">
            <Book className="h-6 w-6 text-accent-foreground" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Books</h3>
            <p className="text-sm text-muted-foreground">படிப்பதற்கான புத்தகங்கள்</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-lg text-muted-foreground mb-6 text-center italic">
            "கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக"
          </p>
          <Link to="/books/standards">
            <Button 
              size="lg" 
              className="text-base px-10 py-5 h-auto shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              View All Standards
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
};
