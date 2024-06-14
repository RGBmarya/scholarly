import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { embedPDF } from '@/lib/pinecone-embed-docs';
import { url } from 'inspector';


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { pdfPath } = await req.json();

  try {
    const response = await embedPDF(pdfPath)
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}