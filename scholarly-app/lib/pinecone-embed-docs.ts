import { getChunkedDocsFromPDF } from "@/lib/pdf-loader";
import { embedAndStoreDocs } from "@/lib/vector-store";
import { getPineconeClient } from "@/lib/pinecone-client";

export async function embedPDF(pdfPath: string) {
    try {
        const pineconeClient = await getPineconeClient();
        console.log("Preparing chunks from PDF file");
        const docs = await getChunkedDocsFromPDF(pdfPath);
        console.log(`Loading ${docs.length} chunks into Pinecone index ${process.env.PINECONE_INDEX_NAME}...`);
        await embedAndStoreDocs(pineconeClient, docs);
        console.log("Data embedded and stored in Pinecone index");
    } catch(e) {
        console.error("Init client sript failed", e);
        throw new Error("Error embedding PDF")
    }
}