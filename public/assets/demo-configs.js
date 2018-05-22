/**
 * @fileoverview Synthetic data sets for t-SNE demo and visualizations,
 * along with some utility functions.
 */
 
// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 
 if(typeof require != "undefined") {
   // hack for loading from generator
   var d3 = require('./d3.min.js')
 }

// Euclidean distance.
function dist(a, b) {
  var d = 0;
  for (var i = 0; i < a.length; i++) {
    d += (a[i] - b[i]) * (a[i] - b[i]);
  }
  return Math.sqrt(d);
}

// Gaussian generator, mean = 0, std = 1.
var normal = d3.randomNormal();

// Create random Gaussian vector.
function normalVector(dim) {
  var p = [];
  for (var j = 0; j < dim; j++) {
    p[j] = normal();
  }
  return p;
}

// Scale the given vector.
function scale(vector, a) {
  for (var i = 0; i < vector.length; i++) {
    vector[i] *= a;
  }
}

// Add two vectors.
function add(a, b) {
  var n = a.length;
  var c = [];
  for (var i = 0; i < n; i++) {
    c[i] = a[i] + b[i];
  }
  return c;
}

// A point with color info.
var Point = function(coords, color) {
  this.coords = coords;
  this.color = color || '#039';
};

// Adds colors to points depending on 2D location of original.
function addSpatialColors(points) {
  var xExtent = d3.extent(points, function(p) {return p.coords[0]});
  var yExtent = d3.extent(points, function(p) {return p.coords[1]});
  var xScale = d3.scaleLinear().domain(xExtent).range([0, 255]);
  var yScale = d3.scaleLinear().domain(yExtent).range([0, 255]);
  points.forEach(function(p) {
    var c1 = ~~xScale(p.coords[0]);
    var c2 = ~~yScale(p.coords[1]);
    p.color = 'rgb(20,' + c1 + ',' + c2 + ')';
  });
}

// Convenience function to wrap 2d arrays as Points, using a default
// color scheme.
function makePoints(originals) {
  var points = originals.map(function(p) {return new Point(p);});
  addSpatialColors(points);
  return points;
}

// Creates distance matrix for t-SNE input.
function distanceMatrix(points) {
  var matrix = [];
  var n = points.length;
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      matrix.push(dist(points[i].coords,
                       points[j].coords));
    }
  }
  return matrix;
}

// Data in shape of 2D grid.
function gridData(size) {
  var points = [];
  for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
      points.push([x, y]);
    }
  }
  return makePoints(points);
}

// Gaussian cloud, symmetric, of given dimension.
function gaussianData(n, dim) {
  var points = [];
  for (var i = 0; i < n; i++) {
    var p = normalVector(dim);
    points.push(new Point(p));
  }
  return points;
}

// Elongated Gaussian ellipsoid.
function longGaussianData(n, dim) {
  var points = [];
  for (var i = 0; i < n; i++) {
    var p = normalVector(dim);
    for (var j = 0; j < dim; j++) {
      p[j] /= (1 + j);
    }
    points.push(new Point(p));
  }
  return points;
}

// Return a color for the given angle.
function angleColor(t) {
  var hue = ~~(300 * t / (2 * Math.PI));
  return 'hsl(' + hue + ',50%,50%)';
}

// Data in a 2D circle, regularly spaced.
function circleData(numPoints) {
  var points = [];
  for (var i = 0; i < numPoints; i++) {
    var t = 2 * Math.PI * i / numPoints;
    points.push(new Point([Math.cos(t), Math.sin(t)], angleColor(t)));
  }
  return points;
}

// Random points on a 2D circle.
function randomCircleData(numPoints) {
  var points = [];
  for (var i = 0; i < numPoints; i++) {
    var t = 2 * Math.PI * Math.random();
    points.push(new Point([Math.cos(t), Math.sin(t)], angleColor(t)));
  }
  return points;
}

// Clusters arranged in a circle.
function randomCircleClusterData(numPoints) {
  var points = [];
  for (var i = 0; i < numPoints; i++) {
    var t = 2 * Math.PI * i / numPoints;//Math.random();
    var color = angleColor(t);
    for (var j = 0; j < 20; j++) {
      var x = Math.cos(t) + .01 * normal();
      var y = Math.sin(t) + .01 * normal();
      points.push(new Point([x, y], color));
    }
  }
  return points;
}

