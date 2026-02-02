import { Link } from 'react-router-dom';
import { FileText, Home, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

const PreviousPapers = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back to Home */}
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary/70 rounded-full mb-4 shadow-lg">
            <FileText className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Past Year Questions
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select a year to access TNPSC examination papers
          </p>
        </div>

        {/* Years Grid */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {years.map((year, index) => (
              <Link key={year} to={`/previous-papers/${year}`}>
                <Card 
                  className="group p-6 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-transparent hover:border-primary/30 bg-card animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center group-hover:from-primary group-hover:to-primary/80 transition-all duration-300">
                      <FileText className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{year}</span>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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

export default PreviousPapers;