import { Pinecone } from '@pinecone-database/pinecone'

console.log(process.env.PINECONE_API_KEY)
const pc = new Pinecone();

export async function getPineconeClient() {
    return pc;
}