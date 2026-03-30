import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const tags = await query(`
      SELECT id, name, slug, usage_count
      FROM tags
      ORDER BY usage_count DESC
      LIMIT 20
    `);
    return NextResponse.json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json([]);
  }
}
