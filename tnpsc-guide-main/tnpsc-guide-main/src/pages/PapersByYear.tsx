import { Link, useParams } from 'react-router-dom';
import { Users, Briefcase, FileCheck, Home, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

const examTypes = [
  {
    id: 'group-1',
    title: 'Group 1',
    subtitle: 'CCSE Group-I Services',
    icon: Users,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
  },
  {
    id: 'group-2',
    title: 'Group 2',
    subtitle: 'CCSE Group-II Services',
    icon: Briefcase,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
  },
  {
    id: 'group-4',
    title: 'Group 4',
    subtitle: 'CCSE Group-IV Services',
    icon: FileCheck,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
  },
];

const PapersByYear = () => {
  const { year } = useParams<{ year: string }>();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link to="/previous-papers">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Years
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-block px-6 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-semibold text-lg">{year}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Select Exam Type
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose the examination group to view question papers
          </p>
        </div>

        {/* Exam Types Grid */}
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {examTypes.map((exam, index) => (
              <Link key={exam.id} to={`/previous-papers/${year}/${exam.id}`}>
                <Card 
                  className={`group p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 ${exam.borderColor} ${exam.bgColor} animate-slide-up`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className={`w-20 h-20 bg-gradient-to-br ${exam.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                      <exam.icon className="h-10 w-10 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{exam.title}</h3>
                      <p className="text-sm text-muted-foreground">{exam.subtitle}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PapersByYear;