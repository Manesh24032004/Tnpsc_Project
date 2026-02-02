import { ScrollText, ArrowLeft, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Link } from 'react-router-dom';
import { DocumentViewer } from '@/components/DocumentViewer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SyllabusG2 = () => {
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
          <h1 className="text-4xl font-bold text-primary mb-4">G-2/IIA Syllabus</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Group 2 & IIA Examinations - Detailed syllabus and exam pattern
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-6 sm:p-8 transition-all duration-300 hover:shadow-elegant border-2 border-accent/30">
            <div className="flex flex-col items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-soft mb-4">
                <ScrollText className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground text-center">
                Group 2/IIA Syllabus Documents
              </h2>
            </div>

            <Tabs defaultValue="prelims" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="prelims">Prelims (Common)</TabsTrigger>
                <TabsTrigger value="mains-g2">Mains G-2</TabsTrigger>
                <TabsTrigger value="mains-g2a">Mains G-2A</TabsTrigger>
              </TabsList>

              <TabsContent value="prelims">
                <div className="mb-4 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    Prelims syllabus is common for both Group 2 and Group 2A examinations
                  </p>
                </div>
                <DocumentViewer 
                  category="syllabus" 
                  subcategory="G2-Prelims"
                  title="G-2/G-2A Prelims Syllabus"
                  showTitle={false}
                />
              </TabsContent>

              <TabsContent value="mains-g2">
                <DocumentViewer 
                  category="syllabus" 
                  subcategory="G2-Mains"
                  title="G-2 Mains Syllabus"
                  showTitle={false}
                />
              </TabsContent>

              <TabsContent value="mains-g2a">
                <DocumentViewer 
                  category="syllabus" 
                  subcategory="G2A-Mains"
                  title="G-2A Mains Syllabus"
                  showTitle={false}
                />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SyllabusG2;
