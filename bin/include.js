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