// Two 2D clusters of different sizes.
function twoDifferentClustersData2D(n) {
  var points = [];
  for (var i = 0; i < n; i++) {
    points.push(new Point([10 * normal(),
                           10 * normal()], '#039'));
    points.push(new Point([100 + normal(),
                                normal()], '#f90'));
  }
  return points;
}

// Two clusters of the same size.
function twoClustersData(n, dim) {
  dim = dim || 50;
  var points = [];
  for (var i = 0; i < n; i++) {
    points.push(new Point(normalVector(dim), '#039'));
    var v = normalVector(dim);
    v[0] += 10;
    points.push(new Point(v, '#f90'));
  }
  return points;
}

// Two differently sized clusters, of arbitrary dimensions.
function twoDifferentClustersData(n, dim, scale) {
  dim = dim || 50;
  scale = scale || 10;
  var points = [];
  for (var i = 0; i < n; i++) {
    points.push(new Point(normalVector(dim), '#039'));
    var v = normalVector(dim);
    for (var j = 0; j < dim; j++) {
      v[j] /= scale;
    }
    v[0] += 20;
    points.push(new Point(v, '#f90'));
  }
  return points;
}

// Three clusters, at different distances from each other, in 2D
function threeClustersData2d(n) {
  var points = [];
  for (var i = 0; i < n; i++) {
    points.push(new Point([normal(),
                           normal()], '#039'));
    points.push(new Point([10 + normal(),
                                normal()], '#f90'));
    points.push(new Point([50 + normal(),
                                normal()], '#6a3'));
  }
  return points;
}

// Three clusters, at different distances from each other, in any dimension.
function threeClustersData(n, dim) {
  dim = dim || 50;
  var points = [];
  for (var i = 0; i < n; i++) {
    var p1 = normalVector(dim);
    points.push(new Point(p1, '#039'));
    var p2 = normalVector(dim);
    p2[0] += 10;
    points.push(new Point(p2, '#f90'));
    var p3 = normalVector(dim);
    p3[0] += 50;
    points.push(new Point(p3, '#6a3'));
  }
  return points;
}

// One tiny cluster inside of a big cluster.
function subsetClustersData(n, dim) {
   dim = dim || 2;
  var points = [];
  for (var i = 0; i < n; i++) {
    var p1 = normalVector(dim);
    points.push(new Point(p1, '#039'));
    var p2 = normalVector(dim);
    scale(p2, 50);
    points.push(new Point(p2, '#f90'));
  }
  return points;
}

// Data in a rough simplex.
function simplexData(n, noise) {
  noise = noise || 0.5;
  var points = [];
  for (var i = 0; i < n; i++) {
    var p = [];
    for (var j = 0; j < n; j++) {
      p[j] = i == j ? 1 + noise * normal() : 0;
    }
    points.push(new Point(p));
  }
  return points;
}

// Uniform points from a cube.
function cubeData(n, dim) {
  var points = [];
  for (var i = 0; i < n; i++) {
    var p = [];
    for (var j = 0; j < dim; j++) {
      p[j] = Math.random();
    }
    points.push(new Point(p));
  }
  return points;
}

// Points in two unlinked rings.
function unlinkData(n) {
  var points = [];
  function rotate(x, y, z) {
    var u = x;
    var cos = Math.cos(.4);
    var sin = Math.sin(.4);
    var v = cos * y + sin * z;
    var w = -sin * y + cos * z;
    return [u, v, w];
  }
  for (var i = 0; i < n; i++) {
    var t = 2 * Math.PI * i / n;
    var sin = Math.sin(t);
    var cos = Math.cos(t);
    // Ring 1.
    points.push(new Point(rotate(cos, sin, 0), '#f90'));
    // Ring 2.
    points.push(new Point(rotate(3 + cos, 0, sin), '#039'));
  }
  return points;
}

// Points in linked rings.
function linkData(n) {
  var points = [];
  function rotate(x, y, z) {
    var u = x;
    var cos = Math.cos(.4);
    var sin = Math.sin(.4);
    var v = cos * y + sin * z;
    var w = -sin * y + cos * z;
    return [u, v, w];
  }
  for (var i = 0; i < n; i++) {
    var t = 2 * Math.PI * i / n;
    var sin = Math.sin(t);
    var cos = Math.cos(t);
    // Ring 1.
    points.push(new Point(rotate(cos, sin, 0), '#f90'));
    // Ring 2.
    points.push(new Point(rotate(1 + cos, 0, sin), '#039'));
  }
  return points;
}

