import PageHeader from '@/components/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { closeActiveDropdown } from '@/shared/util';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const handleCreateGame = () => {
    navigate('/create');
  };
  const handleSignIn = () => {
    navigate('/login');
  };
  const handleSignOut = () => {
    closeActiveDropdown();
    signOut();
  };
  const handleEnter = () => {
    navigate('/join');
  };

  return (
    <div>
      <PageHeader
        menu={[
          { text: '게임 생성', onClick: handleCreateGame },
          ...(user ? [{ text: '로그아웃', onClick: handleSignOut }] : []),
          ...(!user ? [{ text: '로그인', onClick: handleSignIn }] : []),
        ]}
      />
      <div className="hero bg-base-200 min-h-svh">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Partygames</h1>
            <p className="py-6">
              <input type="text" placeholder="게임 PIN" className="input input-lg text-center" />
            </p>
            <button className="btn btn-primary" onClick={handleEnter}>
              입장하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
