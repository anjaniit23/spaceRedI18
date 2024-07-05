// given an array of sentences it will return array of corresponding word embeddings

import { env } from "@xenova/transformers";
import { pipeline } from "@xenova/transformers";
env.allowLocalModels = false;

let EXTRACTOR;

const getExtractor = async () => {
  if (!EXTRACTOR) {
    try {
      EXTRACTOR = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
      );
    } catch (error) {
      throw new Error(`Failed to initialize pipeline - ${error}`);
    }
  }
  return EXTRACTOR;
};

export const createEmbeddings = async (sentences) => {
  const pipe = await getExtractor();

  const output = await pipe(sentences, { pooling: "mean", normalize: true });
  const wordEmbeddings = output.tolist();
  return wordEmbeddings;
};

