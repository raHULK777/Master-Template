import { NextResponse } from 'next/server';
import { DEMO_PROJECTS } from '@/lib/demo-data';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = DEMO_PROJECTS.find((p) => p.id === id);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, project });
}
