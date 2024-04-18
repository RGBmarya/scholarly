// app/api/chat/route.ts

import { NextRequest, NextResponse } from 'next/server';
import  Configuration from 'openai'; // Import OpenAI and Configuration from the official OpenAI Node.js SDK.
import  OpenAI from 'openai'
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your .env file is properly configured with OPENAI_API_KEY
});
const openai = new OpenAI();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { messages } = reqBody; 

        const completion = await (openai as any).complete({
            model: "gpt-3.5-turbo", 
            messages: messages, 
            max_tokens: 150, 
        });

        const responseData = {
            id: completion.data.id,
            model: completion.data.model,
            created: completion.data.created,
            choices: completion.data.choices.map((choice: any) => ({
                message: choice.message.content,
                role: choice.message.role,
                finish_reason: choice.finish_reason
            })),
            usage: completion.data.usage
        };
        return new NextResponse(JSON.stringify(responseData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error calling OpenAI:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to process your request' }), { status: 500, headers: {'Content-Type': 'application/json'}});
    }
}
