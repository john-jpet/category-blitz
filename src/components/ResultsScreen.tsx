import type { Category } from '../lib/categories';

interface Props {
  category: Category;
  score: number;
  onPlayAgain: () => void;
}

export function ResultsScreen({ category, score, onPlayAgain }: Props) {
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

        <p className="results-message">Nice run. Ready to chase a different category?</p>
        <button className="btn btn-primary btn-wide" onClick={onPlayAgain}>
          Play Again
        </button>

      </div>
    </div>
  );
}
