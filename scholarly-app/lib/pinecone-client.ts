import { Pinecone } from '@pinecone-database/pinecone'

const pc = new Pinecone();

export async function getPineconeClient() {
    return pc;
}