import { useState, useEffect, useRef, useCallback } from 'react';
import type { Category } from '../lib/categories';
import { resolveCanonical } from '../lib/categories';
import { validateAnswer } from '../lib/validate';

interface AnswerItem {
  id: string;
  text: string;
  status: 'pending' | 'valid';
  points: number;
}

interface Props {
  category: Category;
  onGameEnd: (score: number) => void;
}

const GAME_DURATION = 60;
const TIME_BONUS = 2; // seconds refilled per correct answer (capped at GAME_DURATION)

export function GameScreen({ category, onGameEnd }: Props) {
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [inputValue, setInputValue] = useState('');
  // Only pending and valid answers are kept in state
  const [answers, setAnswers] = useState<AnswerItem[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [rejectMsg, setRejectMsg] = useState<string | null>(null);
  const [timeBonusFlash, setTimeBonusFlash] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const answersRef = useRef<AnswerItem[]>([]);
  // Keyed by CANONICAL form to catch alias dupes (usa = america = united states)
  const submittedCanonicals = useRef<Set<string>>(new Set());
  // Keyed by AI-normalised display text (lowercase) to catch "Red Fox" vs "The Red Fox"
  const submittedDisplayTexts = useRef<Set<string>>(new Set());
  const rejectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bonusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance 1.5 s after time runs out
  useEffect(() => {
    if (!gameOver) return;
    const timeout = setTimeout(() => {
      const finalScore = answersRef.current
        .filter(a => a.status === 'valid')
        .reduce((sum, a) => sum + (a.points ?? 1), 0);
      onGameEnd(isNaN(finalScore) ? 0 : finalScore);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [gameOver, onGameEnd]);

  // Keep input focused while game is live
  useEffect(() => {
    if (!gameOver) inputRef.current?.focus();
  }, [gameOver, answers]);

  function flashReject(msg: string) {
    setRejectMsg(msg);
    if (rejectTimer.current) clearTimeout(rejectTimer.current);
    rejectTimer.current = setTimeout(() => setRejectMsg(null), 1400);
  }

  function triggerBonusFlash() {
    setTimeBonusFlash(true);
    if (bonusTimer.current) clearTimeout(bonusTimer.current);
    bonusTimer.current = setTimeout(() => setTimeBonusFlash(false), 750);
  }

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = inputValue.trim();
      if (!trimmed || gameOver) return;

      setInputValue('');
      setTimeout(() => inputRef.current?.focus(), 0);

      const normalized = trimmed.toLowerCase();
      const canonical = resolveCanonical(normalized, category);
      const id = crypto.randomUUID();

      // Duplicate check — catches "USA" after "United States"
      if (submittedCanonicals.current.has(canonical)) {
        flashReject('Already counted!');
        return;
      }

      submittedCanonicals.current.add(canonical);
      setAnswers(prev => [...prev, { id, text: trimmed, status: 'pending', points: 1 }]);

      try {
        const result = await validateAnswer(trimmed, category, [...submittedDisplayTexts.current]);
        if (result.valid) {
          // Secondary dedup: catch "Red Fox" after "The Red Fox" (same AI-normalised name)
          const displayKey = result.displayText.toLowerCase();
          if (submittedDisplayTexts.current.has(displayKey)) {
            setAnswers(prev => prev.filter(a => a.id !== id));
            submittedCanonicals.current.delete(canonical);
            flashReject('Already counted!');
            return;
          }
          submittedDisplayTexts.current.add(displayKey);

          // Update text to the properly normalised display name from validation
          setAnswers(prev =>
            prev.map(a => a.id === id ? { ...a, text: result.displayText, status: 'valid', points: result.points } : a),
          );
          // Refill time a little (capped at GAME_DURATION, no-op if game already ended)
          setTimeLeft(prev => prev > 0 ? Math.min(GAME_DURATION, prev + TIME_BONUS) : 0);
          triggerBonusFlash();
        } else {
          // Remove from list; free the canonical so a correct spelling can still score
          setAnswers(prev => prev.filter(a => a.id !== id));
          submittedCanonicals.current.delete(canonical);
          flashReject('Not valid!');
        }
      } catch {
        // Fail open — unexpected error should not punish the player
        setAnswers(prev =>
          prev.map(a => a.id === id ? { ...a, text: trimmed, status: 'valid', points: 1 } : a),
        );
        setTimeLeft(prev => prev > 0 ? Math.min(GAME_DURATION, prev + TIME_BONUS) : 0);
        triggerBonusFlash();
      }
    },
    [inputValue, gameOver, category],
  );

  const score = answers.filter(a => a.status === 'valid').reduce((sum, a) => sum + (a.points ?? 1), 0);
  const timerPct = (timeLeft / GAME_DURATION) * 100;

  let timerClass = 'timer--safe';
  if (timeLeft <= 10) timerClass = 'timer--danger';
  else if (timeLeft <= 20) timerClass = 'timer--warning';

  return (
    <div className="screen game-screen">
      {/* ── Header: timer | category | score ── */}
      <header className="game-header">
        <div className={`timer ${timerClass}`} aria-label={`${timeLeft} seconds remaining`}>
          {timeLeft.toString().padStart(2, '0')}
          {timeBonusFlash && (
            <span className="time-bonus-flash" aria-hidden="true">+{TIME_BONUS}s</span>
          )}
        </div>

        <div className="category-badge">
          <span className="category-badge-label">Category</span>
          <span className="category-badge-name">{category}</span>
        </div>

        <div className="score-box">
          <span className="score-number">{score}</span>
          <span className="score-label">pts</span>
        </div>
      </header>

      {/* ── Time progress bar ── */}
      <div className="timer-track" role="progressbar" aria-valuenow={timeLeft} aria-valuemax={GAME_DURATION}>
        <div className={`timer-fill ${timerClass}`} style={{ width: `${timerPct}%` }} />
      </div>

      {/* ── Answer input + rejection flash ── */}
      <div className="answer-form-wrap">
        <form onSubmit={handleSubmit} className="answer-form">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={gameOver ? "Time's up!" : 'Type an answer and press Enter…'}
            className={`answer-input${rejectMsg ? ' answer-input--rejected' : ''}`}
            disabled={gameOver}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
        {rejectMsg && (
          <p className="reject-msg" role="status">{rejectMsg}</p>
        )}
      </div>

      {/* ── Answer list: pending + valid only (newest first) ── */}
      <ul className="answers-list" aria-live="polite" aria-label="Accepted answers">
        {answers
          .slice()
          .reverse()
          .map(answer => (
            <li key={answer.id} className={`answer-item answer-item--${answer.status}`}>
              <span className="answer-icon" aria-hidden="true">
                {answer.status === 'pending' ? <span className="spinner" /> : '✓'}
              </span>
              <span className="answer-text">{answer.text}</span>
              {answer.status === 'valid' && answer.points > 1 && (
                <span className="answer-points-badge" aria-label={`${answer.points} points`}>
                  ×{answer.points}
                </span>
              )}
            </li>
          ))}
      </ul>

      {gameOver && (
        <div className="gameover-banner" role="status">
          Time&apos;s up! &nbsp;Final score: <strong>{score}</strong>
        </div>
      )}
    </div>
  );
}
