import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import path from 'path';

export async function getChunkedDocsFromPDF(pdfPath: string) {
    try {
        const response = await fetch(`https://arxiv.org/pdf/${pdfPath}`)
        const blob = await response.blob();
        const loader = new WebPDFLoader(blob)
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