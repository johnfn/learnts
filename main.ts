declare var hljs: any;

var start = function() {
  highlightCode();
  addListeners();
};

var highlightCode = function() {
  var preNodes = Array.prototype.slice.call(document.getElementsByTagName("pre"));

  for (var node of preNodes) {
    node.innerHTML = node.innerHTML.trim();

    hljs.highlightBlock(node);
  }
};

var addListeners = function() {
  var annotationNodes: Node[] = Array.prototype.slice.call(document.getElementsByClassName("code-annotation"));

  for (var node of annotationNodes) {
    node.addEventListener("click", (e: MouseEvent) => {
      var id = (<any> e.currentTarget).id;

      var asideNodes: any[] = Array.prototype.slice.call(document.getElementsByTagName("aside"));

      for (var node of asideNodes) {
        if (node.dataset.hidden) {
          node.style.display = "none";
        }

        if (node.dataset.associatedid == id) {
          node.style.display = "block";

          node.addEventListener("mouseover", (ev: MouseEvent) => {

          });
        }
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", start);
