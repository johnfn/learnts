var start = function () {
    highlightCode();
    addListeners();
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
                if (node.dataset.hidden) {
                    node.style.display = "none";
                }
                if (node.dataset.associatedid == id) {
                    node.style.display = "block";
                    node.addEventListener("mouseover", function (ev) {
                    });
                }
            }
        });
    }
};
document.addEventListener("DOMContentLoaded", start);
