import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, Trash2, Eye, Edit, Upload, Plus, BookOpen,
  FileCheck, Clock
} from 'lucide-react';
import { FileItem } from '@/types/admin';

interface SyllabusManagerProps {
  files: FileItem[];
  onView: (file: FileItem) => void;
  onEdit: (file: FileItem) => void;
  onDelete: (file: FileItem) => void;
  onUploadClick: (category: string, subcategory: string) => void;
  formatDate: (dateStr: string) => string;
}

const syllabusGroups = [
  { 
    id: 'G1', 
    title: 'Group 1', 
    description: 'CCSE Group 1 Services',
    subcategories: ['G1-Prelims', 'G1-Mains'] 
  },
  { 
    id: 'G2', 
    title: 'Group 2', 
    description: 'CCSE Group 2 Services',
    subcategories: ['G2-Prelims', 'G2-Mains'] 
  },
  { 
    id: 'G2A', 
    title: 'Group 2A', 
    description: 'CCSE Group 2A Services',
    subcategories: ['G2A-Prelims', 'G2A-Mains'] 
  },
  { 
    id: 'G4', 
    title: 'Group 4', 
    description: 'Combined Civil Services Exam',
    subcategories: ['G4-Prelims'] 
  },
];

export const SyllabusManager = ({
  files,
  onView,
  onEdit,
  onDelete,
  onUploadClick,
  formatDate,
}: SyllabusManagerProps) => {
  const [activeGroup, setActiveGroup] = useState('G1');

  const getSyllabusFiles = (subcategory: string) => {
    return files.filter(f => 
      f.category === 'Syllabus' && 
      f.subcategory === subcategory
    );
  };

  const currentGroup = syllabusGroups.find(g => g.id === activeGroup);

  return (
    <Card className="p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Syllabus Management</h2>
            <p className="text-sm text-muted-foreground">Manage exam-wise syllabus documents</p>
          </div>
        </div>
      </div>

      <Tabs value={activeGroup} onValueChange={setActiveGroup}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {syllabusGroups.map(group => (
            <TabsTrigger key={group.id} value={group.id} className="text-xs sm:text-sm">
              {group.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {syllabusGroups.map(group => (
          <TabsContent key={group.id} value={group.id}>
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold">{group.title} - {group.description}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Sections: {group.subcategories.join(', ')}
                </p>
              </div>

              {group.subcategories.map(subcategory => {
                const subcatFiles = getSyllabusFiles(subcategory);
                return (
                  <div key={subcategory} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">{subcategory}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {subcatFiles.length} files
                        </Badge>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => onUploadClick('Syllabus', subcategory)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>

                    {subcatFiles.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No syllabus uploaded for this section
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {subcatFiles.map(file => (
                          <div 
                            key={file.id}
                            className="flex items-center justify-between p-3 bg-background rounded-lg border"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                              <div className="min-w-0">
                                <p className="font-medium text-sm truncate">{file.title}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{formatDate(file.created_at)}</span>
                                  {file.version && (
                                    <Badge variant="outline" className="text-xs">v{file.version}</Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="ghost" onClick={() => onView(file)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => onEdit(file)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => onDelete(file)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};
