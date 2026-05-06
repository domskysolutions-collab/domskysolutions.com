import React from 'react';
import { Star } from 'lucide-react';

type StarRatingProps = {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
};

const FILLED = '#FB923C';
const EMPTY = '#A16207';
const GLOW = 'drop-shadow(0 0 3px rgba(251, 146, 60, 0.45))';

function clampRating(rating: number, max: number) {
  if (Number.isNaN(rating)) return 0;
  return Math.max(0, Math.min(max, rating));
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5, size = 16, className }) => {
  const safeRating = clampRating(rating, max);
  const fullCount = Math.floor(safeRating);
  const hasHalf = safeRating - fullCount >= 0.5;

  return (
    <span className={className} aria-label={`${safeRating}/${max}`}>
      {Array.from({ length: max }).map((_, i) => {
        const isFull = i < fullCount;
        const isHalf = !isFull && hasHalf && i === fullCount;

        if (isFull) {
          return (
            <Star
              key={i}
              size={size}
              color={FILLED}
              fill={FILLED}
              style={{ filter: GLOW }}
              aria-hidden
            />
          );
        }

        if (isHalf) {
          return (
            <span
              key={i}
              style={{
                position: 'relative',
                display: 'inline-flex',
                width: size,
                height: size,
              }}
              aria-hidden
            >
              <Star
                size={size}
                color={EMPTY}
                fill="transparent"
                style={{ position: 'absolute', inset: 0 }}
                aria-hidden
              />
              <span
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '50%',
                  overflow: 'hidden',
                }}
              >
                <Star size={size} color={FILLED} fill={FILLED} style={{ filter: GLOW }} aria-hidden />
              </span>
            </span>
          );
        }

        return <Star key={i} size={size} color={EMPTY} fill="transparent" aria-hidden />;
      })}
    </span>
  );
};

