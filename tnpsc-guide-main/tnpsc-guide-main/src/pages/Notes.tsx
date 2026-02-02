import { useState } from 'react';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  BookOpen, 
  Brain, 
  History, 
  Eye, 
  Download, 
  ChevronDown, 
  ChevronUp,
  Calculator,
  Microscope,
  Landmark,
  Scale,
  Home
} from 'lucide-react';
import { toast } from 'sonner';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Link } from 'react-router-dom';

interface NoteTopic {
  name: string;
  pdfUrl: string;
}

interface NoteCategory {
  id: number;
  title: string;
  icon: typeof BookOpen;
  topics: NoteTopic[];
}

const noteCategories: NoteCategory[] = [
  {
    id: 1,
    title: 'General Tamil',
    icon: BookOpen,
    topics: [
      { name: 'இலக்கணம்', pdfUrl: '/pdfs/ilakkanam.pdf' },
      { name: 'இலக்கியம்', pdfUrl: '/pdfs/ilakkiyam.pdf' },
      { name: 'பழமொழிகள்', pdfUrl: '/pdfs/pazhamozhigal.pdf' },
      { name: 'புணர்ச்சி', pdfUrl: '/pdfs/punarchi.pdf' },
      { name: 'தொகைநூல்கள்', pdfUrl: '/pdfs/thogainoolkal.pdf' },
      { name: 'திருக்குறள்', pdfUrl: '/pdfs/thirukkural.pdf' },
    ],
  },
  {
    id: 2,
    title: 'History',
    icon: History,
    topics: [
      { name: 'பண்டைய வரலாறு', pdfUrl: '/pdfs/ancient-history.pdf' },
      { name: 'நடுக்கால வரலாறு', pdfUrl: '/pdfs/medieval-history.pdf' },
      { name: 'நவீன வரலாறு', pdfUrl: '/pdfs/modern-history.pdf' },
      { name: 'இந்திய வரலாறு', pdfUrl: '/pdfs/indian-history.pdf' },
      { name: 'தமிழக வரலாறு', pdfUrl: '/pdfs/tamilnadu-history.pdf' },
      { name: 'உலக வரலாறு', pdfUrl: '/pdfs/world-history.pdf' },
    ],
  },
  {
    id: 3,
    title: 'Maths',
    icon: Calculator,
    topics: [
      { name: 'எண் கணிதம்', pdfUrl: '/pdfs/number-system.pdf' },
      { name: 'சதவீதம்', pdfUrl: '/pdfs/percentage.pdf' },
      { name: 'விகிதம் & விகிதாசாரம்', pdfUrl: '/pdfs/ratio.pdf' },
      { name: 'லாபம் & நஷ்டம்', pdfUrl: '/pdfs/profit-loss.pdf' },
      { name: 'நேரம் & வேலை', pdfUrl: '/pdfs/time-work.pdf' },
      { name: 'வட்டி', pdfUrl: '/pdfs/interest.pdf' },
    ],
  },
  {
    id: 4,
    title: 'Science',
    icon: Microscope,
    topics: [
      { name: 'இயற்பியல்', pdfUrl: '/pdfs/physics.pdf' },
      { name: 'வேதியியல்', pdfUrl: '/pdfs/chemistry.pdf' },
      { name: 'உயிரியல்', pdfUrl: '/pdfs/biology.pdf' },
      { name: 'தாவரவியல்', pdfUrl: '/pdfs/botany.pdf' },
      { name: 'விலங்கியல்', pdfUrl: '/pdfs/zoology.pdf' },
      { name: 'சுற்றுச்சூழல்', pdfUrl: '/pdfs/environment.pdf' },
    ],
  },
  {
    id: 5,
    title: 'Economics',
    icon: Landmark,
    topics: [
      { name: 'இந்திய பொருளாதாரம்', pdfUrl: '/pdfs/indian-economy.pdf' },
      { name: 'தமிழ்நாடு பொருளாதாரம்', pdfUrl: '/pdfs/tn-economy.pdf' },
      { name: 'பணவியல்', pdfUrl: '/pdfs/monetary.pdf' },
      { name: 'வங்கி & நிதி', pdfUrl: '/pdfs/banking.pdf' },
      { name: 'திட்டமிடல்', pdfUrl: '/pdfs/planning.pdf' },
    ],
  },
  {
    id: 6,
    title: 'Polity',
    icon: Scale,
    topics: [
      { name: 'இந்திய அரசியலமைப்பு', pdfUrl: '/pdfs/constitution.pdf' },
      { name: 'மத்திய அரசு', pdfUrl: '/pdfs/central-govt.pdf' },
      { name: 'மாநில அரசு', pdfUrl: '/pdfs/state-govt.pdf' },
      { name: 'உள்ளாட்சி', pdfUrl: '/pdfs/local-govt.pdf' },
      { name: 'நீதித்துறை', pdfUrl: '/pdfs/judiciary.pdf' },
      { name: 'தேர்தல்', pdfUrl: '/pdfs/election.pdf' },
    ],
  },
];

const Notes = () => {
  const [openCategories, setOpenCategories] = useState<number[]>([]);

  const toggleCategory = (id: number) => {
    setOpenCategories(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const handleView = (topicName: string) => {
    toast.info(`${topicName} - PDF பார்வை விரைவில் கிடைக்கும்`);
  };

  const handleDownload = (topicName: string) => {
    toast.success(`${topicName} - PDF பதிவிறக்கம் தொடங்கியது`);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <Link to="/home" className="inline-flex items-center text-primary hover:underline">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">Study Notes</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            Comprehensive notes for TNPSC preparation
          </p>
          <p className="text-lg italic text-primary/80">
            "அறிவுக் கூர்மை பயிற்சியால் வளரும்"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {noteCategories.map((category, index) => {
            const Icon = category.icon;
            const isOpen = openCategories.includes(category.id);
            
            return (
              <Card 
                key={category.id}
                className="p-6 transition-all duration-300 hover:shadow-elegant border-2 border-accent/30 hover:border-primary animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Collapsible open={isOpen} onOpenChange={() => toggleCategory(category.id)}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft flex-shrink-0">
                      <Icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {category.topics.length} topics
                      </p>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent>
                    <div className="space-y-2">
                      {category.topics.map((topic, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm">{topic.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(topic.name)}
                              className="h-8 w-8 p-0"
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(topic.name)}
                              className="h-8 w-8 p-0"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>

                  {!isOpen && (
                    <div className="space-y-2">
                      {category.topics.slice(0, 3).map((topic, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center justify-between gap-2 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <FileText className="h-4 w-4 text-primary" />
                            <span className="text-sm">{topic.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(topic.name)}
                              className="h-8 w-8 p-0"
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(topic.name)}
                              className="h-8 w-8 p-0"
                              title="Download"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {category.topics.length > 3 && (
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-full text-primary">
                            + {category.topics.length - 3} more topics
                          </Button>
                        </CollapsibleTrigger>
                      )}
                    </div>
                  )}
                </Collapsible>
              </Card>
            );
          })}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Notes;