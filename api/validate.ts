import Anthropic from '@anthropic-ai/sdk';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import type { Category } from '../src/lib/categories';
import {
  FRUITS_CACHE,
  SPORTS_CACHE,
  ANIMALS_CACHE,
} from '../src/lib/categories';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

function getCategoryCache(category: Category) {
  if (category === 'Fruits') return FRUITS_CACHE;
  if (category === 'Sports') return SPORTS_CACHE;
  if (category === 'Animals') return ANIMALS_CACHE;
  return null;
}

function getCategoryQuestion(raw: string, category: Category): string {
  switch (category) {
    case 'Animals':
      return `Is "${raw}" a real animal that exists or has existed in nature? ` +
        `Mythological, fictional, fantasy, or purely imaginary creatures (e.g. unicorn, dragon, griffin, phoenix) are NOT valid. ` +
        `Extinct real animals (e.g. dinosaurs) are valid. ` +
        `If valid, always reply with the standard common English name — never a scientific/Latin name. ` +
        `Normalise nicknames and shorthands to the full name (e.g. "Hippo" → "Hippopotamus", "Croc" → "Crocodile", "T-Rex" → "Tyrannosaurus Rex"). ` +
        `Normalise scientific names to their common English name (e.g. "Vulpes vulpes" → "Red Fox", "Panthera leo" → "Lion", "Ailuropoda melanoleuca" → "Giant Panda"). ` +
        `If a common English name does not exist, use the most widely recognised name. ` +
        `Dog breeds count as distinct animals — normalise to the full breed name (e.g. "Lab" → "Labrador Retriever", "German Shepherd" → "German Shepherd Dog", "Aussie" → "Australian Shepherd").`;
    case 'Fruits':
      return `Is "${raw}" a real fruit (botanical or culinary sense)? ` +
        `If valid, reply with the BASE fruit name only — not a variety or cultivar name. ` +
        `Examples: "Granny Smith" → "Apple", "Fuji" → "Apple", "Bing" → "Cherry", "Medjool" → "Date", "Cara Cara" → "Orange". ` +
        `Common multi-word fruits with a distinct identity are fine as-is (e.g. "Dragon Fruit", "Star Fruit", "Passion Fruit"). ` +
        `Reply with the singular base fruit name, or NO if not a real fruit.`;
    case 'Sports':
      return `Is "${raw}" a real sport or athletic competition? ` +
        `Respond with its properly capitalised name, or NO if it is not a real sport.`;
    default:
      return `Is "${raw}" a valid ${category}?`;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { raw, normalized, category, acceptedAnswers } = req.body ?? {};

  if (!raw || !category) {
    return res.status(400).json({ valid: false });
  }

  const cache = getCategoryCache(category as Category);
  if (cache?.has(normalized)) {
    return res.status(200).json({ valid: true, displayText: cache.get(normalized), points: 1 });
  }

  const singularKey =
    normalized.endsWith('es') && normalized.length > 4 ? normalized.slice(0, -2) :
    normalized.endsWith('s') && normalized.length > 3 ? normalized.slice(0, -1) :
    null;

  if (singularKey && cache?.has(singularKey)) {
    const displayText = cache.get(singularKey)!;
    cache.set(normalized, displayText);
    return res.status(200).json({ valid: true, displayText, points: 1 });
  }

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 50,
      system:
        'You are a strict answer validator for a word game. ' +
        'Rules: ' +
        '1. If the input is a valid entry for the given category, reply with ONLY its correctly capitalised canonical name — no punctuation, no explanation, nothing else. ' +
        '2. Always use the SINGULAR base form (e.g. "Grape" not "Grapes", "Apple" not "Apples", "Sport" not "Sports"). ' +
        '3. If it is not valid, reply with exactly: NO ' +
        '4. Never write sentences, qualifications, or extra words. One name or NO — that is all.',
      messages: [{
        role: 'user',
        content: getCategoryQuestion(raw, category as Category) +
          (acceptedAnswers && acceptedAnswers.length > 0
            ? ` Already accepted this session: ${acceptedAnswers.join(', ')}. If the input is the same thing as any of these (a synonym, alias, breed vs species, or different form), reply with that exact accepted name instead.`
            : ''),
      }],
    });

    const block = message.content[0];
    const text = block?.type === 'text' ? block.text.trim() : '';

    if (/^no[.,!]\s*$/i.test(text)) {
      return res.status(200).json({ valid: false });
    }

    if (text.length > 60 || text.includes('.')) {
      return res.status(200).json({ valid: false });
    }

    const displayText = text || raw;
    cache?.set(normalized, displayText);
    return res.status(200).json({ valid: true, displayText, points: 1 });
  } catch (error) {
    console.error('Anthropic validation failed:', error);
    return res.status(503).json({ valid: false, error: 'Validation service unavailable' });
  }
}
