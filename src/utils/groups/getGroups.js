import { env } from "@xenova/transformers";
env.allowLocalModels = false;

import { DisjointSetUnion } from "./disjointSetUnion.js";
import { getEmbeddings } from "../embeddings/getEmbeddings.js";
import { cosineSimilarity } from '../cosineSimilarity.js';
import { getNamespaceFileContent } from "../namespaces.js";

const getScore = (index, indeces, embeddings, sentences) => {
  let avgScore = 0;
  for (let i = 0; i < indeces.length; i++) {
    avgScore += cosineSimilarity(
      embeddings[sentences[indeces[i]]],
      embeddings[sentences[index]]
    );
  }
  avgScore /= indeces.length;
  return avgScore;
};

const getRepresentative = (indeces, embeddings, sentences) => {
  const n = indeces.length;
  let represntative = -1;
  let bestscore = -1;
  for (let i = 0; i < n; i++) {
    let currScore = getScore(indeces[i], indeces, embeddings, sentences);
    if (currScore > bestscore) {
      bestscore = currScore;
      represntative = indeces[i];
    }
  }
  return represntative;
};


export const getGroups = async (
  fileName,
  cutoff
) => {
  const labels = await getNamespaceFileContent(fileName);
  const totalLabelsCount = labels.length;
  const disjointSetUnion = new DisjointSetUnion(totalLabelsCount);

  let wordEmbeddings = await getEmbeddings(fileName);

  for (let i = 0; i < totalLabelsCount; i++) {
    //get the best match sentence
    let bestscore = -1;
    for (let j = 0; j < totalLabelsCount; j++) {
      if (j !== i) {
        const emb1 = wordEmbeddings[labels[i]];
        const emb2 = wordEmbeddings[labels[j]];
        const score = cosineSimilarity(emb1, emb2);
        if (score > cutoff) {
          if (score > bestscore) {
            disjointSetUnion.bestMatch[i] = j;
            bestscore = score;
          }
        }
      }
    }
    // if any valid match
    if (bestscore !== -1) {
      const currentGroup = [];
      const parent = disjointSetUnion.find(disjointSetUnion.bestMatch[i]);
      for (let j = 0; j < totalLabelsCount; j += 1) {
        if (disjointSetUnion.find(j) === parent) currentGroup.push(j);
      }
      const sz = currentGroup.length;
      let avgScore = 0;
      for (let j = 0; j < sz; j += 1) {
        avgScore += cosineSimilarity(
          wordEmbeddings[labels[i]],
          wordEmbeddings[labels[currentGroup[j]]]
        );
      }
      avgScore /= sz;
      if (avgScore > cutoff) {
        disjointSetUnion.union(i, disjointSetUnion.bestMatch[i]);
      }
    }
  }

  // TODO: convert to a map
  const groupsList = [];
  const filled = Array(totalLabelsCount).fill(false);

  for (let i = 0; i < totalLabelsCount; i++) {
    if (filled[i]) continue;
    let currentGroup = [i];
    filled[i] = true;

    for (let j = i + 1; j < totalLabelsCount; j++) {
      if (filled[j]) continue;
      if (disjointSetUnion.find(i) === disjointSetUnion.find(j)) {
        currentGroup.push(j);
        filled[j] = true;
      }
    }

    const repIndx = getRepresentative(currentGroup, wordEmbeddings, labels);
    const groups = currentGroup.map(groupIndex => labels[groupIndex]);

    groupsList.push([labels[repIndx], groups]);
  }


  return groupsList;
};
