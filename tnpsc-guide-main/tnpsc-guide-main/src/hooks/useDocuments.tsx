import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export interface Document {
  id: string;
  title: string;
  description: string | null;
  category: string;
  subcategory: string | null;
  file_path: string;
  file_name: string;
  file_size: number | null;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export const useDocuments = (category?: string) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      let query = supabase.from('documents').select('*').order('created_at', { ascending: false });
      
      if (category) {
        query = query.eq('category', category);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      setDocuments(data || []);
    } catch (error: any) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Error",
        description: "Failed to load documents.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [category]);

  const uploadDocument = async (
    file: File,
    title: string,
    description: string,
    category: string,
    subcategory?: string
  ) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${category}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Insert metadata
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          title,
          description,
          category,
          subcategory,
          file_path: filePath,
          file_name: file.name,
          file_size: file.size,
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Document uploaded successfully.",
      });
      
      await fetchDocuments();
      return true;
    } catch (error: any) {
      console.error('Error uploading document:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload document.",
        variant: "destructive",
      });
      return false;
    }
  };

  const updateDocument = async (docId: string, updates: { title?: string; description?: string }) => {
    try {
      const { error } = await supabase
        .from('documents')
        .update(updates)
        .eq('id', docId);

      if (error) throw error;

      toast({
        title: "Updated",
        description: "Document updated successfully.",
      });
      
      await fetchDocuments();
      return true;
    } catch (error: any) {
      console.error('Error updating document:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update document.",
        variant: "destructive",
      });
      return false;
    }
  };

  const deleteDocument = async (doc: Document) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([doc.file_path]);

      if (storageError) throw storageError;

      // Delete metadata
      const { error: dbError } = await supabase
        .from('documents')
        .delete()
        .eq('id', doc.id);

      if (dbError) throw dbError;

      toast({
        title: "Deleted",
        description: "Document deleted successfully.",
      });
      
      await fetchDocuments();
      return true;
    } catch (error: any) {
      console.error('Error deleting document:', error);
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete document.",
        variant: "destructive",
      });
      return false;
    }
  };

  const getPublicUrl = (filePath: string) => {
    const { data } = supabase.storage.from('documents').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const incrementDownload = async (docId: string) => {
    try {
      const doc = documents.find(d => d.id === docId);
      if (doc) {
        await supabase
          .from('documents')
          .update({ download_count: doc.download_count + 1 })
          .eq('id', docId);
      }
    } catch (error) {
      console.error('Error updating download count:', error);
    }
  };

  return {
    documents,
    loading,
    uploadDocument,
    updateDocument,
    deleteDocument,
    getPublicUrl,
    incrementDownload,
    refetch: fetchDocuments,
  };
};
