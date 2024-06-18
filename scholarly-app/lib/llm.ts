import { getContext } from "@/lib/context-loader"
import { getLLMPrompt, getUserMessage } from "./prompt-template";
import OpenAI from "openai";

const openai = new OpenAI();

export async function getLLMResponse(currentSelection: string, namespace: string) {
    const context = await getContext(currentSelection, namespace);
    const prompt = await getLLMPrompt(context)
    const userMessage = await getUserMessage(currentSelection)
    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: prompt},
            {role: 'user', content: userMessage}
        ],
        model: 'gpt-3.5-turbo'
    });

    return completion.choices[0];
}
