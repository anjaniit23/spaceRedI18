export const cosineSimilarity = (vector1, vector2) =>
    vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
