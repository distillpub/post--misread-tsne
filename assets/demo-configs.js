/**
 * @fileoverview Demo configuration for t-SNE playground.
 */

var demos = [
  {
    name: 'Two Clusters',
    description: 'Two clusters with equal numbers of points.',
    options: [
      {
        name: 'Points Per Cluster',
        min: 1, max: 100, start: 50,
      },
      {
        name: 'Dimensions',
        min: 1, max: 100, start: 2,
      }
    ],
    generator: twoClustersData
  },
  {
    name: 'Three Clusters',
    description: 'Three clusters with equal numbers of points, but at ' +
         'different distances from each other.',
    options: [
      {
        name: 'Points Per Cluster',
        min: 1, max: 100, start: 50,
      },
      {
        name: 'Dimensions',
        min: 1, max: 100, start: 2,
      }
    ],
    generator: threeClustersData
  },
  {
    name: 'Two Different-Sized Clusters',
    description: 'Two clusters with equal numbers of points, but different ' +
        'variances within the clusters',
    options: [
      {
        name: 'Points Per Cluster',
        min: 1, max: 100, start: 50,
      },
      {
        name: 'Dimensions',
        min: 1, max: 100, start: 2,
      },
      {
        name: 'Scale',
        min: 1, max: 10, start: 5,
      }
    ],
    generator: twoDifferentClustersData
  },
  {
    name: 'Two Long Linear Clusters',
    description: 'Two sets of points, arranged in parallel lines that ' +
        'are close to each other.',
    options: [
      {
        name: 'Points Per Cluster',
        min: 1, max: 100, start: 50,
      }
    ],
    generator: longClusterData
  },
  {
    name: 'Cluster In Cluster',
    description: 'A dense, tight cluster inside of a wide, sparse cluster.',
    options: [
      {
        name: 'Points Per Cluster',
        min: 1, max: 100, start: 50,
      },
      {
        name: 'Dimensions',
        min: 1, max: 100, start: 2,
      }
    ],
    generator: subsetClustersData
  },
  {
    name: 'Circle (Evenly Spaced)',
    description: 'Points evenly distributed in a circle. ' +
        'Hue corresponds to angle in the circle.',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 100, start: 50,
      }
    ],
    generator: circleData
  },
  {
    name: 'Circle (Randomly Spaced)',
    description: 'Points randomly distributed in a circle. ' +
        'Hue corresponds to angle in the circle.',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 100, start: 50,
      }
    ],
    generator: randomCircleData
  },
  {
    name: 'Gaussian Cloud',
    description: 'Points in a unit Gaussian distribution.',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 400, start: 50,
      },
      {
        name: 'Dimensions',
        min: 1, max: 100, start: 2,
      }
    ],
    generator: gaussianData
  },
  {
    name: 'Ellipsoidal Gaussian Cloud',
    description: 'Points in an ellipsoidal Gaussian distribution. ' +
     ' Dimension n has variace 1/n.',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 400, start: 50,
      },
      {
        name: 'Dimensions',
        min: 1, max: 100, start: 2,
      }
    ],
    generator: longGaussianData
  },
  {
    name: 'Trefoil Knot',
    description: 'Points arranged in 3D, following a trefoil knot.',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 200, start: 50,
      }
    ],
    generator: trefoilData
  },
  {
    name: 'Linked Rings',
    description: 'Points arranged in 3D, on two linked circles',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 200, start: 50,
      }
    ],
    generator: linkData
  },
  {
    name: 'Unlinked Rings',
    description: 'Points arranged in 3D, on two unlinked circles',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 200, start: 50,
      }
    ],
    generator: unlinkData
  },
  {
    name: 'Orthogonal Steps',
    description: 'Points related by mutually orthogonal steps',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 500, start: 50,
      }
    ],
    generator: orthoCurve
  },
  {
    name: 'Random Walk',
    description: 'Random (Gaussian) walk',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 1000, start: 100,
      },
      {
        name: 'Dimension',
        min: 1, max: 1000, start: 100,
      }
    ],
    generator: randomWalk
  },
  {
    name: 'Random Jump',
    description: 'Random (Gaussian) Jump',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 1000, start: 100,
      },
      {
        name: 'Dimension',
        min: 1, max: 1000, start: 100,
      }
    ],
    generator: randomJump
  },
  {
    name: 'Grid',
    description: 'A square grid with equal spacing between points',
    options: [
      {
        name: 'Points Per Side',
        min: 2, max: 20, start: 10,
      }
    ],
    generator: gridData
  },
  {
    name: 'Equally Spaced',
    description: 'A set of points, where distances between all pairs of ' +
        'points are the same.',
    options: [
      {
        name: 'Number Of Points',
        min: 2, max: 100, start: 20,
      }
    ],
    generator: simplexData
  },
  {
    name: 'Uniform Distribution',
    description: 'Points uniformly distributed in a unit cube.',
    options: [
      {
        name: 'Number Of Points',
        min: 2, max: 200, start: 50,
      },
      {
        name: 'Dimensions',
        min: 1, max: 10, start: 3,
      }
    ],
    generator: cubeData
  }
];
