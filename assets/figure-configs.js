var figures = [
  {
    id: "01",
    params: [50, 2],
    dataset: "Two Clusters",
    no3d: true,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 5, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 100, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "02",
    params: [50, 2],
    dataset: "Two Clusters",
    no3d: true,
    examples: [
      { id: "01", perplexity: 30, epsilon: 10, dim: 2, step: 10 },
      { id: "02", perplexity: 30, epsilon: 10, dim: 2, step: 20 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 60},
      { id: "04", perplexity: 30, epsilon: 10, dim: 2, step: 120 },
      { id: "05", perplexity: 30, epsilon: 10, dim: 2, step: 1000 },
    ]
  },
  {
    id: "03",
    params: [75, 2],
    dataset: 'Two Different-Sized Clusters',
    no3d: true,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 5, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 100, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "04",
    params: [50, 2],
    dataset: 'Three Clusters',
    no3d: true,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 5, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 100, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "05",
    params: [200, 2],
    dataset: 'Three Clusters',
    no3d: true,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 5, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 100, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "06",
    params: [500, 100],
    dataset: 'Gaussian Cloud',
    no3d: true,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 5, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 100, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "07",
    params: [100, 50],
    dataset: 'Ellipsoidal Gaussian Cloud',
    no3d: true,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 5, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 100, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "08",
    params: [75, 2],
    dataset: 'Two Long Linear Clusters',
    no3d: true,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 5, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 100, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "09",
    params: [75, 50],
    dataset: 'Cluster In Cluster',
    no3d: true,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 5, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 100, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "10",
    params: [100],
    dataset: 'Linked Rings',
    no3d: false,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 5, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 100, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "11",
    params: [150],
    dataset: 'Trefoil Knot',
    no3d: false,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 5, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 30, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 100, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "12",
    params: [100],
    dataset: 'Trefoil Knot',
    no3d: false,
    examples: [
      { id: "01", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 2, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
  {
    id: "13",
    params: [100],
    dataset: 'Trefoil Knot',
    no3d: false,
    examples: [
      { id: "01", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "02", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "03", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "04", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
      { id: "05", perplexity: 50, epsilon: 10, dim: 2, step: 5000 },
    ]
  },
]

if(typeof module != "undefined") module.exports = figures;
