import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const QuizGS = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <Link to="/" className="inline-flex items-center text-primary hover:underline">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <Link to="/quiz" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Quiz
          </Link>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-soft">
            <Globe className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-4">General Studies Quiz</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your General Knowledge and Current Affairs
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="p-6 sm:p-8">
            <div className="text-center py-12">
              <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">Coming Soon!</h3>
              <p className="text-muted-foreground mb-6">
                General Studies quiz questions will be available soon. Stay tuned!
              </p>
              <Link to="/quiz">
                <Button variant="outline">Back to Quiz Home</Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuizGS;
