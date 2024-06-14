import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "@langchain/core/documents";
import { PineconeStore } from "@langchain/pinecone";

export async function embedAndStoreDocs(
    client: Pinecone,
    docs: Document<Record<string, any>>[],
    pcNamespace: string, 
) {
    try  {
        const embeddings = new OpenAIEmbeddings({
            apiKey: process.env.OPENAI_API_KEY ?? '',
            model: "text-embedding-3-large",
        });
        const pineconeIndex = client.Index(process.env.PINECONE_INDEX_NAME ?? '');

        await PineconeStore.fromDocuments(docs, embeddings, {
            pineconeIndex,
            namespace: pcNamespace,
            textKey: "text",
        });
    } catch(e) {
        console.error(e);
        throw new Error("Failed to load docs!")
    }
}