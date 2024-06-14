import { getChunkedDocsFromPDF } from "@/lib/pdf-loader";
import { embedAndStoreDocs } from "@/lib/vector-store";
import { getPineconeClient } from "@/lib/pinecone-client";
import { Index } from "@pinecone-database/pinecone";

async function namespaceExists(index: Index, namespace: string) {
    if (namespace === null) throw new Error("No namespace value provided.");
    const { namespaces } = await index.describeIndexStats();
    return namespaces?.hasOwnProperty(namespace);
}

export async function embedPDF(doi: string) {
    try {
        const pineconeClient = await getPineconeClient();
        const index = pineconeClient.Index(process.env.PINECONE_INDEX_NAME ?? '')
        if (await namespaceExists(index, doi)) {
            console.log(`Namespace ${doi} exists in Pinecone index ${process.env.PINECONE_INDEX_NAME}...`)
            return
        }

        console.log("Preparing chunks from PDF file");
        const docs = await getChunkedDocsFromPDF(doi);
        console.log(`Loading ${docs.length} chunks into Pinecone index ${process.env.PINECONE_INDEX_NAME}...`);
        await embedAndStoreDocs(pineconeClient, docs, doi);
        console.log("Data embedded and stored in Pinecone index");
    } catch(e) {
        console.error("Init client sript failed", e);
        throw new Error("Error embedding PDF")
    }
}