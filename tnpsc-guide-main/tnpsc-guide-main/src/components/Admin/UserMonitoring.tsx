import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, Download, Eye, TrendingUp, FileText, 
  Clock, BarChart3, Activity
} from 'lucide-react';
import { FileItem } from '@/types/admin';

interface UserMonitoringProps {
  stats: {
    totalVisitors: number;
    totalDownloads: number;
    totalUsers: number;
    totalUploads: number;
    syllabusDownloads: number;
    booksDownloads: number;
    papersDownloads: number;
    notesDownloads: number;
  };
  files: FileItem[];
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'download' | 'upload' | 'view' | 'login';
  description: string;
  timestamp: string;
  user?: string;
}

export const UserMonitoring = ({ stats, files, recentActivity }: UserMonitoringProps) => {
  const topDownloaded = [...files]
    .sort((a, b) => b.download_count - a.download_count)
    .slice(0, 5);

  const topViewed = [...files]
    .sort((a, b) => (b.view_count || 0) - (a.view_count || 0))
    .slice(0, 5);

  const categoryBreakdown = [
    { name: 'Syllabus', count: stats.syllabusDownloads, color: 'bg-purple-500' },
    { name: 'Books', count: stats.booksDownloads, color: 'bg-orange-500' },
    { name: 'Previous Papers', count: stats.papersDownloads, color: 'bg-red-500' },
    { name: 'Notes', count: stats.notesDownloads, color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Activity Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Registered Users</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Downloads</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalVisitors.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Page Visits</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats.totalUploads}</p>
              <p className="text-sm text-muted-foreground">Files Uploaded</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Downloads by Category */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Downloads by Category</h3>
          </div>
          <div className="space-y-4">
            {categoryBreakdown.map(item => (
              <div key={item.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="font-medium">{item.count}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ 
                      width: `${Math.min((item.count / Math.max(stats.totalDownloads, 1)) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Downloaded Files */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Download className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Most Downloaded</h3>
          </div>
          <div className="space-y-3">
            {topDownloaded.map((file, index) => (
              <div key={file.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{file.title}</p>
                  <p className="text-xs text-muted-foreground">{file.category}</p>
                </div>
                <Badge variant="secondary">{file.download_count}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Most Viewed Files */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Most Viewed</h3>
          </div>
          <div className="space-y-3">
            {topViewed.map((file, index) => (
              <div key={file.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-sm font-bold text-purple-600 dark:text-purple-400">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{file.title}</p>
                  <p className="text-xs text-muted-foreground">{file.category}</p>
                </div>
                <Badge variant="outline">{file.view_count || 0} views</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No recent activity</p>
            ) : (
              recentActivity.map(activity => (
                <div key={activity.id} className="flex items-start gap-3 p-2 border-l-2 border-primary/30 pl-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3" />
                      <span>{activity.timestamp}</span>
                      {activity.user && <span>• {activity.user}</span>}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
