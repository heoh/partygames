export type Game = {
  id: string;
  name: string;
  imageUrl: string;
};

export const games: Game[] = [
  {
    id: 'mind_match',
    name: '통했어!',
    imageUrl: '/images/game_mind_match.png',
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
