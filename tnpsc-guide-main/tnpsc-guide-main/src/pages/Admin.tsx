/**
 * Admin Dashboard
 * 
 * Comprehensive admin panel with:
 * - Content management (view, upload, edit, delete)
 * - Syllabus management by group
 * - Image management (logos, Tamil scholars, book covers)
 * - User & activity monitoring
 * - File categorization and control
 * - Demo mode support
 */

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useDocuments } from '@/hooks/useDocuments';
import { useImages } from '@/hooks/useImages';
import {
  LayoutDashboard, FileText, Upload, BookOpen,
  BarChart3, Users, FolderOpen, ImageIcon
} from 'lucide-react';

// Admin Components
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminStats } from '@/components/Admin/AdminStats';
import { FileManager } from '@/components/Admin/FileManager';
import { FileUploader, UploadFormData } from '@/components/Admin/FileUploader';
import { ImageUploader, ImageUploadFormData } from '@/components/Admin/ImageUploader';
import { ImageManager, ImageItem } from '@/components/Admin/ImageManager';
import { SyllabusManager } from '@/components/Admin/SyllabusManager';
import { UserMonitoring, ActivityItem } from '@/components/Admin/UserMonitoring';
import { ContentModules } from '@/components/Admin/ContentModules';

// Hooks
import { useAdminUsers } from '@/hooks/useAdminUsers';

// Types and Demo Data
import {
  FileItem, AdminStats as AdminStatsType,
  CATEGORIES, SUBCATEGORIES
} from '@/types/admin';
import { MONGODB_API_URL } from '@/services/api/config';

