/**
 * useImages Hook
 * 
 * Manages image uploads to the 'images' storage bucket.
 * Supports: Logos, Tamil Scholars, Book Covers, Poets, Standards, Subjects, etc.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface ImageRecord {
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

export const useImages = () => {
  const [images, setImages] = useState<ImageRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all images from storage bucket
  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // List all files in the images bucket
      const { data: files, error: listError } = await supabase.storage
        .from('images')
        .list('', { 
          limit: 500,
          sortBy: { column: 'created_at', order: 'desc' }
        });
      
      if (listError) throw listError;

      // Get nested folder contents
      const allImages: ImageRecord[] = [];
      
      // Process root level files
      for (const file of files || []) {
        if (file.id && !file.name.endsWith('/')) {
          const { data: { publicUrl } } = supabase.storage
            .from('images')
            .getPublicUrl(file.name);
            
          // Parse metadata from filename pattern: category_subcategory_title.ext
          const parts = file.name.split('_');
          const category = parts[0] || 'General';
          const subcategory = parts[1] || '';
          const title = parts.slice(2).join('_').replace(/\.[^/.]+$/, '') || file.name;
          
          allImages.push({
            id: file.id,
            title,
            category,
            subcategory,
            file_name: file.name,
            file_path: file.name,
            file_size: file.metadata?.size,
            created_at: file.created_at || new Date().toISOString(),
            url: publicUrl,
          });
        }
      }

      // Also check subfolders by category
      const categories = ['logos', 'tamil-scholars', 'book-covers', 'poets', 'standards', 'subjects', 'carousel', 'general'];
      
      for (const category of categories) {
        const { data: categoryFiles } = await supabase.storage
          .from('images')
          .list(category, { limit: 100 });
          
        if (categoryFiles) {
          for (const file of categoryFiles) {
            if (file.id && !file.name.endsWith('/')) {
              const filePath = `${category}/${file.name}`;
              const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);
                
              allImages.push({
                id: file.id,
                title: file.name.replace(/\.[^/.]+$/, ''),
                category: category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' '),
                file_name: file.name,
                file_path: filePath,
                file_size: file.metadata?.size,
                created_at: file.created_at || new Date().toISOString(),
                url: publicUrl,
              });
            }
          }
        }
      }

      setImages(allImages);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to load images');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Upload image to storage
  const uploadImage = async (
    file: File,
    title: string,
    description: string,
    category: string,
    subcategory: string
  ) => {
    try {
      // Create folder path based on category
      const categoryFolder = category.toLowerCase().replace(' ', '-');
      const timestamp = Date.now();
      const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const ext = file.name.split('.').pop();
      const filePath = `${categoryFolder}/${sanitizedTitle}-${timestamp}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      toast({
        title: "Success",
        description: `Image "${title}" uploaded successfully`,
      });

      await fetchImages();
      return publicUrl;
    } catch (err) {
      console.error('Upload error:', err);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Delete image from storage
  const deleteImage = async (filePath: string) => {
    try {
      const { error } = await supabase.storage
        .from('images')
        .remove([filePath]);

      if (error) throw error;

      toast({
        title: "Deleted",
        description: "Image deleted successfully",
      });

      await fetchImages();
    } catch (err) {
      console.error('Delete error:', err);
      toast({
        title: "Error",
        description: "Failed to delete image",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Get public URL for an image
  const getImageUrl = (filePath: string) => {
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);
    return publicUrl;
  };

  return {
    images,
    loading,
    error,
    uploadImage,
    deleteImage,
    getImageUrl,
    refetch: fetchImages,
  };
};
