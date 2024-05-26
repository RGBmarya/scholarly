import OpenAI from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({apiKey: process.env.REACT_APP_OPENAI_API_KEY});

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {
    const highlightedText = request.nextUrl.searchParams.get("text")
    const citationUrl = request.nextUrl.searchParams.get("citationUrl")
    const completion = await openai.chat.completions.create({
        messages: [{ 
            role: "system", 
            content: `You are a chatbot specializing in providing context for citations within a research paper, you will be given two sentences prior to the link of a citation. You are to explain why the cited paper is related to the two lines leading up to the hyperlink from said citation. Do not summarize - explain the connection between cited paper and current context. This response should be done in a manner which provides concise, direct responses with minimal introductions or conclusions with slightly simplified output for easier reading. Strictly adhere to a 200 word limit per response, additionally the output must not summarize the two sentences provided, rather search the cited article and explain the connection to the two sentences, using words only from the cited article. Your tone must be strictly informational and you are not to output anything besides this context, with no follow up in any way shape or form.
                    Highlighted Text: ${highlightedText} Citation URL: ${citationUrl}` }],
            model: "gpt-4-turbo",
      });

    return new Response(completion.choices[0].message.content);
}