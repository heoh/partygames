import type { GameType } from '@/models/GameType';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';

type GameTypeSelectorProps = {
  gameTypes: GameType[];
  value?: GameType;
  onChange?: (value?: GameType) => void;
};

export default function GameSelector({ gameTypes, value, onChange }: GameTypeSelectorProps) {
  const [selection, setSelection] = useState<number>(-1);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemRefs = useMemo(() => gameTypes.map(() => createRef<HTMLDivElement>()), [gameTypes]);

  const scrollTo = (index: number) => {
    carouselRef.current?.scrollTo({ left: itemRefs.at(index)?.current?.offsetLeft });
  };
  const handleNext = () => {
    const nextIndex = (selection + 1) % gameTypes.length;
    scrollTo(nextIndex);
  };
  const handlePrev = () => {
    const prevIndex = (selection - 1 + gameTypes.length) % gameTypes.length;
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
                onChange(gameTypes.at(index));
              }
            }
          }
        });
      },
      { threshold: 0.5 }
    );
    itemRefs.forEach((ref) => observer.observe(ref.current as Element));

    return () => observer.disconnect();
  }, [gameTypes, selection]);

  useEffect(() => {
    const index = value ? gameTypes.indexOf(value) : -1;
    if (index != -1 && index != selection) {
      setSelection(index);
      scrollTo(index);
    }
  }, [gameTypes, value]);

  return (
    <div className="relative">
      <div ref={carouselRef} className="carousel rounded-box w-64 h-64">
        {gameTypes.map((gameType, i) => (
          <div key={`game${i}`} id={`game${i}`} ref={itemRefs[i]} className="carousel-item w-full">
            <img src={gameType.imageUrl} className="w-full" alt={gameType.name} />
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
