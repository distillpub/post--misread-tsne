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

// Helper function to draw a circle.
// TODO: replace with canvas blitting for web rendering
function circle(g, x, y, r) {
  g.beginPath();
  g.arc(x, y, r, 0, 2 * Math.PI);
  g.fill();
  g.stroke();
}

// Visualize the given points with the given message.
// If "no3d" is set, ignore the 3D cue for size.
function visualize(points, canvas, message, no3d) {
  var width = canvas.width;
  var height = canvas.height;
  var g = canvas.getContext('2d');
  g.fillStyle = 'white';
  g.fillRect(0, 0, width, height);
  var xExtent = d3.extent(points, function(p) {return p.coords[0]});
  var yExtent = d3.extent(points, function(p) {return p.coords[1]});
  var zExtent = d3.extent(points, function(p) {return p.coords[2]});
  var zScale = d3.scaleLinear().domain(zExtent).range([2, 10]);

  var centerX = (xExtent[0] + xExtent[1]) / 2;
  var centerY = (yExtent[0] + yExtent[1]) / 2;
  var scale = Math.min(width, height) /
              Math.max(xExtent[1] - xExtent[0], yExtent[1] - yExtent[0]);
  scale *= .9; // Leave a little margin.
  g.strokeStyle = 'rgba(255,255,255,.5)';
  var is3d = !no3d && points[0].coords.length > 2;
  var index = [];
  var n = points.length;
  if (is3d) {
    for (var i = 0; i < n; i++) {
      index[i] = i;
    }
    index.sort(function(a, b) {
      return d3.ascending(points[a].coords[2], points[b].coords[2]);
    });
  }

  for (var i = 0; i < n; i++) {
    var p = is3d ? points[index[i]] : points[i];
    g.fillStyle = p.color;
    var x = (p.coords[0] - centerX) * scale + width / 2;
    var y = -(p.coords[1] - centerY) * scale + height / 2;
    var r = is3d ? zScale(p.coords[2]) : 4;
    circle(g, x, y, r);
  }

  if (message) {
    g.fillStyle = '#000';
    g.font = '24pt Lato';
    g.fillText(message, 8, 34);
  }
}

if(typeof module != "undefined") module.exports = {
  visualize: visualize
}
