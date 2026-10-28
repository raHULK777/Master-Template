import { NextResponse } from 'next/server';
import { DEMO_CHANGE_ORDERS, DEMO_PROJECTS } from '@/lib/demo-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(parseInt(searchParams.get('limit') ?? '200', 10), 200);

  return NextResponse.json({
    success: true,
    projects: DEMO_PROJECTS.slice(0, limit),
    changeOrders: DEMO_CHANGE_ORDERS,
  });
}
