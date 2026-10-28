import { NextResponse } from 'next/server';
import { DEMO_CHANGE_ORDERS } from '@/lib/demo-data';

export async function GET() {
  return NextResponse.json({
    success: true,
    changeOrders: DEMO_CHANGE_ORDERS,
  });
}

export async function POST(request: Request) {
  // In demo mode, change orders are pre-seeded
  return NextResponse.json({ error: 'Change orders are managed by admin' }, { status: 403 });
}
