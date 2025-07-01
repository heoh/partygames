import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { supabase } from '@/shared/supabase';
import type { Session, User, AuthError } from '@supabase/supabase-js';

type SignInOptions = {
  redirectTo?: string;
};

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: AuthError | null;
  signInWithGoogle: (args: SignInOptions) => void;
  signOut: () => void;
}

export const AUTH_CALLBACK_PATH = '/auth/callback';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>');
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async ({ redirectTo }: SignInOptions) => {
    const basename = window.location.pathname.replace(location.pathname, '');
    const fullRedirectUrl = new URL(`${basename}${AUTH_CALLBACK_PATH}`, window.location.origin);
    if (redirectTo) {
      fullRedirectUrl.searchParams.set('redirectTo', redirectTo);
    }
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: fullRedirectUrl.toString(),
      },
    });
    if (error) {
      setError(error);
      console.error('Login error:', error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setError(error);
      console.error('Logout error:', error.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    init();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        error,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthCallback() {
  const { loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectTo = params.get('redirectTo') || '/';

    if (!loading) {
      navigate(redirectTo, { replace: true });
    }
  }, [loading, location]);

  return <div />;
}
