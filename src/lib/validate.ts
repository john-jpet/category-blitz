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
  acceptedAnswers?: string[],
): Promise<ValidationResult> {
  const normalized = answer.trim().toLowerCase();
  if (!normalized) return { valid: false };

  const method = VALIDATION_METHOD[category];
  return method === 'list'
    ? validateList(normalized, category)
    : validateWithAI(answer.trim(), normalized, category, acceptedAnswers);
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

// ── AI validation via server route ─────────────────────────────────────
async function validateWithAI(
  raw: string,
  normalized: string,
  category: Category,
  acceptedAnswers?: string[],
): Promise<ValidationResult> {
  const cache = getCategoryCache(category);

  // Cache hit — instant, zero API cost
  if (cache?.has(normalized)) {
    return { valid: true, displayText: cache.get(normalized)!, points: 1 };
  }

  // Plural fallback: "grapes" → try "grape" in cache
  // Handles simple -s and -es suffixes without an API call
  const singularKey =
    normalized.endsWith('es') && normalized.length > 4 ? normalized.slice(0, -2) :
    normalized.endsWith('s')  && normalized.length > 3 ? normalized.slice(0, -1) :
    null;
  if (singularKey && cache?.has(singularKey)) {
    const displayText = cache.get(singularKey)!;
    cache.set(normalized, displayText); // memoize plural so next lookup is instant
    return { valid: true, displayText, points: 1 };
  }

  try {
    const response = await fetch('/api/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw,
        normalized,
        category,
        acceptedAnswers,
      }),
    });

    if (!response.ok) {
      throw new Error(`Validation request failed: ${response.status}`);
    }

    const result = (await response.json()) as ValidationResult;
    if (result.valid && result.displayText) {
      cache?.set(normalized, result.displayText);
    }
    return result;
  } catch {
    // Fail open: an API error must not punish the player.
    return { valid: true, displayText: raw, points: 1 };
  }
}
