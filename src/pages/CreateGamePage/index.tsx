import PageHeader from '@/components/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { useGameList, type Game } from '@/hooks/useGameList';
import { closeActiveDropdown } from '@/shared/util';
import GameSelector from './GameSelector';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';

interface FormInput {}

export default function CreateGamePage() {
  const { handleSubmit } = useForm<FormInput>();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const games = useGameList();
  const [game, setGame] = useState<Game | undefined>();
  const handleGoHome = () => {
    navigate('/');
  };
  const handleSignOut = () => {
    closeActiveDropdown();
    signOut();
  };
  const onSubmit: SubmitHandler<FormInput> = () => {
    alert(game?.id);
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
            <h1 className="text-5xl font-bold">Partygames</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-6">
                <GameSelector games={games} onChange={setGame} />
              </div>
              <button className="btn btn-primary">방 만들기</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
