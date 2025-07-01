import PageHeader from '@/components/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { closeActiveDropdown } from '@/shared/util';
import { useNavigate } from 'react-router';

export default function CreateGamePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/');
  };
  const handleSignOut = () => {
    closeActiveDropdown();
    signOut();
  };

  return (
    <div>
      <PageHeader
        menu={[
          { text: '게임 참가', onClick: handleGoHome },
          ...(user ? [{ text: '로그아웃', onClick: handleSignOut }] : []),
        ]}
      />
      <div className="hero bg-base-200 min-h-svh">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Create Game</h1>
            <p className="py-6">
              <input type="text" placeholder="Game PIN" className="input input-lg text-center" />
            </p>
            <button className="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>
  );
}
