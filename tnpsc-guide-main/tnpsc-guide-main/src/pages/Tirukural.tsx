import { useState } from 'react';
import { Navbar } from '@/components/Layout/Navbar';
import { Footer } from '@/components/Layout/Footer';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Eye, Download } from 'lucide-react';
import { toast } from 'sonner';
import thiruvalluvarImg from '@/assets/thiruvalluvar.jpg';
import tirukuralBookImg from '@/assets/tirukural-book.jpg';

const adigaramList = [
  { id: 1, name: 'கடவுள் வாழ்த்து', pdfUrl: '/pdfs/adigaram-1.pdf' },
  { id: 2, name: 'வான்சிறப்பு', pdfUrl: '/pdfs/adigaram-2.pdf' },
  { id: 3, name: 'நீத்தார் பெருமை', pdfUrl: '/pdfs/adigaram-3.pdf' },
  { id: 4, name: 'அறன்வலியுறுத்தல்', pdfUrl: '/pdfs/adigaram-4.pdf' },
  { id: 5, name: 'இல்வாழ்க்கை', pdfUrl: '/pdfs/adigaram-5.pdf' },
  { id: 6, name: 'வாழ்க்கைத்துணைநலம்', pdfUrl: '/pdfs/adigaram-6.pdf' },
  { id: 7, name: 'புதல்வரைப்பெறுதல்', pdfUrl: '/pdfs/adigaram-7.pdf' },
  { id: 8, name: 'அன்புடைமை', pdfUrl: '/pdfs/adigaram-8.pdf' },
  { id: 9, name: 'விருந்தோம்பல்', pdfUrl: '/pdfs/adigaram-9.pdf' },
  { id: 10, name: 'இனியவைகூறல்', pdfUrl: '/pdfs/adigaram-10.pdf' },
  { id: 11, name: 'செய்ந்நன்றி அறிதல்', pdfUrl: '/pdfs/adigaram-11.pdf' },
  { id: 12, name: 'நடுவுநிலைமை', pdfUrl: '/pdfs/adigaram-12.pdf' },
  { id: 13, name: 'அடக்கமுடைமை', pdfUrl: '/pdfs/adigaram-13.pdf' },
  { id: 14, name: 'ஒழுக்கமுடைமை', pdfUrl: '/pdfs/adigaram-14.pdf' },
  { id: 15, name: 'பிறனில்விழையாமை', pdfUrl: '/pdfs/adigaram-15.pdf' },
  { id: 16, name: 'பொறையுடைமை', pdfUrl: '/pdfs/adigaram-16.pdf' },
  { id: 17, name: 'அழுக்காறாமை', pdfUrl: '/pdfs/adigaram-17.pdf' },
  { id: 18, name: 'வெஃகாமை', pdfUrl: '/pdfs/adigaram-18.pdf' },
  { id: 19, name: 'புறங்கூறாமை', pdfUrl: '/pdfs/adigaram-19.pdf' },
  { id: 20, name: 'பயனில சொல்லாமை', pdfUrl: '/pdfs/adigaram-20.pdf' },
];

