import { Link, useParams } from 'react-router-dom';
import { FileText, Download, Eye, Home, ArrowLeft, BookOpen, PenTool } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';

const groupTitles: Record<string, string> = {
  'group-1': 'Group 1',
  'group-2': 'Group 2',
  'group-4': 'Group 4',
};

const paperTypes: Record<string, Array<{ id: string; title: string; subtitle: string; icon: typeof FileText }>> = {
  'group-1': [
    { id: 'prelims', title: 'Prelims Question Paper', subtitle: 'Preliminary Examination', icon: BookOpen },
    { id: 'mains', title: 'Mains Question Paper', subtitle: 'Main Examination', icon: PenTool },
  ],
  'group-2': [
    { id: 'prelims', title: 'Prelims Question Paper', subtitle: 'Preliminary Examination', icon: BookOpen },
    { id: 'mains', title: 'Mains Question Paper', subtitle: 'Main Examination', icon: PenTool },
  ],
  'group-4': [
    { id: 'full', title: 'Full Question Paper', subtitle: 'Complete Examination Paper', icon: FileText },
  ],
};

const PapersByGroup = () => {
  const { year, group } = useParams<{ year: string; group: string }>();
  const papers = paperTypes[group || ''] || [];
  const groupTitle = groupTitles[group || ''] || 'Unknown';

  const handleView = (paperId: string) => {
    console.log(`Viewing ${year} ${groupTitle} ${paperId}`);
    // TODO: Implement PDF viewer
  };

  const handleDownload = (paperId: string) => {
    console.log(`Downloading ${year} ${groupTitle} ${paperId}`);
    // TODO: Implement download
  };

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
          <Link to={`/previous-papers/${year}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Exam Types
            </Button>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex gap-2 mb-4">
            <span className="px-4 py-1.5 bg-primary/10 rounded-full text-primary font-semibold">{year}</span>
            <span className="px-4 py-1.5 bg-secondary rounded-full text-secondary-foreground font-semibold">{groupTitle}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {year} {groupTitle}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select a question paper to view or download
          </p>
        </div>

        {/* Papers Grid */}
        <div className="max-w-xl mx-auto">
          <div className="space-y-4">
            {papers.map((paper, index) => (
              <Card 
                key={paper.id}
                className="p-6 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-primary/30 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <paper.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-bold text-foreground mb-1">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground">{paper.subtitle}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleView(paper.id)}
                      className="gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleDownload(paper.id)}
                      className="gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PapersByGroup;