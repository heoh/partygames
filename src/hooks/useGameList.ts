import { games } from '@/models/Game';
import { useBasename } from './useBasename';

export function useGameList() {
  const basename = useBasename();
  return games.map(game => ({
    ...game,
    imageUrl: game.imageUrl.startsWith('/') ? `${basename}${game.imageUrl}` : game.imageUrl,
  }));
}