const Admin = () => {
  const { isDemoMode } = useAuth();
  const { documents, uploadDocument, updateDocument, deleteDocument, getPublicUrl, refetch } = useDocuments();
  const { images, uploadImage, deleteImage, getImageUrl, refetch: refetchImages } = useImages();
  const { users } = useAdminUsers();

  // State
  const [files, setFiles] = useState<FileItem[]>([]);
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  const [stats, setStats] = useState<AdminStatsType>({
    totalVisitors: 0,
    totalDownloads: 0,
    totalUploads: 0,
    totalUsers: 0,
    syllabusDownloads: 0,
    booksDownloads: 0,
    papersDownloads: 0,
    notesDownloads: 0,
    tirukuralDownloads: 0,
    tamilScholarsDownloads: 0,
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Dialog states
  const [editFile, setEditFile] = useState<FileItem | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [deleteFile, setDeleteFile] = useState<FileItem | null>(null);
  const [deleteImageItem, setDeleteImageItem] = useState<ImageItem | null>(null);
  const [uploadPreset, setUploadPreset] = useState<{ category: string; subcategory: string } | null>(null);

  // Load data from backend
  useEffect(() => {
    if (documents) {
      const mappedFiles: FileItem[] = documents.map(doc => ({
        id: doc.id,
        title: doc.title,
        description: doc.description || '',
        category: doc.category,
        subcategory: doc.subcategory || '',
        file_name: doc.file_name,
        file_path: doc.file_path,
        download_count: doc.download_count || 0,
        view_count: Math.floor((doc.download_count || 0) * 1.8),
        created_at: doc.created_at,
        file_size: doc.file_size || 0,
        isVisible: true,
      }));
      setFiles(mappedFiles);
    }

    // Fetch real stats from the backend
    const fetchStats = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`${MONGODB_API_URL}/admin/stats`, {
          headers: { 'user-id': userId || '' },
        });
        const data = await response.json();
        if (data.success && data.data) {
          setStats({
            totalVisitors: data.data.totalVisitors || 0,
            totalDownloads: data.data.totalDownloads || 0,
            totalUploads: data.data.totalUploads || (documents ? documents.length : 0),
            totalUsers: data.data.totalUsers || 0,
            syllabusDownloads: data.data.syllabusDownloads || 0,
            booksDownloads: data.data.booksDownloads || 0,
            papersDownloads: data.data.papersDownloads || 0,
            notesDownloads: data.data.notesDownloads || 0,
            tirukuralDownloads: data.data.tirukuralDownloads || 0,
            tamilScholarsDownloads: data.data.tamilScholarsDownloads || 0,
          });
        }
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      }
    };

    // Fetch recent activity from the backend
    const fetchActivity = async () => {
      try {
        const userId = localStorage.getItem('user_id');
        const response = await fetch(`${MONGODB_API_URL}/admin/activity`, {
          headers: { 'user-id': userId || '' },
        });
        const data = await response.json();
        if (data.success && data.data) {
          setRecentActivity(data.data.map((item: any, index: number) => ({
            id: String(index),
            type: item.type === 'user_registered' ? 'login' : 'upload',
            description: item.type === 'user_registered'
              ? `${item.user} registered`
              : item.action,
            timestamp: new Date(item.timestamp).toLocaleString(),
            user: item.user,
          })));
        }
      } catch (error) {
        console.error('Failed to fetch activity:', error);
      }
    };

    fetchStats();
    fetchActivity();

    // Set up polling for live updates
    const interval = setInterval(() => {
      fetchStats();
      fetchActivity();
    }, 30000); // Poll every 30 seconds

    return () => clearInterval(interval);
  }, [documents]);

  // Load images
  useEffect(() => {
    if (images) {
      const mappedImages: ImageItem[] = images.map(img => ({
        id: img.id,
        title: img.title,
        description: img.description,
        category: img.category,
        subcategory: img.subcategory,
        file_name: img.file_name,
        file_path: img.file_path,
        file_size: img.file_size,
        created_at: img.created_at,
        url: img.url,
      }));
      setImageList(mappedImages);
    }
  }, [images]);

  // Handlers
  const handleUpload = async (uploadedFiles: File[], formData: UploadFormData) => {
    setIsUploading(true);

    for (const file of uploadedFiles) {
      try {
        await uploadDocument(file, formData.title, formData.description, formData.category, formData.subcategory);
      } catch (error) {
        toast({ title: "Error", description: `Failed to upload ${file.name}`, variant: "destructive" });
      }
    }

    await refetch();
    toast({ title: "Success", description: `${uploadedFiles.length} file(s) uploaded successfully` });
    setIsUploading(false);
    setUploadPreset(null);
  };

  const handleView = (file: FileItem) => {
    window.open(getPublicUrl(file.file_path), '_blank');
  };

  const handleEdit = async () => {
    if (!editFile) return;

    try {
      await updateDocument(editFile.id, {
        title: editForm.title,
        description: editForm.description
      });
      await refetch();
      toast({ title: "Updated", description: "File details updated successfully" });
    } catch {
      toast({ title: "Error", description: "Failed to update file", variant: "destructive" });
    }
    setEditFile(null);
  };

  const handleDelete = async () => {
    if (!deleteFile) return;

    try {
      await deleteDocument(deleteFile as any);
      await refetch();
      toast({ title: "Deleted", description: "File deleted successfully" });
    } catch {
      toast({ title: "Error", description: "Failed to delete file", variant: "destructive" });
    }
    setDeleteFile(null);
  };

  const handleToggleVisibility = (file: FileItem) => {
    setFiles(prev => prev.map(f =>
      f.id === file.id ? { ...f, isVisible: !f.isVisible } : f
    ));
    toast({
      title: file.isVisible ? "Hidden" : "Visible",
      description: `File ${file.isVisible ? 'hidden from' : 'visible to'} users`
    });
  };

  const handleUploadClick = (category: string, subcategory: string) => {
    setUploadPreset({ category, subcategory });
    setActiveTab('upload');
  };

  const handleManageCategory = (category: string) => {
    setActiveTab('files');
  };

  // Image handlers
  const handleImageUpload = async (uploadedFiles: File[], formData: ImageUploadFormData) => {
    setIsUploadingImage(true);

    for (const file of uploadedFiles) {
      try {
        await uploadImage(file, formData.title, formData.description, formData.category, formData.subcategory);
      } catch (error) {
        toast({ title: "Error", description: `Failed to upload ${file.name}`, variant: "destructive" });
      }
    }

    await refetchImages();
    toast({ title: "Success", description: `${uploadedFiles.length} image(s) uploaded successfully` });
    setIsUploadingImage(false);
  };

  const handleViewImage = (image: ImageItem) => {
    if (image.url) {
      window.open(image.url, '_blank');
    }
  };

  const handleEditImage = (image: ImageItem) => {
    toast({ title: "Info", description: "Image edit - rename by re-uploading" });
  };

  const handleDeleteImage = async () => {
    if (!deleteImageItem) return;

    try {
      await deleteImage(deleteImageItem.file_path);
      await refetchImages();
      toast({ title: "Deleted", description: "Image deleted successfully" });
    } catch {
      toast({ title: "Error", description: "Failed to delete image", variant: "destructive" });
    }
    setDeleteImageItem(null);
  };

  // Utility functions
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate file counts by category
  const fileCounts = {
    syllabus: files.filter(f => f.category === 'Syllabus').length,
    books: files.filter(f => f.category === 'School Books').length,
    papers: files.filter(f => f.category === 'Previous Papers').length,
    notes: files.filter(f => f.category === 'Study Notes').length,
    tirukural: files.filter(f => f.category === 'Tirukural').length,
    tamilScholars: files.filter(f => f.category === 'Tamil Scholars').length,
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <AdminHeader />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <AdminStats stats={stats} />

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
            <TabsTrigger value="overview" className="gap-2 data-[state=active]:bg-background">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="gap-2 data-[state=active]:bg-background">
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">All Files</span>
            </TabsTrigger>
            <TabsTrigger value="images" className="gap-2 data-[state=active]:bg-background">
              <ImageIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Images</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2 data-[state=active]:bg-background">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </TabsTrigger>
            <TabsTrigger value="syllabus" className="gap-2 data-[state=active]:bg-background">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Syllabus</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2 data-[state=active]:bg-background">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2 data-[state=active]:bg-background">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Monitoring</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab - Content Modules */}
          <TabsContent value="overview">
            <ContentModules
              fileCounts={fileCounts}
              onManageClick={handleManageCategory}
            />
          </TabsContent>

          {/* Files Tab - Centralized File Manager */}
          <TabsContent value="files">
            <FileManager
              files={files}
              categories={CATEGORIES}
              onView={handleView}
              onEdit={(file) => { setEditFile(file); setEditForm({ title: file.title, description: file.description || '' }); }}
              onDelete={setDeleteFile}
              onToggleVisibility={handleToggleVisibility}
              formatFileSize={formatFileSize}
              formatDate={formatDate}
            />
          </TabsContent>

          {/* Upload Tab - Files and Images */}
          <TabsContent value="upload" className="space-y-6">
            <FileUploader
              categories={CATEGORIES}
              subcategories={SUBCATEGORIES}
              onUpload={handleUpload}
              isUploading={isUploading}
            />
            <ImageUploader
              onUpload={handleImageUpload}
              isUploading={isUploadingImage}
            />
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images">
            <ImageManager
              images={imageList}
              onView={handleViewImage}
              onEdit={handleEditImage}
              onDelete={setDeleteImageItem}
              formatFileSize={formatFileSize}
              formatDate={formatDate}
            />
          </TabsContent>

          {/* Syllabus Tab */}
          <TabsContent value="syllabus">
            <SyllabusManager
              files={files}
              onView={handleView}
              onEdit={(file) => { setEditFile(file); setEditForm({ title: file.title, description: file.description || '' }); }}
              onDelete={setDeleteFile}
              onUploadClick={handleUploadClick}
              formatDate={formatDate}
            />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <UserMonitoring
              stats={stats}
              files={files}
              users={users}
              recentActivity={recentActivity}
              view="analytics"
            />
          </TabsContent>

          {/* User Monitoring Tab */}
          <TabsContent value="users">
            <UserMonitoring
              stats={stats}
              files={files}
              users={users}
              recentActivity={recentActivity}
              view="monitoring"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editFile} onOpenChange={() => setEditFile(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit File Details</DialogTitle>
            <DialogDescription>Update the file information below.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditFile(null)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete File Confirmation */}
      <AlertDialog open={!!deleteFile} onOpenChange={() => setDeleteFile(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteFile?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Image Confirmation */}
      <AlertDialog open={!!deleteImageItem} onOpenChange={() => setDeleteImageItem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteImageItem?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteImage} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
