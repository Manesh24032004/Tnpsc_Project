import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, FileText, GraduationCap, BookMarked, Users, 
  Brain, Bot, Edit, Settings, ArrowRight, Scroll
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ContentModulesProps {
  fileCounts: {
    syllabus: number;
    books: number;
    papers: number;
    notes: number;
    tirukural: number;
    tamilScholars: number;
  };
  onManageClick: (category: string) => void;
}

export const ContentModules = ({ fileCounts, onManageClick }: ContentModulesProps) => {
  const modules = [
    {
      title: 'TNPSC Wizard AI',
      description: 'AI Study Assistant',
      icon: Bot,
      href: '/ai-chat',
      gradient: 'from-violet-500 to-purple-600',
      adminAction: 'Configure AI',
    },
    {
      title: 'G1 Syllabus',
      description: 'Prelims & Mains',
      icon: BookOpen,
      href: '/syllabus/g1',
      count: fileCounts.syllabus,
      category: 'Syllabus',
    },
    {
      title: 'G2 Syllabus',
      description: 'Prelims & Mains',
      icon: BookOpen,
      href: '/syllabus/g2',
      count: fileCounts.syllabus,
      category: 'Syllabus',
    },
    {
      title: 'G4 Syllabus',
      description: 'Prelims Paper',
      icon: BookOpen,
      href: '/syllabus/g4',
      count: fileCounts.syllabus,
      category: 'Syllabus',
    },
    {
      title: 'திருக்குறள்',
      description: 'Tirukural PDFs',
      icon: Scroll,
      href: '/tirukural',
      count: fileCounts.tirukural,
      category: 'Tirukural',
    },
    {
      title: 'Tamil Scholars',
      description: 'தமிழ் அறிஞர்கள்',
      icon: Users,
      href: '/poets',
      count: fileCounts.tamilScholars,
      category: 'Tamil Scholars',
    },
    {
      title: 'Previous Papers',
      description: '2015-2025',
      icon: FileText,
      href: '/previous-papers',
      count: fileCounts.papers,
      category: 'Previous Papers',
    },
    {
      title: 'School Books',
      description: '6th to 12th',
      icon: GraduationCap,
      href: '/books/standards',
      count: fileCounts.books,
      category: 'School Books',
    },
    {
      title: 'Study Notes',
      description: 'Complete Notes',
      icon: BookMarked,
      href: '/notes',
      count: fileCounts.notes,
      category: 'Study Notes',
    },
    {
      title: 'TNPSC Quiz',
      description: 'Tamil | GS | Maths',
      icon: Brain,
      href: '/quiz',
      gradient: 'from-orange-500 to-red-500',
      adminAction: 'Manage Questions',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Content Modules</h2>
        <p className="text-sm text-muted-foreground">
          Quick access to all user-facing content with admin controls
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card 
              key={module.title}
              className={`p-4 relative overflow-hidden ${
                module.gradient ? `bg-gradient-to-br ${module.gradient} text-white` : ''
              }`}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    module.gradient ? 'bg-white/20' : 'bg-primary/10'
                  }`}>
                    <Icon className={`h-5 w-5 ${module.gradient ? 'text-white' : 'text-primary'}`} />
                  </div>
                  {module.count !== undefined && (
                    <Badge variant="secondary" className="text-xs">
                      {module.count} files
                    </Badge>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className={`font-bold ${module.gradient ? 'text-white' : ''}`}>
                    {module.title}
                  </h3>
                  <p className={`text-sm ${
                    module.gradient ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                    {module.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Link to={module.href} className="flex-1">
                    <Button 
                      variant={module.gradient ? 'secondary' : 'outline'} 
                      size="sm" 
                      className="w-full"
                    >
                      View
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                  {module.category ? (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => onManageClick(module.category!)}
                      className={module.gradient ? 'text-white hover:bg-white/20' : ''}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : module.adminAction ? (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={module.gradient ? 'text-white hover:bg-white/20' : ''}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  ) : null}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
