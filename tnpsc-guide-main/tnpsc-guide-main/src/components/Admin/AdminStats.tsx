import { Card } from '@/components/ui/card';
import { 
  Users, Download, FileCheck, BookOpen, FileText, 
  TrendingUp, Eye, Upload, Scroll, GraduationCap
} from 'lucide-react';

interface StatsData {
  totalVisitors: number;
  totalDownloads: number;
  totalUploads: number;
  totalUsers: number;
  syllabusDownloads: number;
  booksDownloads: number;
  papersDownloads: number;
  notesDownloads: number;
  tirukuralDownloads?: number;
  tamilScholarsDownloads?: number;
}

interface AdminStatsProps {
  stats: StatsData;
}

export const AdminStats = ({ stats }: AdminStatsProps) => {
  const statCards = [
    { label: 'Total Visitors', value: stats.totalVisitors, icon: Eye, bgColor: 'bg-blue-100 dark:bg-blue-900', iconColor: 'text-blue-600 dark:text-blue-400' },
    { label: 'Registered Users', value: stats.totalUsers, icon: Users, bgColor: 'bg-indigo-100 dark:bg-indigo-900', iconColor: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'Total Downloads', value: stats.totalDownloads, icon: Download, bgColor: 'bg-green-100 dark:bg-green-900', iconColor: 'text-green-600 dark:text-green-400' },
    { label: 'Total Uploads', value: stats.totalUploads, icon: Upload, bgColor: 'bg-cyan-100 dark:bg-cyan-900', iconColor: 'text-cyan-600 dark:text-cyan-400' },
    { label: 'Syllabus', value: stats.syllabusDownloads, icon: FileCheck, bgColor: 'bg-purple-100 dark:bg-purple-900', iconColor: 'text-purple-600 dark:text-purple-400' },
    { label: 'Books', value: stats.booksDownloads, icon: GraduationCap, bgColor: 'bg-orange-100 dark:bg-orange-900', iconColor: 'text-orange-600 dark:text-orange-400' },
    { label: 'Papers', value: stats.papersDownloads, icon: FileText, bgColor: 'bg-red-100 dark:bg-red-900', iconColor: 'text-red-600 dark:text-red-400' },
    { label: 'Notes', value: stats.notesDownloads, icon: TrendingUp, bgColor: 'bg-teal-100 dark:bg-teal-900', iconColor: 'text-teal-600 dark:text-teal-400' },
    { label: 'Tirukural', value: stats.tirukuralDownloads || 0, icon: Scroll, bgColor: 'bg-amber-100 dark:bg-amber-900', iconColor: 'text-amber-600 dark:text-amber-400' },
    { label: 'Scholars', value: stats.tamilScholarsDownloads || 0, icon: BookOpen, bgColor: 'bg-rose-100 dark:bg-rose-900', iconColor: 'text-rose-600 dark:text-rose-400' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label} className="p-3">
            <div className="flex flex-col items-center text-center gap-2">
              <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                <Icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-lg font-bold">{stat.value.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
