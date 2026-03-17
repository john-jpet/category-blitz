import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!_client) {
    const url = import.meta.env.VITE_SUPABASE_URL as string;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
    if (!url || !key) throw new Error('Supabase env vars not configured');
    _client = createClient(url, key);
  }
  return _client;
}

export interface ScoreRow {
  id: string;
  username: string;
  category: string;
  score: number;
  created_at: string;
}

export async function writeScore(
  username: string,
  category: string,
  score: number,
): Promise<void> {
  const { error } = await getClient()
    .from('scores')
    .insert({ username, category, score });
  if (error) throw new Error(error.message);
}

export async function getTopScores(
  category: string,
  limit = 10,
): Promise<ScoreRow[]> {
  const { data, error } = await getClient()
    .from('scores')
    .select('*')
    .eq('category', category)
    .order('score', { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []) as ScoreRow[];
}
