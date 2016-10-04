/*
Configurations and utility functions for figures
*/
if(typeof require != "undefined") {
 // hack for loading from generator
 var d3 = require('./d3.min.js')
 var visualize = require('./visualize.js').visualize
 var tsnejs = require('./tsne.js')
 var demoConfigs = require('./demo-configs.js')
 var distanceMatrix = demoConfigs.distanceMatrix
 var Point = demoConfigs.Point
}

var FIGURES = {
  width: 150,
  height: 150,
  downscaleWidth: 300,
  downscaleHeight: 300,
}

function getPoints(demo, params) {
  if(!params) {
    params = [demo.options[0].start]
    if(demo.options[1]) params.push(demo.options[1].start)
  }
  var points = demo.generator.apply(null, params);
  return points;
}
function renderDemoInitial(demo, params, canvas) {
  visualize(points, canvas, null, null)
}


/*
var demoTimescale = d3.scaleLinear()
  .domain([0, 200, 6000])
  .range([20, 10, 0])
*/

// Show an animated t-SNE algorithm.
function runDemo(points, canvas, options, stepLimit, stepCb, doneCb) {
  /*
  var options = {
    perplexity: perplexity, // default: 30
    dim: 2,
    epsilon: epsilon     // default: 10
  };
  */

  var tsne = new tsnejs.tSNE(options);
  var dists = distanceMatrix(points);
  tsne.initDataDist(dists);
  var step = 0;
  var chunk = 10;
  //var thread = ++currentThread;
  var runner = { running: true }
  function improve() {
    //console.log("improve", perplexity, step)
    for(var k = 0; k < chunk; k++) {
      tsne.step();
      ++step;
    }
    stepCb(step)
    var solution = tsne.getSolution().map(function(coords, i) {
      return new Point(coords, points[i].color);
    });

    visualize(solution, canvas, ""); //removed message

    //document.getElementById('step').innerHTML = '' + step;
    if(!runner.running) return false;
    if(stepLimit && step >= stepLimit) return doneCb();
    //if (thread == currentThread) {
    var timeout = timescale(step)
    //console.log(timeout)
    setTimeout(function() {
      window.requestAnimationFrame(improve);
    }, timeout)
    //}
  }
  improve();
  return runner;
}


function runDemoSync(points, canvas, options, stepLimit, no3d) {
  var tsne = new tsnejs.tSNE(options);
  var dists = distanceMatrix(points);
  tsne.initDataDist(dists);
  var step = 0;
  for(var k = 0; k < stepLimit; k++) {
    if(k % 100 === 0) console.log("step", step)
    tsne.step();
    ++step;
  }
  var solution = tsne.getSolution().map(function(coords, i) {
    return new Point(coords, points[i].color);
  });
  visualize(solution, canvas, "", no3d); //removed message
  return step;
}

if(typeof module != "undefined") module.exports = {
  runDemo: runDemo,
  runDemoSync: runDemoSync,
  getPoints: getPoints,
  FIGURES: FIGURES
}
