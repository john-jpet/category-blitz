import { useState } from 'react';
import type { Category } from '../lib/categories';
import { CATEGORIES } from '../lib/categories';

const CATEGORY_META: Record<Category, { icon: string; short: string; desc: string }> = {
  'US States':                    { icon: '🗺️',  short: 'US States',       desc: 'All 50 states' },
  'Countries of the World':       { icon: '🌍',  short: 'Countries',        desc: '195 nations' },
  'Fruits':                       { icon: '🍎',  short: 'Fruits',           desc: 'Any fruit you know' },
  'Sports':                       { icon: '⚽',  short: 'Sports',           desc: 'All sports' },
  'Animals':                      { icon: '🦁',  short: 'Animals',          desc: 'Any creature' },
  'Software Engineering Students':{ icon: '💻',  short: 'SE Students',      desc: 'Name your cohort' },
};

interface Props {
  onSelectCategory: (category: Category) => void;
  onViewLeaderboard: (category: Category) => void;
}

export function UsernameScreen({ onSelectCategory, onViewLeaderboard }: Props) {
  const [hovered, setHovered] = useState<Category | null>(null);

  return (
    <div className="screen home-screen">
      <div className="home-card">

        <header className="masthead">
          <h1 className="logo-title">
            Category<br />
            <span className="accent">Blitz</span>
          </h1>
          <p className="logo-tagline">Name as many as you can — 60 seconds on the clock</p>
        </header>

        <div className="category-section">
          <p className="section-label">Choose a category to begin</p>
          <div className="category-grid">
            {CATEGORIES.map((cat, i) => {
              const meta = CATEGORY_META[cat];
              return (
                <div
                  key={cat}
                  className="cat-tile-wrap"
                  style={{ animationDelay: `${0.06 + i * 0.07}s` }}
                >
                  <button
                    type="button"
                    className={`cat-tile${hovered === cat ? ' cat-tile--hovered' : ''}`}
                    onClick={() => onSelectCategory(cat)}
                    onMouseEnter={() => setHovered(cat)}
                    onMouseLeave={() => setHovered(null)}
                    aria-label={`Play ${cat}`}
                  >
                    <span className="cat-tile-icon" aria-hidden="true">{meta.icon}</span>
                    <span className="cat-tile-body">
                      <span className="cat-tile-name">{meta.short}</span>
                      <span className="cat-tile-desc">{meta.desc}</span>
                    </span>
                    <span className="cat-tile-arrow" aria-hidden="true">→</span>
                  </button>
                  <button
                    type="button"
                    className="cat-scores-btn"
                    onClick={() => onViewLeaderboard(cat)}
                    aria-label={`View leaderboard for ${cat}`}
                  >
                    🏆 Scores
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
