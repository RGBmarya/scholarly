import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {
    // const [searchParams, setSearchParams] = useSearchParams();
    // setSearchParams({ text: params.text });
    const highlightedText = request.nextUrl.searchParams.get("text")
    console.log(highlightedText)

    const response = await fetch(`http://localhost:3000/api/summarize?text=${highlightedText}`);
    const data = await response.text();

    return new Response(data);
}