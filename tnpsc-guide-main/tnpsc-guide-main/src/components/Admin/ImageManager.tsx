/**
 * Image Manager Component
 * 
 * Displays and manages uploaded images with view, edit, delete capabilities.
 */

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Eye, Trash2, Edit2, Download, 
  ImageIcon, Grid3X3, List, ExternalLink 
} from 'lucide-react';

export interface ImageItem {
  id: string;
  title: string;
  description?: string;
  category: string;
  subcategory?: string;
  file_name: string;
  file_path: string;
  file_size?: number;
  created_at: string;
  url?: string;
}

interface ImageManagerProps {
  images: ImageItem[];
  onView: (image: ImageItem) => void;
  onEdit: (image: ImageItem) => void;
  onDelete: (image: ImageItem) => void;
  formatFileSize: (bytes?: number) => string;
  formatDate: (date: string) => string;
}

const IMAGE_CATEGORIES = [
  'All',
  'Logos',
  'Tamil Scholars',
  'Book Covers',
  'Poets',
  'Standards',
  'Subjects',
  'Carousel',
  'General'
];

export const ImageManager = ({
  images,
  onView,
  onEdit,
  onDelete,
  formatFileSize,
  formatDate,
}: ImageManagerProps) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredImages = images.filter(img => {
    const matchesSearch = img.title.toLowerCase().includes(search.toLowerCase()) ||
                         img.file_name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || img.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-primary" />
          Image Gallery ({filteredImages.length})
        </h2>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {IMAGE_CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredImages.map(image => (
            <div key={image.id} className="group relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted border">
                <img
                  src={image.url || image.file_path}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
              
              {/* Overlay with actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <Button size="icon" variant="secondary" onClick={() => onView(image)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" onClick={() => onEdit(image)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => onDelete(image)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-2">
                <p className="text-sm font-medium truncate">{image.title}</p>
                <Badge variant="outline" className="text-xs mt-1">{image.category}</Badge>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-2">
          {filteredImages.map(image => (
            <div 
              key={image.id} 
              className="flex items-center gap-4 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="h-16 w-16 rounded-lg overflow-hidden bg-muted shrink-0">
                <img
                  src={image.url || image.file_path}
                  alt={image.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{image.title}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">{image.category}</Badge>
                  {image.subcategory && (
                    <Badge variant="secondary" className="text-xs">{image.subcategory}</Badge>
                  )}
                  <span>•</span>
                  <span>{formatFileSize(image.file_size)}</span>
                  <span>•</span>
                  <span>{formatDate(image.created_at)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 shrink-0">
                <Button size="icon" variant="ghost" onClick={() => onView(image)}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" onClick={() => onEdit(image)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => onDelete(image)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No images found</p>
          <p className="text-sm">Upload images to get started</p>
        </div>
      )}
    </Card>
  );
};
