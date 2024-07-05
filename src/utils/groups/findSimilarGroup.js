// for a given sentence and json data find the group to which it belongs across all namespaces

import { readFromFile } from "../files/io.js";

import { cosineSimilarity } from '../cosineSimilarity.js';

import { getEmbeddings } from "../embeddings/getEmbeddings.js";
import { createEmbeddings } from "../embeddings/createEmbeddings.js";

const findSimilarGroup = async (inputSentence, fileNames, cutoff = 0.75) => {
  const inputEmbed = await createEmbeddings([inputSentence]);
  const input = inputEmbed[0];

  const pwd = process.cwd();

  const similarGroups = [];

  // TODO: replace for-loop with forEach or reduce
  for (let i = 0; i < fileNames.length; i++) {
    const fileContent = await readFromFile(`${pwd}/groups/${cutoff}/${fileNames[i]}`);
    const embeddings = await getEmbeddings(fileNames[i]);

    let bestMatch = -1;
    let highestScore = 0;

    // TODO: once migrated to Map in the getGroups file then can remove this
    let groups = Object.values(fileContent);
    let reps = groups.map((group) => group[0]);

    for (let j = 0; j < reps.length; j++) {
      let score = cosineSimilarity(embeddings[reps[j]], input);
      if (score > cutoff && score > highestScore) {
        highestScore = score;
        bestMatch = j;
      }
    }

    if (bestMatch !== -1) {
      const obj = {
        highestScore,
        matchedGroup: groups[bestMatch][1],
        namespace: fileNames[i].split('.json')[0],
      };
      similarGroups.push(obj);
    }
  }

  return similarGroups;
};

export { findSimilarGroup };
