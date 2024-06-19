import { getPineconeClient } from "@/lib/pinecone-client";
import { OpenAIEmbeddings } from "@langchain/openai";

const getEmbeddings = async (message: string) => {
    const embeddings = new OpenAIEmbeddings({
      apiKey: process.env.OPENAI_API_KEY ?? '',
      model: "text-embedding-3-large",
    });
    const vectors = await embeddings.embedDocuments([message]);
    return vectors[0]
}

const getMatchesFromEmbeddings = async (embeddings: number[], topK: number, namespace: string) => {
    const pineconeClient = await getPineconeClient();
    const index = await pineconeClient.Index(process.env.PINECONE_INDEX_NAME ?? '');
    const pineconeNamespace = index.namespace(namespace ?? '')
  
    try {
      const queryResult = await pineconeNamespace.query({
        vector: embeddings,
        topK,
        includeMetadata: true,
      })
      return queryResult.matches || []
    } catch (e) {
      console.log("Error querying embeddings: ", e)
      throw new Error(`Error querying embeddings: ${e}`)
    }
  }

export const getContext = async (
    message: string,
    namespace: string,
    maxTokens = 3000,
    minScore = 0.5,
    getOnlyText = true
  ) => {
    const embedding = await getEmbeddings(message);
    const matches = await getMatchesFromEmbeddings(embedding, 3, namespace);
    const qualifyingDocs = matches.filter((m) => m.score && m.score > minScore);
  
    let docs = matches
      ? qualifyingDocs.map((match) => match.metadata?.text)
      : [];
    return docs.join("\n").substring(0, maxTokens);
  };
  