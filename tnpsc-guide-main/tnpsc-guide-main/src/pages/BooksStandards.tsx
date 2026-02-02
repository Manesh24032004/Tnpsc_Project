import { ArrowLeft, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';

// Import standard images
import standard6 from '@/assets/standards/6th-standard.png';
import standard7 from '@/assets/standards/7th-standard.png';
import standard8 from '@/assets/standards/8th-standard.png';
import standard9 from '@/assets/standards/9th-standard.png';
import standard10 from '@/assets/standards/10th-standard.png';
import standard11 from '@/assets/standards/11th-standard.png';
import standard12 from '@/assets/standards/12th-standard.png';

const standards = [
  { id: '6', name: '6th Standard', tamilName: 'ஆறாம் வகுப்பு', grade: '6', quote: 'கற்றல் முதல் செல்வம்', image: standard6 },
  { id: '7', name: '7th Standard', tamilName: 'ஏழாம் வகுப்பு', grade: '7', quote: 'அறிவே ஆற்றல்', image: standard7 },
  { id: '8', name: '8th Standard', tamilName: 'எட்டாம் வகுப்பு', grade: '8', quote: 'கல்வி கற்றல் நன்று', image: standard8 },
  { id: '9', name: '9th Standard', tamilName: 'ஒன்பதாம் வகுப்பு', grade: '9', quote: 'கல்வியே சிறந்த செல்வம்', image: standard9 },
  { id: '10', name: '10th Standard', tamilName: 'பத்தாம் வகுப்பு', grade: '10', quote: 'அறிவுடையார் எல்லாம் உடையார்', image: standard10 },
  { id: '11', name: '11th Standard', tamilName: 'பதினொன்றாம் வகுப்பு', grade: '11', quote: 'கல்வி அழகு', image: standard11 },
  { id: '12', name: '12th Standard', tamilName: 'பன்னிரண்டாம் வகுப்பு', grade: '12', quote: 'கல்வி வளர்ச்சி', image: standard12 },
];

const BooksStandards = () => {
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
          <Link to="/books">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">Select Standard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Choose your standard to access study materials
          </p>
          <p className="text-lg italic text-primary/80">
            "கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக"
          </p>
        </div>

        {/* Standards Grid - 30% smaller */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto">
          {standards.map((standard, index) => (
            <Link 
              key={standard.id}
              to={`/books/${standard.grade}`}
            >
              <Card 
                className="p-4 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-primary/20 hover:border-primary animate-slide-up cursor-pointer h-full rounded-[14px]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  {/* Circular Image Container - 30% smaller */}
                  <div className="w-28 h-28 mx-auto mb-3 rounded-full border-2 border-primary/30 shadow-soft overflow-hidden bg-background">
                    <img 
                      src={standard.image} 
                      alt={`${standard.name} illustration`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    {standard.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-1">
                    {standard.tamilName}
                  </p>
                  <p className="text-xs italic text-primary/70 mt-2">
                    {standard.quote}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BooksStandards;
