import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, Trash2, Eye, Download, Edit, Calendar, 
  AlertCircle, Search, EyeOff, ToggleLeft, ToggleRight
} from 'lucide-react';
import { FileItem } from '@/types/admin';

interface FileManagerProps {
  files: FileItem[];
  categories: string[];
  onView: (file: FileItem) => void;
  onEdit: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onToggleVisibility: (file: FileItem) => void;
  formatFileSize: (bytes?: number) => string;
  formatDate: (dateStr: string) => string;
}

export const FileManager = ({
  files,
  categories,
  onView,
  onEdit,
  onDelete,
  onToggleVisibility,
  formatFileSize,
  formatDate,
}: FileManagerProps) => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = files.filter(file => {
    const matchesCategory = filterCategory === 'all' || file.category === filterCategory;
    const matchesSearch = file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.subcategory?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">All Files ({files.length})</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredFiles.length === 0 ? (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No files found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredFiles.map(file => (
            <div
              key={file.id}
              className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg gap-4 ${
                file.isVisible === false ? 'bg-muted/30 opacity-75' : 'bg-muted/50'
              }`}
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium truncate">{file.title}</h3>
                    {file.isVisible === false && (
                      <Badge variant="outline" className="text-xs">Hidden</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{file.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">{file.category}</Badge>
                    {file.subcategory && <Badge variant="outline">{file.subcategory}</Badge>}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Download className="h-3 w-3" /> {file.download_count}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatDate(file.created_at)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(file.file_size)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                <Button size="sm" variant="outline" onClick={() => onView(file)} title="View">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => onEdit(file)} title="Edit">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => onToggleVisibility(file)}
                  title={file.isVisible === false ? 'Show to users' : 'Hide from users'}
                >
                  {file.isVisible === false ? <EyeOff className="h-4 w-4" /> : <ToggleRight className="h-4 w-4" />}
                </Button>
                <Button size="sm" variant="destructive" onClick={() => onDelete(file)} title="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
