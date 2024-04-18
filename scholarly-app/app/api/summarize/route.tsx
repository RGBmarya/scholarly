import OpenAI from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: "sk-proj-d4yUX6WkD4QRSqKQc9oRT3BlbkFJBILI1XmGWtWuwT8drNyg",
});

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request: NextRequest) {
  const highlightedText = request.nextUrl.searchParams.get("text");
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are a chatbot specializing in providing a short summary to a given sentence of a research paper and connecting said sentence to other related research papers within a field. Utilize web browsing capabilities to find arXiv links related to the sentence given. This response should be done in a manner which provides concise, direct responses with minimal introductions or conclusions with slightly simplified output for easier reading. Strictly adhere to a 100 word limit per response. Your tone must be strictly informational and you are not to output anything besides this context, with no follow up in any way shape or form. The output must be structured as the summary followed by "related papers: [arxiv hyperlink]". ${highlightedText}`,
      },
    ],
    model: "gpt-4-turbo",
  });

  return new Response(completion.choices[0].message.content);
}
