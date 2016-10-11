/**
 * @fileoverview Demo that helps explain what t-SNE is doing.
 * In particular, shows how various geometries translate to a 2D map,
 * and lets you play with the perplexity hyperparameter.
 *
 * None of this is optimized code, because it doesn't seem necessary
 * for the small cases we're considering.
 */


// Global variable for whether we should keep optimizing.
var currentThread = 0;
var GLOBALS = {
  running: true,
  unpausedBefore: false,
  stepLimit: 5000,
  state: {},
  showDemo: null,
  perplexitySlider: null,
  epsilonSlider: null,

}

main();
// Main entry point.
function main() {
  // Set state from hash.
  var format = d3.format(",");
  var params = {};
  window.location.hash.substring(1).split('&').forEach(function(p) {
    var tokens = p.split('=');
    params[tokens[0]] = tokens[1];
  });
  function getParam(key, fallback) {
    return params[key] === undefined ? fallback : params[key];
  }
  GLOBALS.state = {
    perplexity: +getParam('perplexity', 30),
    epsilon: +getParam('epsilon', 10),
    demo: +getParam('demo', 0),
    demoParams: getParam('demoParams', '50,2').split(',').map(Number)
  };

  // Utility function for creating value sliders.
  function makeSlider(container, name, min, max, start) {
    var dis = d3.select(container)
    dis.append("span").classed("slider-label-" + name, true)
      .text(name + ' ')
    var value = dis.append("span").classed("slider-value-" + name, true)
      .text(start)

    var slider = dis.append("input")
      .attr("type", "range")
      .attr("min", min)
      .attr("max", max)
      .attr("value", start)
      .on("change", updateParameters)
      .on("input", function() {
        value.text(slider.node().value);
      })
    return slider.node();
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
      GLOBALS.state.perplexity);
  var epsilonSlider = makeSlider(tsneUI, 'Epsilon', 1, 20,
      GLOBALS.state.epsilon);

  GLOBALS.perplexitySlider = perplexitySlider
  GLOBALS.epsilonSlider = epsilonSlider

  // Controls for data options.
  var optionControls;
  var demo;

  function updateParameters() {
    GLOBALS.state.demoParams = optionControls.map(function(s) {return s.value;});
    GLOBALS.state.perplexity = perplexitySlider.value;
    GLOBALS.state.epsilon = epsilonSlider.value;
    // Set window location hash.
    function stringify(map) {
      var s = '';
      for (key in map) {
        s += '&' + key + '=' + map[key];
      }
      return s.substring(1);
    }
    window.location.hash = stringify(GLOBALS.state);
    runState();
  }

  function runState() {
    // Set up t-SNE and start it running.
    var points = demo.generator.apply(null, GLOBALS.state.demoParams);
    var canvas = document.getElementById('output');

    GLOBALS.unpausedBefore = false;
    setRunning(true);

    runDemo(points, canvas, GLOBALS.state, function(step) {
      d3.select("#step").text(format(step));
      if(step > GLOBALS.stepLimit && !GLOBALS.unpausedBefore) {
        setRunning(false)
      }
    })
  }

  var playPause = document.getElementById('play-pause');
  function setRunning(r) {
    GLOBALS.running = r;
    if (GLOBALS.running) {
      playPause.setAttribute("class", "playing")
    } else {
      playPause.setAttribute("class", "paused")
    }
  }

  // Hook up play / pause / restart buttons.
  playPause.onclick = function() {
    GLOBALS.unpausedBefore = true;
    setRunning(!GLOBALS.running);
  };

  document.getElementById('restart').onclick = updateParameters;
  // Show a given demo.
  GLOBALS.showDemo = showDemo
  function showDemo(index, initializeFromState) {
    GLOBALS.state.demo = index;
    demo = demos[index];
    // Show description of demo data.
    document.getElementById('data-description').innerHTML = demo.description;
    // Create UI for the demo data options.
    var dataOptionsArea = document.getElementById('data-options');
    dataOptionsArea.innerHTML = '';
    optionControls = demo.options.map(function(option, i) {
      var value = initializeFromState ? GLOBALS.state.demoParams[i] : option.start;
      return makeSlider(dataOptionsArea, option.name,
          option.min, option.max, value);
    });

    menuDiv.selectAll(".demo-data")
      .classed("selected", false)
      .filter(function(d,i) { return i === index })
      .classed("selected", true)
    updateParameters();
  }

  //console.log("STATE", GLOBALS.state)
  setTimeout(function() {
    showDemo(GLOBALS.state.demo, true);
  },1)
}

/*
function updateStateFromFigure(figure, example) {
  var demo = demosByName[figure.dataset];
  //console.log("demo", demo, example)
  GLOBALS.state.demo = demo.index
  GLOBALS.state.demoParams = figure.params
  GLOBALS.state.perplexity = example.perplexity
  GLOBALS.state.epsilon = example.epsilon
  GLOBALS.perplexitySlider.value = example.perplexity
  GLOBALS.epsilonSlider.value = example.epsilon
  d3.select(".slider-value-Perplexity").text(example.perplexity);
  d3.select(".slider-value-Epsilon").text(example.epsilon);
  GLOBALS.showDemo(demo.index, true)
  d3.select("#playground").classed("modal", true)
}
d3.select("body").on("keydown", function() {
  if(d3.event.keyCode === 27) {
    d3.select("#playground").classed("modal", false)
  }
})

*/
