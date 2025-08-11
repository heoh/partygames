import { gameTypes } from '@/models/GameType';
import { useBasename } from './useBasename';

export function useGameTypeList() {
  const basename = useBasename();
  return gameTypes.map(gameType => ({
    ...gameType,
    imageUrl: gameType.imageUrl.startsWith('/') ? `${basename}${gameType.imageUrl}` : gameType.imageUrl,
  }));
}
