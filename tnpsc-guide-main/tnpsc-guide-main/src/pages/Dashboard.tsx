import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bot, 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Brain, 
  BookMarked, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  { 
    title: 'G1 Syllabus', 
    icon: BookOpen, 
    href: '/syllabus',
    description: 'Prelims & Mains'
  },
  { 
    title: 'G2 Syllabus', 
    icon: BookOpen, 
    href: '/syllabus',
    description: 'Prelims & Mains'
  },
  { 
    title: 'G4 Syllabus', 
    icon: BookOpen, 
    href: '/syllabus',
    description: 'Prelims Paper'
  },
  { 
    title: 'திருக்குறள்', 
    icon: BookMarked, 
    href: '/tirukural',
    description: '20 அதிகாரங்கள்'
  },
  { 
    title: 'Tamil Scholars', 
    icon: Users, 
    href: '/poets',
    description: '20+ அறிஞர்கள்'
  },
  { 
    title: 'Previous Papers', 
    icon: FileText, 
    href: '/previous-papers',
    description: '2015-2025'
  },
  { 
    title: 'School Books', 
    icon: GraduationCap, 
    href: '/books/standards',
    description: '6th to 12th'
  },
  { 
    title: 'Study Notes', 
    icon: FileText, 
    href: '/notes',
    description: 'Complete Notes'
  },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Wizard AI - Highlighted at Top */}
        <section className="animate-fade-in">
          <Link to="/ai-chat">
            <Card className="p-8 bg-gradient-primary text-primary-foreground border-4 border-secondary shadow-glow hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center animate-pulse">
                    <Bot className="h-12 w-12 text-secondary-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="h-6 w-6" />
                      <h2 className="text-3xl font-bold">TNPSC Wizard AI</h2>
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <p className="text-primary-foreground/90 text-lg">
                      Your 24/7 AI Study Assistant for TNPSC Preparation
                    </p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="font-bold text-lg px-8 shadow-elegant"
                >
                  Start Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </Card>
          </Link>
        </section>

        {/* Features Grid */}
        <section className="animate-slide-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} to={feature.href}>
                  <Card 
                    className="p-4 hover:shadow-glow hover:scale-105 transition-all duration-300 border-2 border-accent/30 hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer h-full group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="text-center">
                      <div className="w-14 h-14 bg-gradient-primary group-hover:bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 shadow-soft transition-all duration-300">
                        <Icon className="h-7 w-7 text-primary-foreground group-hover:text-secondary-foreground" />
                      </div>
                      <h3 className="font-bold text-foreground group-hover:text-primary-foreground mb-1 transition-colors">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">{feature.description}</p>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quiz Section - Highlighted at Bottom */}
        <section className="animate-slide-up">
          <Link to="/quiz">
            <Card className="p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white border-4 border-secondary shadow-glow hover:scale-[1.01] transition-all duration-300 cursor-pointer">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Brain className="h-10 w-10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      <h2 className="text-2xl font-bold">TNPSC Quiz</h2>
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="text-white/90">
                      Tamil Quiz | GS Quiz | Maths Quiz - Test Your Knowledge!
                    </p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  className="bg-white text-orange-600 hover:bg-white/90 font-bold"
                >
                  Take Quiz
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </Card>
          </Link>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;