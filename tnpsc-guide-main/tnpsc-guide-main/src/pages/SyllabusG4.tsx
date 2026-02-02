import { ClipboardList, ArrowLeft, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';
import { DocumentViewer } from '@/components/DocumentViewer';

const SyllabusG4 = () => {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <Link to="/" className="inline-flex items-center text-primary hover:underline">
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <Link to="/syllabus" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Syllabus
          </Link>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">G-IV Syllabus</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Group 4 Examination - Subject-wise syllabus and preparation guide
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 transition-all duration-300 hover:shadow-elegant border-2 border-accent/30">
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-soft mb-4">
                <ClipboardList className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground text-center">
                Group 4 Syllabus Documents
              </h2>
            </div>

            <DocumentViewer 
              category="syllabus" 
              subcategory="G4"
              title="G-IV Syllabus"
              showTitle={false}
            />
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SyllabusG4;
