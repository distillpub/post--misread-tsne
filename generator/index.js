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

var d3 = require('d3')
var fs = require('fs')
var demoConfigs = require('../assets/demo-configs.js');
var figureConfigs = require('../assets/figure-configs.js');
//var tsne = require('../assets/tsne.js');
var visualize = require('../assets/visualize.js');
var figures = require('../assets/figures.js');
var Canvas = require('canvas')
var async = require('async')

var singleFigure = process.argv[2]

var basedir = __dirname + "/../assets/"

var F = figures.FIGURES;
var width = F.downscaleWidth
var height = F.downscaleHeight

var canvas = new Canvas(width, height);

async.eachSeries(figureConfigs, function(figure, fCb) {
  // allow user to generate a specific figure
  if(singleFigure && singleFigure !== figure.id) return fCb();

  var demo = demoConfigs.demosByName[figure.dataset];
  var originalPoints = figures.getPoints(demo, figure.params)
  visualize.visualize(originalPoints, canvas, null, figure.no3d)

  fs.writeFile(basedir + "figure_" + figure.id + "_" + "original.png", canvas.toBuffer(), function() {
    console.log("wrote original", figure.id)
    async.eachSeries(figure.examples, function(example, eCb) {
      var ecanvas = new Canvas(width, height);
      figures.runDemoSync(originalPoints, ecanvas, example, example.step, figure.no3d);
      fs.writeFile(basedir + "figure_" + figure.id + "_" + example.id + ".png", ecanvas.toBuffer(), function() {
        console.log("wrote", figure.id, example.id)
        eCb();
      })
    }, function(err) {
      fCb();
    })
  });
}, function(err) {

})
//fs.writeFile("us-counties.png", canvas.toBuffer());
