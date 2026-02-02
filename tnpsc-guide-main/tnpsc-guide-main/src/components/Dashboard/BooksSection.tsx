import { GraduationCap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const standards = [
  { id: '6', name: '6th Standard', grade: '6', quote: 'கற்றல் முதல் செல்வம்' },
  { id: '7', name: '7th Standard', grade: '7', quote: 'அறிவே ஆற்றல்' },
  { id: '8', name: '8th Standard', grade: '8', quote: 'கல்வி கற்றல் நன்று' },
  { id: '9', name: '9th Standard', grade: '9', quote: 'கல்வியே சிறந்த செல்வம்' },
  { id: '10', name: '10th Standard', grade: '10', quote: 'அறிவுடையார் எல்லாம் உடையார்' },
  { id: '11', name: '11th Standard', grade: '11', quote: 'கல்வி அழகு' },
  { id: '12', name: '12th Standard', grade: '12', quote: 'கல்வி வளர்ச்சி' },
];

export const BooksSection = () => {
  return (
    <section className="animate-slide-up">
      <h2 className="text-3xl font-bold text-primary text-center mb-4">
        பாடப் புத்தகங்கள்
      </h2>
      <p className="text-center text-muted-foreground mb-6 italic">
        "கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக"
      </p>

      {/* Standards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {standards.map((standard, index) => (
          <Link 
            key={standard.id}
            to={`/books/${standard.grade}`}
          >
            <Card 
              className="p-4 transition-all duration-300 hover:shadow-elegant hover:scale-105 border-2 border-accent/30 hover:border-primary animate-fade-in cursor-pointer h-full"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3 shadow-soft">
                  <GraduationCap className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {standard.name}
                </h3>
                <p className="text-xs italic text-primary/70">
                  {standard.quote}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
