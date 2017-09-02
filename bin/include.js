var fs = require("fs"),
    path = require("path"),
    jsdom = require("jsdom");

const { JSDOM } = jsdom;


function renderIncludes(dom) {
  let includes = [].slice.apply(dom.querySelectorAll("dt-include"));
  includes.forEach(function(el) {
    let location = el.getAttribute("src");
    let includeText = fs.readFileSync(path.join("public", location), "utf8");
    el.innerHTML = includeText;
    renderIncludes(el);
  });
}

let index = new JSDOM(fs.readFileSync("public/_index.html", "utf8"), {features: {ProcessExternalResources: false, FetchExternalResources: false}});
renderIncludes(index.window.document);
process.stdout.write(index.serialize());
