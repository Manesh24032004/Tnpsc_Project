import { useState, useEffect, useCallback } from 'react';
import { MONGODB_API_URL } from '@/services/api/config';
import { User } from '@/types/admin';
import { toast } from '@/hooks/use-toast';

export const useAdminUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem('user_id');
            const response = await fetch(`${MONGODB_API_URL}/admin/users`, {
                headers: {
                    'user-id': userId || '',
                },
            });
            const data = await response.json();

            if (data.success) {
                setUsers(data.data);
                setError(null);
            } else {
                setError(data.error || 'Failed to fetch users');
                toast({
                    title: 'Error',
                    description: data.error || 'Failed to fetch users',
                    variant: 'destructive',
                });
            }
        } catch (err: any) {
            const message = err.message || 'Failed to fetch users';
            setError(message);
            toast({
                title: 'Error',
                description: message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        users,
        loading,
        error,
        refetch: fetchUsers,
    };
};
