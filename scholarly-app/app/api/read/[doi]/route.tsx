export const dynamic = 'force-dynamic' // defaults to auto
export async function GET(request: Request, { params }: { params: { doi: string } }) {
    if (!params.doi) {
        throw new Error('DOI parameter is required');
    }
    const response = await fetch(`https://arxiv.org/pdf/${params.doi}`);
    const htmlContent: string = await response.text();
    return new Response(htmlContent);
}