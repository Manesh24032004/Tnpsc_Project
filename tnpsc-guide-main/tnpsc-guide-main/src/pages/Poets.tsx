import { useState, useRef } from 'react';
import { Download, Eye, Search, Upload, X, Home, ArrowLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

// Import poet images
import bharathiyarImg from '@/assets/poets/bharathiyar.jpg';
import bharathidasanImg from '@/assets/poets/bharathidasan.jpg';
import uvSwaminathaImg from '@/assets/poets/uv-swaminatha-iyer.jpg';
import kannadasanImg from '@/assets/poets/kannadasan.jpg';
import namakkalKavignarImg from '@/assets/poets/namakkal-kavignar.jpg';

const poetImages: Record<number, string> = {
  1: bharathiyarImg,
  2: bharathidasanImg,
  3: uvSwaminathaImg,
  12: kannadasanImg,
};

interface Poet {
  id: number;
  name: string;
  pdfUrl: string;
  imageUrl?: string;
}

const initialPoetsData: Poet[] = [
  { id: 1, name: 'பாரதியார்', pdfUrl: '' },
  { id: 2, name: 'பாரதிதாசன்', pdfUrl: '' },
  { id: 3, name: 'உ. வே. சாமிநாதர்', pdfUrl: '' },
  { id: 4, name: 'தொ. பொ. மீனாட்சிசுந்தரம்', pdfUrl: '' },
  { id: 5, name: 'சி.இலக்குவனார்', pdfUrl: '' },
  { id: 6, name: 'ஜி.யூ.போப்', pdfUrl: '' },
  { id: 7, name: 'தேவநேய பாவாணர்', pdfUrl: '' },
  { id: 8, name: 'பெருஞ்சித்திரனார்', pdfUrl: '' },
  { id: 9, name: 'வீரமாமுனிவர்', pdfUrl: '' },
  { id: 10, name: 'த.க.சி. சிதம்பரனார்', pdfUrl: '' },
  { id: 11, name: 'குன்றக்குடி ஆதிகள்', pdfUrl: '' },
  { id: 12, name: 'கண்ணதாசன்', pdfUrl: '' },
  { id: 13, name: 'கைதே மில்லத்', pdfUrl: '' },
  { id: 14, name: 'தாரா பாரதி', pdfUrl: '' },
  { id: 15, name: 'வேலுநாச்சியார்', pdfUrl: '' },
  { id: 16, name: 'பட்டுக்கோட்டை கல்யாணசுந்தரம்', pdfUrl: '' },
  { id: 17, name: 'முடியரசன்', pdfUrl: '' },
  { id: 18, name: 'தமிழொளி', pdfUrl: '' },
  { id: 19, name: 'உருத்திரங்கண்ணனார்', pdfUrl: '' },
  { id: 20, name: 'கி.வா. ஜகந்நாதன்', pdfUrl: '' },
];

const Poets = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [poetsData, setPoetsData] = useState<Poet[]>(initialPoetsData);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedPoetId, setSelectedPoetId] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const filteredPoets = poetsData.filter(poet =>
    poet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (poet: Poet) => {
    console.log('Viewing:', poet.name);
    toast({
      title: "View PDF",
      description: `Opening ${poet.name}'s document...`,
    });
  };

  const handleDownload = (poet: Poet) => {
    console.log('Downloading:', poet.name);
    toast({
      title: "Download Started",
      description: `Downloading ${poet.name}'s document...`,
    });
  };

  const openUploadModal = (poetId: number) => {
    setSelectedPoetId(poetId);
    setPreviewImage(null);
    setUploadModalOpen(true);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 2MB",
          variant: "destructive"
        });
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a JPG or PNG image",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmUpload = () => {
    if (selectedPoetId && previewImage) {
      setPoetsData(prev => prev.map(poet => 
        poet.id === selectedPoetId 
          ? { ...poet, imageUrl: previewImage }
          : poet
      ));
      toast({
        title: "Image Uploaded",
        description: "Portrait image updated successfully",
      });
      setUploadModalOpen(false);
      setPreviewImage(null);
      setSelectedPoetId(null);
    }
  };

  const getPoetImage = (poet: Poet) => {
    if (poet.imageUrl) return poet.imageUrl;
    if (poetImages[poet.id]) return poetImages[poet.id];
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">தமிழ் அறிஞர்கள்</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn about great Tamil poets, scholars, and writers
          </p>
        </div>

        {/* Search */}
        <Card className="p-6 mb-8 animate-slide-up max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search poets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Poets Grid - TNPSC Style Author Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredPoets.map((poet, index) => {
            const poetImage = getPoetImage(poet);
            return (
              <Card 
                key={poet.id}
                className="p-4 transition-all duration-300 hover:shadow-elegant border-2 border-primary/20 hover:border-primary animate-slide-up rounded-[20px]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center gap-4">
                  {/* Circular Portrait */}
                  <div className="flex-shrink-0">
                    <div className="w-[100px] h-[100px] rounded-full border-2 border-primary/30 shadow-soft overflow-hidden bg-muted">
                      {poetImage ? (
                        <img 
                          src={poetImage} 
                          alt={`Portrait of ${poet.name}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-center p-2">
                          <span className="text-xs text-muted-foreground mb-1">Image missing</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-6 px-2"
                            onClick={() => openUploadModal(poet.id)}
                          >
                            <Upload className="h-3 w-3 mr-1" />
                            Upload
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Author Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-foreground mb-3 truncate">
                      {poet.name}
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleView(poet)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleDownload(poet)}
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPoets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No poets found matching your search.
            </p>
          </div>
        )}
      </main>

      {/* Upload Image Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Portrait Image</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-[200px] h-[200px] rounded-full border-2 border-primary/30 overflow-hidden bg-muted flex items-center justify-center">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground text-sm">Preview</span>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileSelect}
              className="hidden"
            />

            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Select Image (JPG/PNG, max 2MB)
            </Button>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setUploadModalOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={confirmUpload} disabled={!previewImage}>
              Confirm Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Poets;
