/*
  This was an experiment to see how it would be to write JavaScript/TypeScript without jQuery.

  It was a good learning experiment, but I wouldn't recommend anyone to actually code this way, at least not without
  making some sort of wrapper. (It's actually pretty nice that TypeScript can recognize that, e.g.,
  getElementsByTagName("div") returns an array of HTMLDivElement rather than just an array of HTMLElement
  or worse - but wow, stuff gets verbose quickly.)
*/
var start = function () {
    highlightCode();
    buildTableOfContents();
    addListeners();
};
var buildTableOfContents = function () {
    var headings = Array.prototype.slice.call(document.querySelectorAll("h2,h3,h4,h5,h6"));
    var toc = document.getElementsByTagName("nav").item(0).getElementsByTagName("div").item(0);
    for (var _i = 0; _i < headings.length; _i++) {
        var heading = headings[_i];
        var tocElement = document.createElement("div");
        var link = document.createElement("a");
        tocElement.className += " nav-item-" + heading.tagName[1];
        toc.appendChild(tocElement);
        link.innerHTML = heading.innerText;
        link.href = "#" + heading.getElementsByTagName("a").item(0).id;
        tocElement.appendChild(link);
    }
};
var highlightCode = function () {
    var preNodes = Array.prototype.slice.call(document.getElementsByTagName("pre"));
    for (var _i = 0; _i < preNodes.length; _i++) {
        var node = preNodes[_i];
        node.innerHTML = node.innerHTML.trim();
        hljs.highlightBlock(node);
    }
};
var addListeners = function () {
    var annotationNodes = Array.prototype.slice.call(document.getElementsByClassName("code-annotation"));
    for (var _i = 0; _i < annotationNodes.length; _i++) {
        var node = annotationNodes[_i];
        node.addEventListener("click", function (e) {
            var id = e.currentTarget.id;
            var asideNodes = Array.prototype.slice.call(document.getElementsByTagName("aside"));
            for (var _i = 0; _i < asideNodes.length; _i++) {
                var node = asideNodes[_i];
                if (node.dataset['hidden']) {
                    node.style.display = "none";
                }
                if (node.dataset['associatedid'] == id) {
                    node.style.display = "block";
                    node.addEventListener("mouseover", function (ev) {
                        // TODO
                    });
                }
            }
        });
    }
};
document.addEventListener("DOMContentLoaded", start);
