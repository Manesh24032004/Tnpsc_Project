import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Brain, BookOpen, Globe, Calculator, Home, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const quizCategories = [
  {
    title: 'Tamil Quiz',
    description: 'Test your Tamil language and literature knowledge',
    icon: BookOpen,
    href: '/quiz/tamil',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    title: 'General Studies Quiz',
    description: 'Current affairs and general awareness',
    icon: Globe,
    href: '/quiz/gs',
    gradient: 'from-blue-500 to-purple-500',
  },
  {
    title: 'Maths Quiz',
    description: 'Aptitude and mathematical reasoning',
    icon: Calculator,
    href: '/quiz/maths',
    gradient: 'from-green-500 to-teal-500',
  },
];

const Quiz = () => {
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
          <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
            <Brain className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">TNPSC Quiz</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your knowledge with our comprehensive quiz collection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {quizCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link key={category.href} to={category.href}>
                <Card 
                  className="p-6 cursor-pointer transition-all duration-300 hover:shadow-elegant hover:scale-105 hover:border-secondary border-2 border-accent/30 group h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-full flex items-center justify-center shadow-soft mb-4 group-hover:shadow-glow transition-all duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      Start Quiz <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Quiz;