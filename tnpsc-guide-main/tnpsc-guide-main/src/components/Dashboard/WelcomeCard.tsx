import { GraduationCap, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export const WelcomeCard = () => {
  return (
    <Card className="bg-gradient-primary text-primary-foreground p-6 text-center border-4 border-secondary rounded-2xl shadow-elegant animate-fade-in">
      <div className="flex items-center justify-center gap-2 mb-3">
        <GraduationCap className="h-8 w-8" />
        <h1 className="text-2xl font-bold">
          TNPSC wizard
        </h1>
      </div>
      
      <p className="text-base text-primary-foreground/90 mb-4">
        A Smart Digital Learning Platform
      </p>
      
      <Link to="/ai-chat">
        <Button 
          variant="secondary" 
          size="default"
          className="font-bold px-6 py-2 shadow-elegant hover:shadow-glow transition-all duration-300 hover:scale-105"
        >
          <Bot className="h-4 w-4 mr-2" />
          Start Now
        </Button>
      </Link>
    </Card>
  );
};