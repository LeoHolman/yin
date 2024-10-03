'use server';

import { syncDatabaseModels } from '@/utils/syncDatabaseModels';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await syncDatabaseModels();
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ server: error }, { status: 500 });
  }
}
