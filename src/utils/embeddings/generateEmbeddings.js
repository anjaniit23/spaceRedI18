import { readFromFile, writeToFile } from "../files/io.js";
import { getNamespacesFileNames } from "../namespaces.js";
import { createEmbeddings } from "./createEmbeddings.js";

export const createEmbeddingsFile = async (fileName) => {
    const pwd = process.cwd();
    const filePath = `${pwd}/i18n/en_US/${fileName}`;
    const fileContent = readFromFile(filePath);
    const labels = Object.keys(fileContent);
    console.log('creating embeddings for ', filePath);
    const embeddings = await createEmbeddings(labels);
    const embeddingsFileContent = labels.reduce((content, label, index) => {
        return {
            ...content,
            [label]: embeddings[index]
        }
    }, {});

    const embeddingsFilePath = `${pwd}/embeddings/${fileName}`;
    console.log(`writing embeddings to ${embeddingsFilePath}`);
    writeToFile(embeddingsFilePath, embeddingsFileContent);
    return embeddingsFileContent;
}

const batchCreation = async (fileNames) => {
    let promises = [];
    fileNames.forEach(file => {
        promises.push(createEmbeddingsFile(file))
    });
    await Promise.all(promises);
};

const FILESS_PER_BATCH = 200;
export async function createEmbeddingsFiles() {
    console.log('Generating Embeddings Files....');
    try {
        const files = await getNamespacesFileNames();
        let totalNamespaces = files.length;
        console.log('Namespace files read complete, total files = ', totalNamespaces);

        console.log('Started on Embeddings generation....');
        while (totalNamespaces > 0) {
            const start = totalNamespaces - (FILESS_PER_BATCH + 1) < 0 ? 0 : totalNamespaces - (FILESS_PER_BATCH + 1);
            const end = totalNamespaces - 1;
            console.log(`Starting point = ${start} and Ending Point = ${end}`);
            const batchFiles = files.slice(start, end);
            await batchCreation(batchFiles);
            totalNamespaces = start;
        }
        console.log('All Embeddings generated successfully!');
    } catch (e) {
        throw e;
    }
}

