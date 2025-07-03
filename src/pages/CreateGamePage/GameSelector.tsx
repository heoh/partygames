import type { Game } from '@/models/Game';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';

type GameSelectorProps = {
  games: Game[];
  value?: Game;
  onChange?: (value?: Game) => void;
};

export default function GameSelector({ games, value, onChange }: GameSelectorProps) {
  const [selection, setSelection] = useState<number>(-1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useMemo(() => games.map(() => createRef<HTMLDivElement>()), [games]);

  const scrollTo = (index: number) => {
    carouselRef.current?.scrollTo({ left: itemRefs.at(index)?.current?.offsetLeft });
  };
  const handleNext = () => {
    const nextIndex = (selection + 1) % games.length;
    scrollTo(nextIndex);
  };
  const handlePrev = () => {
    const prevIndex = (selection - 1 + games.length) % games.length;
    scrollTo(prevIndex);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && itemRefs) {
            const index = itemRefs.map((ref) => ref.current as Element).indexOf(entry.target as Element);
            if (index != selection) {
              setSelection(index);
              if (onChange) {
                onChange(games.at(index));
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    itemRefs.forEach((ref) => observer.observe(ref.current as Element));

    return () => observer.disconnect();
  }, [games, selection]);

  useEffect(() => {
    const index = value ? games.indexOf(value) : -1;
    if (index != -1 && index != selection) {
      setSelection(index);
      scrollTo(index);
    }
  }, [games, value]);

  return (
    <div className="relative">
      <div ref={carouselRef} className="carousel rounded-box w-64 h-64">
        {games.map((game, i) => (
          <div key={`game${i}`} id={`game${i}`} ref={itemRefs[i]} className="carousel-item w-full">
            <img src={game.imageUrl} className="w-full" alt={game.name} />
          </div>
        ))}
      </div>
      <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between">
        <a className="btn btn-circle" onClick={handlePrev}>
          ❮
        </a>
        <a className="btn btn-circle" onClick={handleNext}>
          ❯
        </a>
      </div>
    </div>
  );
}