const Tirukural = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdigaram = adigaramList.filter(adigaram =>
    adigaram.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (adigaram: typeof adigaramList[0]) => {
    toast.info(`${adigaram.name} - PDF பார்வை விரைவில் கிடைக்கும்`);
  };

  const handleDownload = (adigaram: typeof adigaramList[0]) => {
    toast.success(`${adigaram.name} - PDF பதிவிறக்கம் தொடங்கியது`);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-primary mb-4">திருக்குறள்</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
            திருவள்ளுவர் அருளிய அறநூல்
          </p>
          <p className="text-lg italic text-primary/80">
            "குறள் என்னும் குன்றேறி நின்றார் அறிவு"
          </p>
        </div>

        {/* History of Thiruvalluvar with Image */}
        <Card className="mb-6 p-6 animate-slide-up max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-primary mb-4">திருவள்ளுவர் வரலாறு</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3 flex-shrink-0">
              <img 
                src={thiruvalluvarImg} 
                alt="திருவள்ளுவர்" 
                className="w-full max-w-xs mx-auto rounded-lg shadow-elegant border-4 border-primary/20"
              />
              <p className="text-center text-sm text-muted-foreground mt-2 italic">
                திருவள்ளுவர் - தமிழ்க் கவிஞர்
              </p>
            </div>
            <div className="md:w-2/3 space-y-4 text-muted-foreground">
              <p>
                திருவள்ளுவர் தமிழ்நாட்டின் பெருமைமிக்க கவிஞர் ஆவார். இவர் கி.மு. 31ஆம் ஆண்டு பிறந்ததாக 
                கருதப்படுகிறது. திருவள்ளுவர் சென்னை மயிலாப்பூரில் பிறந்ததாக வரலாற்று ஆசிரியர்கள் 
                குறிப்பிடுகின்றனர். இவரது தந்தை பகவன், தாய் ஆதி என்று கூறப்படுகிறது.
              </p>
              <p>
                திருவள்ளுவரின் மனைவி வாசுகி. இவர்கள் மதுரையில் வாழ்ந்ததாகவும், திருவள்ளுவர் நெசவுத் 
                தொழில் செய்ததாகவும் கூறப்படுகிறது. திருவள்ளுவர் தமிழ், சமஸ்கிருதம், பிராகிருதம் போன்ற 
                மொழிகளில் புலமை பெற்றிருந்தார். இவர் ஜைன சமயத்தைச் சார்ந்தவர் என்றும், சமண சமயத்தைச் 
                சார்ந்தவர் என்றும் கருத்துக்கள் உள்ளன.
              </p>
              <p>
                வள்ளுவர் உலகப்புகழ் பெற்ற அறிஞர். அவரது படைப்பான திருக்குறள் உலகின் அனைத்து மொழிகளிலும் 
                மொழிபெயர்க்கப்பட்டுள்ளது. தமிழ்நாடு அரசு ஒவ்வோர் ஆண்டும் ஜனவரி 15/16 அன்று திருவள்ளுவர் 
                தினத்தைக் கொண்டாடுகிறது. சென்னை மற்றும் கன்னியாகுமரியில் திருவள்ளுவர் சிலைகள் உள்ளன.
              </p>
              <p>
                திருவள்ளுவர் தனது வாழ்நாள் முழுவதும் எளிமையான வாழ்க்கை வாழ்ந்தார். அவர் உலகியல் அறிவு, 
                தத்துவம், அரசியல், பொருளாதாரம், காதல், குடும்ப வாழ்க்கை ஆகிய அனைத்திலும் ஆழ்ந்த 
                புலமை பெற்றிருந்தார். அவரது பணிவும் ஒழுக்கமும் இன்றளவும் போற்றப்படுகின்றன.
              </p>
            </div>
          </div>
        </Card>

        {/* History of Thirukkural with Book Image */}
        <Card className="mb-6 p-6 animate-slide-up max-w-5xl mx-auto" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-2xl font-bold text-primary mb-4">திருக்குறள் வரலாறு</h2>
          <div className="flex flex-col md:flex-row-reverse gap-6">
            <div className="md:w-1/3 flex-shrink-0">
              <img 
                src={tirukuralBookImg} 
                alt="திருக்குறள் நூல்" 
                className="w-full max-w-xs mx-auto rounded-lg shadow-elegant border-4 border-primary/20"
              />
              <p className="text-center text-sm text-muted-foreground mt-2 italic">
                திருக்குறள் - உலகப் பொதுமறை
              </p>
            </div>
            <div className="md:w-2/3 space-y-4 text-muted-foreground">
              <p>
                திருக்குறள் உலகப் பொதுமறை எனப்படும். இது 1330 குறள்களைக் கொண்டது. ஒவ்வொரு குறளும் 
                இரண்டு வரிகளைக் கொண்டது. முதல் வரியில் நான்கு சீர்களும், இரண்டாம் வரியில் மூன்று 
                சீர்களும் உள்ளன. இது வெண்பா யாப்பில் அமைந்துள்ளது.
              </p>
              <p>
                திருக்குறள் மூன்று பால்களாகப் பிரிக்கப்பட்டுள்ளது: அறத்துப்பால் (38 அதிகாரங்கள், 380 குறள்கள்), 
                பொருட்பால் (70 அதிகாரங்கள், 700 குறள்கள்), காமத்துப்பால் (25 அதிகாரங்கள், 250 குறள்கள்). 
                ஒவ்வொரு அதிகாரத்திலும் 10 குறள்கள் உள்ளன. மொத்தம் 133 அதிகாரங்கள் உள்ளன.
              </p>
              <p>
                திருக்குறளுக்கு பல உரையாசிரியர்கள் உரை எழுதியுள்ளனர். பரிமேலழகர், மணக்குடவர், 
                காளிங்கர், பரிப்பெருமாள், பரிதியார் ஆகியோர் முக்கிய உரையாசிரியர்கள். இவர்களில் 
                பரிமேலழகர் உரை மிகவும் புகழ்பெற்றது.
              </p>
              <p>
                திருக்குறள் 80க்கும் மேற்பட்ட மொழிகளில் மொழிபெயர்க்கப்பட்டுள்ளது. இது உலகின் மிகவும் 
                மொழிபெயர்க்கப்பட்ட நூல்களில் ஒன்று. திருக்குறளை "தமிழ் வேதம்", "பொய்யாமொழி", 
                "தெய்வநூல்", "முப்பால்" என்றும் அழைப்பர்.
              </p>
              <p>
                திருக்குறள் பல்வேறு விருதுகள் பெற்றுள்ளது. உலக அமைதி மாநாட்டில் திருக்குறள் வாசிக்கப்பட்டது. 
                ஐக்கிய நாடுகள் சபையில் திருக்குறள் மேற்கோள் காட்டப்பட்டுள்ளது. தமிழ் இலக்கியத்தின் மிக 
                முக்கியமான படைப்புகளில் ஒன்றாக இது கருதப்படுகிறது.
              </p>
            </div>
          </div>
        </Card>

        {/* Search Adigaram */}
        <Card className="mb-6 p-6 animate-slide-up max-w-2xl mx-auto" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="தேடுக அதிகாரம்..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* 20 Adigaram with View/Download */}
        <Card className="p-6 max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-2xl font-bold text-primary mb-4 text-center">அறத்துப்பால் - முதல் 20 அதிகாரங்கள்</h3>
          <p className="text-center text-muted-foreground mb-4">
            ஒவ்வொரு அதிகாரத்திலும் 10 குறள்கள் உள்ளன
          </p>
          <ScrollArea className="h-[500px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredAdigaram.map((adigaram) => (
                <div 
                  key={adigaram.id} 
                  className="p-4 bg-muted rounded-lg hover:bg-primary/10 border-2 border-transparent hover:border-primary transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center shadow-soft flex-shrink-0">
                        <span className="text-sm font-bold text-primary-foreground">{adigaram.id}</span>
                      </div>
                      <p className="font-semibold text-foreground">{adigaram.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleView(adigaram)}
                        className="h-8 w-8 p-0"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownload(adigaram)}
                        className="h-8 w-8 p-0"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Three Pals Info */}
        <Card className="mt-6 p-6 max-w-5xl mx-auto bg-gradient-primary text-primary-foreground animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-xl font-bold mb-3">📚 திருக்குறள் முப்பால்</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-primary-foreground/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">அறத்துப்பால்</h4>
              <p className="text-sm">38 அதிகாரங்கள் • 380 குறள்கள்</p>
              <p className="text-xs mt-1">நீதி, ஒழுக்கம், அறம் பற்றியது</p>
            </div>
            <div className="bg-primary-foreground/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">பொருட்பால்</h4>
              <p className="text-sm">70 அதிகாரங்கள் • 700 குறள்கள்</p>
              <p className="text-xs mt-1">அரசியல், பொருளாதாரம் பற்றியது</p>
            </div>
            <div className="bg-primary-foreground/10 p-4 rounded-lg">
              <h4 className="font-bold mb-2">காமத்துப்பால்</h4>
              <p className="text-sm">25 அதிகாரங்கள் • 250 குறள்கள்</p>
              <p className="text-xs mt-1">காதல், இல்லற வாழ்க்கை பற்றியது</p>
            </div>
          </div>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tirukural;