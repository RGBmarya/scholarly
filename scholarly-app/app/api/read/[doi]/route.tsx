export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, { params }: { params: { doi: string } }) {
    if (!params.doi) {
        throw new Error('DOI parameter is required');
    }
    const response = await fetch(`https://ar5iv.labs.arxiv.org/html/${params.doi}`);
    const htmlContent: string = await response.text();
    return new Response(htmlContent);
}