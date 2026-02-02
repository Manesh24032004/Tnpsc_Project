/**
 * Image Uploader Component
 * 
 * For uploading images: logos, Tamil scholars photos, book covers, etc.
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ImagePlus, Upload, X, Image as ImageIcon } from 'lucide-react';

export interface ImageUploadFormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
}

interface ImageUploaderProps {
  onUpload: (files: File[], formData: ImageUploadFormData) => Promise<void>;
  isUploading: boolean;
}

const IMAGE_CATEGORIES = [
  'Logos',
  'Tamil Scholars',
  'Book Covers',
  'Poets',
  'Standards',
  'Subjects',
  'Carousel',
  'General'
];

const IMAGE_SUBCATEGORIES: Record<string, string[]> = {
  'Logos': ['Main Logo', 'Favicon', 'Social Media'],
  'Tamil Scholars': [
    'பாரதியார்', 'பாரதிதாசன்', 'உ. வே. சாமிநாதர்',
    'தெ. பொ. மீனாட்சிசுந்தரம்', 'சி. இலக்குவனார்', 'ஜி. யு. போப்',
    'தேவநேய பவானர்', 'பாவலரேறு பெருஞ்சித்திரனார்', 'வீரமாமுனிவர்',
    'கண்ணதாசன்', 'திருவள்ளுவர்', 'நம்மக்கல் கவிஞர்', 'Other'
  ],
  'Book Covers': ['Tamil', 'English', 'Maths', 'Science', 'Social', 'Economics', 'History'],
  'Poets': ['பாரதியார்', 'பாரதிதாசன்', 'கண்ணதாசன்', 'திருவள்ளுவர்', 'நம்மக்கல் கவிஞர்', 'Other'],
  'Standards': ['6th', '7th', '8th', '9th', '10th', '11th', '12th'],
  'Subjects': ['Tamil', 'English', 'Maths', 'Science', 'Social', 'History', 'Economics', 'Political Science'],
  'Carousel': ['Homepage', 'About', 'Features'],
  'General': ['Backgrounds', 'Icons', 'Thumbnails']
};

export const ImageUploader = ({
  onUpload,
  isUploading,
}: ImageUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadForm, setUploadForm] = useState<ImageUploadFormData>({
    title: '',
    description: '',
    category: '',
    subcategory: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0 || !uploadForm.title || !uploadForm.category) return;
    
    await onUpload(selectedFiles, uploadForm);
    setSelectedFiles([]);
    setPreviews([]);
    setUploadForm({ title: '', description: '', category: '', subcategory: '' });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    setSelectedFiles(prev => [...prev, ...imageFiles]);
    
    // Create preview URLs
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Card className="p-4 sm:p-6">
      <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <ImagePlus className="h-5 w-5 text-primary" />
        Upload Images
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="image-title">Title *</Label>
          <Input
            id="image-title"
            value={uploadForm.title}
            onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
            placeholder="Enter image title (e.g., Bharathiyar Portrait)"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image-description">Description</Label>
          <Textarea
            id="image-description"
            value={uploadForm.description}
            onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
            placeholder="Enter image description"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select
              value={uploadForm.category}
              onValueChange={(v) => setUploadForm({ ...uploadForm, category: v, subcategory: '' })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {IMAGE_CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Subcategory</Label>
            <Select
              value={uploadForm.subcategory}
              onValueChange={(v) => setUploadForm({ ...uploadForm, subcategory: v })}
              disabled={!uploadForm.category}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {uploadForm.category && IMAGE_SUBCATEGORIES[uploadForm.category]?.map(sub => (
                  <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Images *</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 hover:border-primary/50 transition-colors">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
            <label htmlFor="image-upload" className="cursor-pointer block text-center">
              <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Click to select images or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">
                JPG, PNG, WEBP, GIF (max 10MB each)
              </p>
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <Label>Selected Images ({selectedFiles.length})</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                      {previews[index] && (
                        <img 
                          src={previews[index]} 
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="mt-1 text-xs truncate">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{formatFileSize(file.size)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button type="submit" disabled={isUploading || selectedFiles.length === 0} className="w-full sm:w-auto">
          {isUploading ? (
            'Uploading...'
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Upload {selectedFiles.length > 1 ? `${selectedFiles.length} Images` : 'Image'}
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
