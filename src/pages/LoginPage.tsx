import GoogleLoginButton from '@/components/GoogleLoginButton';
import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, user, signInWithGoogle } = useAuth();
  const searchParams = new URLSearchParams(location.search);
  const redirectTo = searchParams.get('redirectTo') ?? '/';

  useEffect(() => {
    if (!loading && user) {
      navigate(redirectTo ?? '/', { replace: true });
    }
  }, [loading, user]);

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle({ redirectTo });
  }

  return (
    <div className="hero bg-base-200 min-h-svh">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">사용자 인증</h1>
          <p className="py-6">
            <GoogleLoginButton onClick={handleSignInWithGoogle} />
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
