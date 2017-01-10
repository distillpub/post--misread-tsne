var fs = require("fs"),
    path = require("path"),
    jsdom = require("jsdom").jsdom,
    serializeDocument = require("jsdom").serializeDocument;

let index = jsdom(fs.readFileSync("public/_index.html", "utf8"), {features: {ProcessExternalResources: false, FetchExternalResources: false}});

function renderIncludes(dom) {
  let includes = [].slice.apply(dom.querySelectorAll("dt-include"));
  includes.forEach(function(el) {
    let location = el.getAttribute("src");
    let includeText = fs.readFileSync(path.join("public", location), "utf8");
    el.innerHTML = includeText;
    renderIncludes(el);
  });
}

renderIncludes(index);
process.stdout.write(serializeDocument(index));
