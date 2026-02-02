/**
 * Supabase Client - DISABLED
 * This application uses MongoDB backend only
 */

// Dummy client to prevent import errors
export const supabase = {
    auth: {
        signUp: async () => ({ data: null, error: new Error('Supabase disabled') }),
        signInWithPassword: async () => ({ data: null, error: new Error('Supabase disabled') }),
        signOut: async () => ({ error: new Error('Supabase disabled') }),
        getUser: async () => ({ data: { user: null }, error: new Error('Supabase disabled') }),
    },
    from: () => ({
        select: () => ({
            eq: () => ({
                maybeSingle: async () => ({ data: null, error: new Error('Supabase disabled') }),
            }),
        }),
    }),
};
