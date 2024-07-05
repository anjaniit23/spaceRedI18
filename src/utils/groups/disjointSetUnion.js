export class DisjointSetUnion {
  constructor(size) {
    this.parent = new Array(size);
    this.rank = new Array(size);
    this.currentGroupNumber = size;
    this.bestMatch = new Array(size);
    this.initializeSets(size);
  }

  initializeSets(size) {
    for (let i = 0; i < size; i++) {
      this.parent[i] = i;
      this.rank[i] = 1;
      this.bestMatch[i] = -1;
    }
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }

  // Union two sets by size
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX !== rootY) {
      this.currentGroupNumber -= 1;
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
        this.rank[rootX] += this.rank[rootY];
      } else {
        this.parent[rootX] = rootY;
        this.rank[rootY] += this.rank[rootX];
      }
    }
  }
}
