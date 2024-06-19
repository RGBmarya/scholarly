import { NextRequest, NextResponse } from "next/server";
import { createOpenAI } from "@ai-sdk/openai";
import { getLLMResponse } from "@/lib/llm";
export const dynamic = 'force-dynamic' // defaults to auto

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const model = openai("gpt-3.5-turbo")

  
export async function POST(request: NextRequest) {
    try { 
        const { currentSelection, namespace } = await request.json();
        const response = await getLLMResponse(currentSelection, namespace);
        return NextResponse.json(response);
    }
    catch (error) {
        console.error(error)
        throw new Error("Error: POST request for highlighted text explanation");
    }
}