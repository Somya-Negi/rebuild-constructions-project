import { NextResponse } from 'next/server';
import { leadCollectionEnabled } from '@/lib/lead-storage.mjs';

export const dynamic = 'force-dynamic';
export function GET() {
  return NextResponse.json(
    { acceptingLeads: leadCollectionEnabled() },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
