import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import path from 'path';

export async function getChunkedDocsFromPDF() {
    try {
        const loader = new PDFLoader(path.join(__dirname, '../docs/test-paper.pdf'))
        const docs = await loader.load()

        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200,
        });

        const chunkedDocs = await textSplitter.splitDocuments(docs);
        return chunkedDocs;
    } catch(e) {
        console.error(e);
        throw new Error("PDF docs chunking failed!")
    }
}