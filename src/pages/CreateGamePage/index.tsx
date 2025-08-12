import PageHeader from '@/components/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { useGameTypeList } from '@/hooks/useGameTypeList';
import type { GameType } from '@/models/GameType';
import { closeActiveDropdown } from '@/shared/util';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import GameSelector from './GameSelector';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

interface FormInput {
  gameName?: string;
  observerMode: boolean;
}

export default function CreateGamePage() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<FormInput>();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const gameTypes = useGameTypeList();
  const [gameType, setGameType] = useState<GameType | undefined>();
  const handleGoHome = () => {
    navigate('/');
  };
  const handleSignOut = () => {
    closeActiveDropdown();
    signOut();
  };
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (!gameType) {
      toast.error('게임 유형을 선택하세요.');
      return;
    }
    if (!data.gameName) {
      toast.error('게임 이름을 입력하세요.');
      return;
    }

    setLoading(true);

    // try {
    //   await createGame(data.gameName, gameType?.id, host);
    //   await createPlayer(gameId, uid);
    // }
    alert(`${data.gameName} ${data.observerMode} ${gameType?.id}`);

    // setLoading(false);
  };

  return (
    <div>
      <LoadingOverlay isOpen={loading} />
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
                <GameSelector gameTypes={gameTypes} onChange={setGameType} />
                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 m-auto">
                  <input {...register('gameName')} type="text" placeholder="게임 이름" className="input" />
                  <label className="label select-none">
                    <input {...register('observerMode')} type="checkbox" className="checkbox" />
                    호스트 관전
                  </label>
                </fieldset>
              </div>
              <button className="btn btn-primary">방 만들기</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
