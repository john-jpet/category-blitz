import { useState, useEffect } from 'react';
import type { Category } from '../lib/categories';
import { CATEGORIES } from '../lib/categories';
import { getTopScores } from '../lib/supabase';
import type { ScoreRow } from '../lib/supabase';

const CATEGORY_META: Record<Category, { icon: string; short: string }> = {
  'US States':                    { icon: '🗺️',  short: 'US States'   },
  'Countries of the World':       { icon: '🌍',  short: 'Countries'   },
  'Fruits':                       { icon: '🍎',  short: 'Fruits'      },
  'Sports':                       { icon: '⚽',  short: 'Sports'      },
  'Animals':                      { icon: '🦁',  short: 'Animals'     },
  'Software Engineering Students':{ icon: '💻',  short: 'SE Students' },
};

interface Props {
  initialCategory: Category;
  onPlay: (category: Category) => void;
}

export function LeaderboardScreen({ initialCategory, onPlay }: Props) {
  const [active, setActive] = useState<Category>(initialCategory);
  const [rows, setRows] = useState<ScoreRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setRows([]);
    getTopScores(active)
      .then(data => setRows(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <div className="screen lb-screen">
      <div className="lb-standalone-card">

        <header className="lb-standalone-header">
          <h1 className="lb-standalone-title">Leaderboards</h1>
          <p className="lb-standalone-sub">Top 10 scores per category</p>
        </header>

        {/* Category tabs */}
        <div className="lb-tabs" role="tablist">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              className={`lb-tab${active === cat ? ' lb-tab--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              <span className="lb-tab-icon" aria-hidden="true">{CATEGORY_META[cat].icon}</span>
              <span className="lb-tab-label">{CATEGORY_META[cat].short}</span>
            </button>
          ))}
        </div>

        {/* Scores */}
        <div className="lb-standalone-body">
          {loading ? (
            <p className="lb-state">Loading…</p>
          ) : error ? (
            <p className="lb-state lb-state--error">Leaderboard unavailable</p>
          ) : rows.length === 0 ? (
            <p className="lb-state">No scores yet — be the first!</p>
          ) : (
            <ol className="lb-list">
              {rows.map((row, idx) => (
                <li key={row.id} className="lb-row">
                  <span className="lb-rank">#{idx + 1}</span>
                  <span className="lb-name">{row.username}</span>
                  <span className="lb-score">{row.score}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        {/* CTA */}
        <div className="lb-standalone-footer">
          <button className="btn btn-primary btn-wide" onClick={() => onPlay(active)}>
            Play {CATEGORY_META[active].short} →
          </button>
        </div>

      </div>
    </div>
  );
}
