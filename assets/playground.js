/**
 * @fileoverview Demo that helps explain what t-SNE is doing.
 * In particular, shows how various geometries translate to a 2D map,
 * and lets you play with the perplexity hyperparameter.
 *
 * None of this is optimized code, because it doesn't seem necessary
 * for the small cases we're considering.
 */

main();

// Global variable for whether we should keep optimizing.
var currentThread = 0;
var running = true;

var timescale = d3.scaleLinear()
    .domain([0, 20, 100, 200, 500, 6000])
    .range([200, 120, 70, 10, 0]);

// Show an animated t-SNE algorithm.
function showTsne(points, canvas, message, perplexity, epsilon, stepLimit) {
  var options = {
    perplexity: perplexity, // default: 30
    dim: 2,
    epsilon: epsilon     // default: 10
  };

  var tsne = new tsnejs.tSNE(options);
  var dists = distanceMatrix(points);
  tsne.initDataDist(dists);
  var step = 0;
  var chunk = 10;
  var thread = ++currentThread;
  function improve() {
    if (running) {
      for(var k = 0; k < chunk; k++) {
        tsne.step();
        ++step;
      }
      var solution = tsne.getSolution().map(function(coords, i) {
        return new Point(coords, points[i].color);
      });
      visualize(solution, canvas, ""); //removed message
      document.getElementById('step').innerHTML = '' + step;
    }
    if(stepLimit && step >= stepLimit) return;
    if (thread == currentThread) {
      var timeout = timescale(step)
      //console.log(timeout)
      setTimeout(function() {
        window.requestAnimationFrame(improve);
      }, timeout)
    }
  }
  improve();
}

function renderDemoInitial(demo, canvas) {
  var params = [demo.options[0].start]
  if(demo.options[1]) params.push(demo.options[1].start)
  var points = demo.generator.apply(null, params);
  visualize(points, canvas, null, null)
}

// Main entry point.
function main() {
  // Set state from hash.
  var params = {};
  window.location.hash.substring(1).split('&').forEach(function(p) {
    var tokens = p.split('=');
    params[tokens[0]] = tokens[1];
  });
  function getParam(key, fallback) {
    return params[key] === undefined ? fallback : params[key];
  }
  var state = {
    perplexity: +getParam('perplexity', 30),
    epsilon: +getParam('epsilon', 10),
    demo: +getParam('demo', 0),
    demoParams: getParam('demoParams', '').split(',').map(Number)
  };

  // Utility function for creating value sliders.
  function makeSlider(container, name, min, max, start) {
    var label = document.createElement('text');
    label.innerText = name + ' ';
    container.appendChild(label);
    var currentValueLabel = document.createElement('text');
    currentValueLabel.innerText = start;
    container.appendChild(currentValueLabel);
    var slider = document.createElement('input');
    slider.type = 'range';
    slider.min = min;
    slider.max = max;
    slider.value = start;
    slider.onchange = updateParameters;
    slider.oninput = function() {
      currentValueLabel.innerText = slider.value;
    }
    container.appendChild(slider);
    container.appendChild(document.createElement('br'));
    return slider;
  }

  // Create menu of possible demos.
  var menuDiv = d3.select("#data-menu");

  var dataMenus = menuDiv.selectAll(".demo-data")
      .data(demos)
    .enter().append("div")
      .classed("demo-data", true)
      .on("click", function(d,i) {
        showDemo(i);
      });

  dataMenus.append("canvas")
      .attr("width", 150)
      .attr("height", 150)
      .each(function(d,i) {
        var demo = demos[i];
        var params = [demo.options[0].start]
        if(demo.options[1]) params.push(demo.options[1].start)
        var points = demo.generator.apply(null, params);
        var canvas = d3.select(this).node()
        visualize(points, canvas, null, null)
      });

  dataMenus.append("span")
      .text(function(d) { return d.name});




  // Set up t-SNE UI.
  var tsneUI = document.getElementById('tsne-options');
  var perplexitySlider = makeSlider(tsneUI, 'Perplexity', 2, 100,
      state.perplexity);
  var epsilonSlider = makeSlider(tsneUI, 'Epsilon', 1, 20,
      state.epsilon);

  // Controls for data options.
  var optionControls;
  var demo;
  function updateParameters() {
    state.demoParams = optionControls.map(function(s) {return s.value;});
    state.perplexity = perplexitySlider.value;
    state.epsilon = epsilonSlider.value;
    // Set window location hash.
    function stringify(map) {
      var s = '';
      for (key in map) {
        s += '&' + key + '=' + map[key];
      }
      return s.substring(1);
    }
    window.location.hash = stringify(state);
    updateDisplayForState();
  }

  function updateDisplayForState() {
    // Set up t-SNE and start it running.
    var points = demo.generator.apply(null, state.demoParams);
    var canvas = document.getElementById('output');
    showTsne(points, canvas, demo.name, state.perplexity, state.epsilon);
    setRunning(true);
  }

  var playPause = document.getElementById('play-pause');
  function setRunning(r) {
    running = r;
    playPause.innerText = running ? 'Pause' : 'Play';
  }

  // Hook up play / pause / restart buttons.
  playPause.onclick = function() {
    setRunning(!running);
  };
  document.getElementById('restart').onclick = updateParameters;


  // Show a given demo.
  function showDemo(index, initializeFromState) {
    state.demo = index;
    demo = demos[index];

    // Show description of demo data.
    document.getElementById('data-description').innerHTML = demo.description;

    // Create UI for the demo data options.
    var dataOptionsArea = document.getElementById('data-options');
    dataOptionsArea.innerHTML = '';
    optionControls = demo.options.map(function(option, i) {
      var value = initializeFromState ? state.demoParams[i] : option.start;
      return makeSlider(dataOptionsArea, option.name,
          option.min, option.max, value);
    });
    updateParameters();

  }
  showDemo(state.demo, true);
}