// Points in a trefoil knot.
function trefoilData(n) {
  var points = [];
  for (var i = 0; i < n; i++) {
    var t = 2 * Math.PI * i / n;
    var x = Math.sin(t) + 2 * Math.sin(2 * t);
    var y = Math.cos(t) - 2 * Math.cos(2 * t);
    var z = -Math.sin(3 * t);
    points.push(new Point([x, y, z], angleColor(t)));
  }
  return points;
}

// Two long, linear clusters in 2D.
function longClusterData(n) {
  var points = [];
  var s = .03 * n;
  for (var i = 0; i < n; i++) {
    var x1 = i + s * normal();
    var y1 = i + s * normal();
    points.push(new Point([x1, y1], '#039'));
    var x2 = i + s * normal() + n / 5;
    var y2 = i + s * normal() - n / 5;
    points.push(new Point([x2, y2], '#f90'));
  }
  return points;
}

// Mutually orthogonal steps.
function orthoCurve(n) {
  var points = [];
  for (var i = 0; i < n; i++) {
    var coords = [];
    for (var j = 0; j < n; j++) {
      coords[j] = j < i ? 1 : 0;
    }
    var t = 1.5 * Math.PI * i / n;
    points.push(new Point(coords, angleColor(t)));
  }
  return points;
}

// Random walk
function randomWalk(n, dim) {
  var points = [];
  var current = [];
  for (var i = 0; i < dim; i++) {
    current[i] = 0;
  }
  for (var i = 0; i < n; i++) {
    var step = normalVector(dim);
    var next = current.slice();
    for (var j = 0; j < dim; j++) {
      next[j] = current[j] + step[j];
    }
    var t = 1.5 * Math.PI * i / n;
    points.push(new Point(next, angleColor(t)));
    current = next;
  }
  return points;
}

// Random jump: a random walk with
// additional noise added at each step.
function randomJump(n, dim) {
  var points = [];
  var current = [];
  for (var i = 0; i < dim; i++) {
    current[i] = 0;
  }
  for (var i = 0; i < n; i++) {
    var step = normalVector(dim);
    var next = add(step, current.slice());
    var r = normalVector(dim);
    scale(r, Math.sqrt(dim));
    var t = 1.5 * Math.PI * i / n;
    var coords = add(r, next);
    points.push(new Point(coords, angleColor(t)));
    current = next;
  }
  return points;
}


/**
 * @fileoverview Demo configuration for t-SNE playground.
 */

var demos = [
  {
    name: 'Grid',
    description: 'A square grid with equal spacing between points. ' +
        'Try convergence at different sizes.',
    options: [
      {
        name: 'Points Per Side',
        min: 2, max: 20, start: 10,
      }
    ],
    generator: gridData
  },
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
         'different distances from each other. Cluster distances are ' +
         'only apparent at certain perplexities',
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
        'variances within the clusters. Cluster separation depends on perplexity.',
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
        'are close to each other. Note curvature of lines.',
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
    description: 'A dense, tight cluster inside of a wide, sparse cluster. ' +
      'Perplexity makes a big difference here.',
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
    description: 'Points in a unit Gaussian distribution. ' +
      'Data is entirely random, so any visible subclusters are ' +
      'not statistically significant',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 500, start: 50,
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
     ' Dimension n has variance 1/n. Elongation is visible in plot.',
    options: [
      {
        name: 'Number Of Points',
        min: 1, max: 500, start: 50,
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
    description: 'Points arranged in 3D, following a trefoil knot. ' +
      'Different runs may give different results.',
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
    description: 'Points arranged in 3D, on two linked circles. ' +
      'Different runs may give different results.',
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
    description: 'Points related by mutually orthogonal steps. ' +
      'Very similar to a random walk.',
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
    description: 'Random (Gaussian) walk. ' +
      'Smoother than you might think.',
      options: [{
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
    name: 'Equally Spaced',
    description: 'A set of points, where distances between all pairs of ' +
        'points are the same in the original space.',
    options: [
      {
        name: 'Number Of Points',
        min: 2, max: 100, start: 50,
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

var demosByName = {}
demos.forEach(function(d, i) {
  d.index = i;
  demosByName[d.name] = d;
})

if(typeof module != "undefined") module.exports = {
  demos: demos,
  demosByName: demosByName,
  distanceMatrix: distanceMatrix,
  Point: Point
};
