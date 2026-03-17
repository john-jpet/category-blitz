import Anthropic from '@anthropic-ai/sdk';
import type { Category } from './categories';
import {
  US_STATES,
  US_STATE_ALIASES,
  COUNTRIES,
  COUNTRY_ALIASES,
  SE_STUDENTS_LIST,
  SE_STUDENTS_COUNT,
  FRUITS_CACHE,
  SPORTS_CACHE,
  ANIMALS_CACHE,
  VALIDATION_METHOD,
} from './categories';

// ── Types ────────────────────────────────────────────────────────────
export type ValidationResult =
  | { valid: true; displayText: string; points: number }
  | { valid: false };

// ── SE Students lookup map (lowercase → original casing) ─────────────
const SE_STUDENTS_MAP = new Map<string, string>(
  SE_STUDENTS_LIST.map(s => [s.toLowerCase().trim(), s.trim()]),
);

// ── Anthropic client ─────────────────────────────────────────────────
// Note: VITE_ prefix exposes this key client-side.
// For production, consider proxying through a Vercel serverless function.
const client = new Anthropic({
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY as string,
  dangerouslyAllowBrowser: true,
});

// ── Helpers ───────────────────────────────────────────────────────────
/** Capitalise first letter of each word, handling hyphens and apostrophes. */
function toTitleCase(s: string): string {
  return s.replace(/(^|[-\s'])(\w)/g, (_, sep, ch) => sep + ch.toUpperCase());
}

function getCategoryCache(category: Category): Map<string, string> | null {
  if (category === 'Fruits') return FRUITS_CACHE;
  if (category === 'Sports') return SPORTS_CACHE;
  if (category === 'Animals') return ANIMALS_CACHE;
  return null;
}

// ── Public API ────────────────────────────────────────────────────────
/**
 * Validates `answer` for `category`.
 * Returns { valid: true, displayText } on success, { valid: false } otherwise.
 * Deduplication is NOT handled here — the caller tracks submitted canonicals.
 */
export async function validateAnswer(
  answer: string,
  category: Category,
): Promise<ValidationResult> {
  const normalized = answer.trim().toLowerCase();
  if (!normalized) return { valid: false };

  const method = VALIDATION_METHOD[category];
  return method === 'list'
    ? validateList(normalized, category)
    : validateWithAI(answer.trim(), normalized, category);
}

// ── List validation ───────────────────────────────────────────────────
function validateList(normalized: string, category: Category): ValidationResult {
  switch (category) {
    case 'US States': {
      const canonical = US_STATE_ALIASES[normalized] ?? normalized;
      if (US_STATES.has(canonical)) {
        return { valid: true, displayText: toTitleCase(canonical), points: 1 };
      }
      return { valid: false };
    }
    case 'Countries of the World': {
      const canonical = COUNTRY_ALIASES[normalized] ?? normalized;
      if (COUNTRIES.has(canonical)) {
        return { valid: true, displayText: toTitleCase(canonical), points: 1 };
      }
      return { valid: false };
    }
    case 'Software Engineering Students': {
      const display = SE_STUDENTS_MAP.get(normalized);
      if (display !== undefined) {
        const points = SE_STUDENTS_COUNT.get(normalized) ?? 1;
        return { valid: true, displayText: display, points };
      }
      return { valid: false };
    }
    default:
      return { valid: false };
  }
}

// ── Category-specific validation questions ────────────────────────────
function getCategoryQuestion(raw: string, category: Category): string {
  switch (category) {
    case 'Animals':
      return `Is "${raw}" a real animal species that exists or has existed in nature? ` +
        `Mythological, fictional, fantasy, or purely imaginary creatures (e.g. unicorn, dragon, griffin, phoenix) are NOT valid. ` +
        `Extinct real animals (e.g. dinosaurs) are valid.`;
    case 'Fruits':
      return `Is "${raw}" a real fruit (the botanical or culinary sense)? ` +
        `Respond with its properly capitalised common name, or NO if it is not a real fruit.`;
    case 'Sports':
      return `Is "${raw}" a real sport or athletic competition? ` +
        `Respond with its properly capitalised name, or NO if it is not a real sport.`;
    default:
      return `Is "${raw}" a valid ${category}?`;
  }
}

// ── AI validation ─────────────────────────────────────────────────────
async function validateWithAI(
  raw: string,
  normalized: string,
  category: Category,
): Promise<ValidationResult> {
  const cache = getCategoryCache(category);

  // Cache hit — instant, zero API cost
  if (cache?.has(normalized)) {
    return { valid: true, displayText: cache.get(normalized)!, points: 1 };
  }

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 50,
      system:
        'You are a strict answer validator for a word game. ' +
        'If the input is a valid entry for the given category, respond with its ' +
        'properly formatted name only (correct capitalization and spelling, nothing else). ' +
        'If it is not valid, respond with NO.',
      messages: [
        {
          role: 'user',
          content: getCategoryQuestion(raw, category),
        },
      ],
    });

    const block = message.content[0];
    const text = block?.type === 'text' ? block.text.trim() : '';

    // Treat "No", "NO", "NO." etc. as invalid
    if (/^no[.,!]?\s*$/i.test(text)) {
      return { valid: false };
    }

    // Valid — cache the properly formatted name for future lookups
    const displayText = text || raw;
    cache?.set(normalized, displayText);
    return { valid: true, displayText, points: 1 };
  } catch {
    // Fail open: an API error must not punish the player
    return { valid: true, displayText: raw, points: 1 };
  }
}
