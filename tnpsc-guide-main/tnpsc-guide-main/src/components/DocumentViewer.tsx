import { useState, useEffect } from 'react';
import { Eye, Download, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useDocuments } from '@/hooks/useDocuments';
import { toast } from '@/hooks/use-toast';

interface Document {
  id: string;
  title: string;
  description: string | null;
  category: string;
  subcategory: string | null;
  file_name: string;
  file_path: string;
}

interface DocumentViewerProps {
  category: string;
  subcategory?: string;
  title?: string;
  icon?: React.ReactNode;
  showTitle?: boolean;
}

export const DocumentViewer = ({ 
  category, 
  subcategory, 
  title,
  icon,
  showTitle = true 
}: DocumentViewerProps) => {
  const { documents, loading, getPublicUrl, incrementDownload } = useDocuments();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Filter documents by category and subcategory
  const filteredDocs = documents.filter(doc => {
    if (doc.category !== category) return false;
    if (subcategory && doc.subcategory !== subcategory) return false;
    return true;
  });

  const handleView = async (doc: Document) => {
    try {
      const url = await getPublicUrl(doc.file_path);
      if (url) {
        setPdfUrl(url);
        setSelectedDoc(doc);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load document",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      const url = await getPublicUrl(doc.file_path);
      if (url) {
        await incrementDownload(doc.id);
        const a = document.createElement('a');
        a.href = url;
        a.download = doc.file_name;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        toast({
          title: "Download Started",
          description: `Downloading ${doc.title}`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download document",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (filteredDocs.length === 0) {
    return (
      <Card className="p-6 text-center">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No documents available yet</p>
        <p className="text-sm text-muted-foreground mt-2">Check back later for updates</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {showTitle && title && (
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
      )}
      
      {filteredDocs.map((doc) => (
        <Card key={doc.id} className="p-4 transition-all duration-300 hover:shadow-elegant border border-border/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">{doc.title}</h4>
                {doc.description && (
                  <p className="text-sm text-muted-foreground mt-1">{doc.description}</p>
                )}
                {doc.subcategory && (
                  <span className="inline-block mt-2 px-2 py-1 text-xs bg-accent/20 text-accent-foreground rounded">
                    {doc.subcategory}
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 flex-shrink-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleView(doc)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[80vh]">
                  <DialogHeader>
                    <DialogTitle>{selectedDoc?.title}</DialogTitle>
                  </DialogHeader>
                  {pdfUrl && (
                    <iframe
                      src={pdfUrl}
                      className="w-full h-full rounded-lg"
                      title={selectedDoc?.title}
                    />
                  )}
                </DialogContent>
              </Dialog>
              
              <Button 
                variant="default" 
                size="sm"
                onClick={() => handleDownload(doc)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
