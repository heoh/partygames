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
import { createGame, getPlayingPlayer, joinGame } from '@/models/api';

interface FormInput {
  gameName: string;
  nickname: string;
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
    if (!user) {
      toast.error('사용자를 찾을 수 없습니다. 다시 접속해주세요.');
      return;
    }
    if (!gameType) {
      toast.error('게임 유형을 선택하세요.');
      return;
    }
    if (!data.gameName) {
      toast.error('게임 이름을 입력하세요.');
      return;
    }
    if (!data.observerMode && !data.nickname) {
      toast.error('닉네임을 입력하세요.');
      return;
    }

    setLoading(true);

    try {
      const player = await getPlayingPlayer(user);
      if (player) {
        navigate(`/game?pin=${player.game_address}`, { replace: true });
        return;
      }
    } catch (e) {
      console.log(e);
      toast.error('플레이어 찾기 실패. 잠시 후 다시 시도해주세요.');
      setLoading(false);
      return;
    }

    let game;
    try {
      game = await createGame(data.gameName, gameType, user);
    } catch (e) {
      console.log(e);
      toast.error('게임 생성 실패. 잠시 후 다시 시도해주세요.');
      setLoading(false);
      return;
    }

    let player;
    try {
      player = await joinGame(user, game.address!, data.nickname);
    } catch (e) {
      console.log(e);
      toast.error('게임 참가 실패. 잠시 후 다시 시도해주세요.');
      setLoading(false);
      return;
    }

    navigate(`/game?pin=${game.address}`, { replace: true });
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
                  <input {...register('nickname')} type="text" placeholder="닉네임" className="input" />
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
