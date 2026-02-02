import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Plus, FileUp, X } from 'lucide-react';

interface FileUploaderProps {
  categories: string[];
  subcategories: Record<string, string[]>;
  onUpload: (files: File[], formData: UploadFormData) => Promise<void>;
  isUploading: boolean;
}

export interface UploadFormData {
  title: string;
  description: string;
  category: string;
  subcategory: string;
}

export const FileUploader = ({
  categories,
  subcategories,
  onUpload,
  isUploading,
}: FileUploaderProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadForm, setUploadForm] = useState<UploadFormData>({
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
    setUploadForm({ title: '', description: '', category: '', subcategory: '' });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <Card className="p-4 sm:p-6">
      <h2 className="text-lg font-semibold mb-6">Upload New Files</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={uploadForm.title}
            onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
            placeholder="Enter file title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={uploadForm.description}
            onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
            placeholder="Enter file description"
            rows={3}
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
                {categories.map(cat => (
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
                {uploadForm.category && subcategories[uploadForm.category]?.map(sub => (
                  <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Files *</Label>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.mp4,.webm"
              onChange={handleFileSelect}
              className="hidden"
              multiple
            />
            <label htmlFor="file-upload" className="cursor-pointer block text-center">
              <FileUp className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
              <p className="text-sm font-medium">Click to select files or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">
                PDF, DOC, XLS, PPT, Images, Videos
              </p>
            </label>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <Label>Selected Files ({selectedFiles.length})</Label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 min-w-0">
                      <Upload className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm truncate">{file.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0">
                        ({formatFileSize(file.size)})
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
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
              <Plus className="h-4 w-4 mr-2" />
              Upload {selectedFiles.length > 1 ? `${selectedFiles.length} Files` : 'File'}
            </>
          )}
        </Button>
      </form>
    </Card>
  );
};
