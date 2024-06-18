import { NextRequest, NextResponse } from 'next/server';
import { embedPDF } from '@/lib/pinecone-embed-docs';

export async function POST(req: NextRequest) {
  const { doi } = await req.json();

  try {
    const response = await embedPDF(doi)
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}