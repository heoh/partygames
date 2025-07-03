import type { Game } from '@/models/Game';
import { useBasename } from './useBasename';

export function useGameList() {
  const basename = useBasename();
  const games: Game[] = [
    {
      id: 'mind_match',
      name: '통했어!',
      imageUrl: `${basename}/images/game_mind_match.png`,
    },
    {
      id: 'game1',
      name: '게임1',
      imageUrl: 'https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp',
    },
    {
      id: 'game2',
      name: '게임2',
      imageUrl: 'https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp',
    },
  ];
  return games;
}
