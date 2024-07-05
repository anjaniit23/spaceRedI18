import { getEmbeddings, } from "./embeddings/getEmbeddings.js";
import { generateGroupsFiles, } from "./groups/generateGroups.js";
import { readFromFile } from "./files/io.js";
import { cosineSimilarity } from './cosineSimilarity.js';
import { getNamespaceFileContent } from './namespaces.js';

let searchSpaceEmb;
let filesObject;

const findSimilarGroup = async (input, namespaces, cutoff = 0.75) => {
  const similarGroups = [];

  for (let i = 0; i < namespaces.length; i++) {
    let bestMatch = -1;
    let highestScore = 0;
    const jsonobj = filesObject[i];
    let groups = Object.values(jsonobj);
    let reps = groups.map((group) => group[0]);
    for (let j = 0; j < reps.length; j++) {
      const emb = await searchSpaceEmb[i][reps[j]];
      let score = cosineSimilarity(emb, input);
      if (score > cutoff && score > highestScore) {
        highestScore = score;
        bestMatch = j;
      }
    }

    if (bestMatch !== -1) {
      const obj = {
        highestScore,
        matchedGroup: groups[bestMatch][1],
        namespace: namespaces[i],
      };
      similarGroups.push(obj);
    }
  }

  return similarGroups;
};

export const interNamespaceGroupGenerator = async (
  namespace,
  namespaces,
  cutoff = 0.75,
) => {
  const pwd = process.cwd();
  const namespacesCount = namespaces.length;

  await generateGroupsFiles(cutoff);

  const inputEmbeddings = await getEmbeddings(namespace);
  const inputLabels = await getNamespaceFileContent(namespace);

  searchSpaceEmb = Array(namespacesCount - 1);
  filesObject = Array(namespacesCount - 1);

  for (let i = 0; i < namespacesCount; i++) {
    const emb = await getEmbeddings(namespaces[i]);
    searchSpaceEmb[i] = emb;
    const obj = await readFromFile(`${pwd}/groups/${cutoff}/${namespaces[i]}`);
    filesObject[i] = obj;
  }

  const finalGroups = [];
  for (let i = 0; i < inputLabels.length; i++) {
    const currGrp = await findSimilarGroup(
      inputEmbeddings[inputLabels[i]],
      namespaces,
      cutoff,
    );
    if (currGrp.length !== 0) finalGroups.push([inputLabels[i], currGrp]);
  }

  return finalGroups;
};


