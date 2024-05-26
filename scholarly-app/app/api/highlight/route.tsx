import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: NextRequest) {
    // const [searchParams, setSearchParams] = useSearchParams();
    // setSearchParams({ text: params.text });
    const highlightedText = request.nextUrl.searchParams.get("text")
    console.log(highlightedText)

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/summarize?text=${highlightedText}`);
    const data = await response.text();

    return new Response(data);
}