import { useState, useEffect, useRef } from 'react';
import type { Category } from '../lib/categories';
import { writeScore, getTopScores } from '../lib/supabase';
import type { ScoreRow } from '../lib/supabase';

interface Props {
  category: Category;
  score: number;
  onPlayAgain: () => void;
}

type SaveState = 'idle' | 'entering' | 'saving' | 'saved';

export function ResultsScreen({ category, score, onPlayAgain }: Props) {
  const [leaderboard, setLeaderboard] = useState<ScoreRow[]>([]);
  const [leaderboardError, setLeaderboardError] = useState(false);
  const [lbLoading, setLbLoading] = useState(true);

  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [nameInput, setNameInput] = useState('');
  const [saveError, setSaveError] = useState(false);
  const [savedUsername, setSavedUsername] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);
  const hasFetched = useRef(false);

  // Fetch leaderboard on mount (read-only — no write yet)
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    getTopScores(category)
      .then(rows => setLeaderboard(rows))
      .catch(() => setLeaderboardError(true))
      .finally(() => setLbLoading(false));
  }, [category]);

  // Focus name input when entering state
  useEffect(() => {
    if (saveState === 'entering') {
      setTimeout(() => nameRef.current?.focus(), 0);
    }
  }, [saveState]);

  async function handleSaveSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;

    setSaveState('saving');
    try {
      await writeScore(trimmed, category, score);
      setSavedUsername(trimmed);
      // Refresh leaderboard to include the new score
      const rows = await getTopScores(category);
      setLeaderboard(rows);
      setSaveState('saved');
    } catch {
      setSaveError(true);
      setSaveState('entering');
    }
  }

  function isMyRow(row: ScoreRow): boolean {
    return saveState === 'saved' && row.username === savedUsername && row.score === score;
  }

  return (
    <div className="screen results-screen">
      <div className="results-card">

        {/* ── Headline ── */}
        <p className="results-headline">Time&apos;s Up</p>

        {/* ── Score ── */}
        <div className="results-score-block">
          <span className="results-score">{score}</span>
          <span className="results-score-unit">points</span>
        </div>
        <p className="results-category-line">
          Category: <strong>{category}</strong>
        </p>

        {/* ── Save / discard ── */}
        <div className="save-zone">
          {saveState === 'idle' && (
            <div className="save-prompt">
              <button
                className="btn btn-primary btn-wide"
                onClick={() => setSaveState('entering')}
              >
                Add to Leaderboard
              </button>
              <button className="btn btn-ghost btn-wide" onClick={onPlayAgain}>
                Discard &amp; Play Again
              </button>
            </div>
          )}

          {(saveState === 'entering' || saveState === 'saving') && (
            <form className="save-form" onSubmit={handleSaveSubmit}>
              <p className="section-label">Your name</p>
              <input
                ref={nameRef}
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="text-input"
                maxLength={30}
                autoComplete="off"
                spellCheck={false}
                disabled={saveState === 'saving'}
              />
              {saveError && (
                <p className="save-error-msg">Could not save — check your connection.</p>
              )}
              <div className="save-form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!nameInput.trim() || saveState === 'saving'}
                >
                  {saveState === 'saving' ? 'Saving…' : 'Submit Score'}
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => { setSaveState('idle'); setSaveError(false); }}
                  disabled={saveState === 'saving'}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {saveState === 'saved' && (
            <div className="save-success">
              <p className="save-success-msg">Score saved — good game, {savedUsername}!</p>
              <button className="btn btn-primary btn-wide" onClick={onPlayAgain}>
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* ── Leaderboard ── */}
        <section className="leaderboard">
          <h2 className="leaderboard-title">Top 10 — {category}</h2>
          {lbLoading ? (
            <p className="lb-state">Loading leaderboard…</p>
          ) : leaderboardError ? (
            <p className="lb-state lb-state--error">Leaderboard unavailable</p>
          ) : leaderboard.length === 0 ? (
            <p className="lb-state">No scores yet — be the first!</p>
          ) : (
            <ol className="lb-list">
              {leaderboard.map((row, idx) => (
                <li
                  key={row.id}
                  className={`lb-row${isMyRow(row) ? ' lb-row--mine' : ''}`}
                >
                  <span className="lb-rank">#{idx + 1}</span>
                  <span className="lb-name">{row.username}</span>
                  <span className="lb-score">{row.score}</span>
                </li>
              ))}
            </ol>
          )}
        </section>

      </div>
    </div>
  );
}
