declare var hljs: any;

/*
  This was an experiment to see how it would be to write JavaScript/TypeScript without jQuery.

  It was a good learning experiment, but I wouldn't recommend anyone to actually code this way, at least not without
  making some sort of wrapper. (It's actually pretty nice that TypeScript can recognize that, e.g.,
  getElementsByTagName("div") returns an array of HTMLDivElement rather than just an array of HTMLElement
  or worse - but wow, stuff gets verbose quickly.)
*/

let buildTableOfContents = function() {
  let headings: HTMLHeadingElement[] = Array.prototype.slice.call(document.querySelectorAll("h2,h3,h4,h5,h6"));
  let toc = document.getElementsByTagName("nav").item(0).getElementsByTagName("div").item(0);

  for (let heading of headings) {
    let tocElement: HTMLDivElement = document.createElement("div");
    let link: HTMLAnchorElement = document.createElement("a");

    tocElement.className += " nav-item nav-item-" + heading.tagName[1] + " nav-item-" + heading.getElementsByTagName("a").item(0).id;
    toc.appendChild(tocElement);

    link.innerHTML = heading.innerText;
    link.href = "#" + heading.getElementsByTagName("a").item(0).id;
    tocElement.appendChild(link);
  }
};

let highlightCode = function() {
  let preNodes: HTMLPreElement[] = Array.prototype.slice.call(document.getElementsByTagName("pre"));

  for (let node of preNodes) {
    node.innerHTML = node.innerHTML.trim();

    hljs.highlightBlock(node);
  }
};

let listenToScroll = function() {
  let headings: HTMLHeadingElement[] = Array.prototype.slice.call(document.querySelectorAll("h1,h2,h3,h4,h5,h6"));
  let previouslySelectedNavItem: HTMLDivElement;

  headings = headings.sort((a, b) => {
    return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
  })

  window.addEventListener("scroll", (ev: UIEvent) => {
    for (let i = 0; i < headings.length; i++) {
      let header = headings[i];

      if (header.getBoundingClientRect().top > 0) {
        let currentHeader = headings[Math.max(i - 1, 0)];
        let link = currentHeader.getElementsByTagName("a").item(0);
        let correspondingNavItem: HTMLDivElement = <HTMLDivElement> document.getElementsByClassName("nav-item-" + link.id).item(0);

        if (correspondingNavItem && correspondingNavItem != previouslySelectedNavItem) {
          correspondingNavItem.className += " nav-selected";

          if (previouslySelectedNavItem) {
            previouslySelectedNavItem.className = previouslySelectedNavItem.className.replace(/nav-selected/, '');
          }

          previouslySelectedNavItem = correspondingNavItem;
        }

        break;
      }
    }
  });
}

let addListeners = function() {
  let annotationNodes: HTMLAnchorElement[] = Array.prototype.slice.call(document.getElementsByClassName("code-annotation"));

  for (let node of annotationNodes) {
    node.addEventListener("click", (e: MouseEvent) => {
      let id = (<HTMLAnchorElement> e.currentTarget).id;

      let asideNodes: HTMLElement[] = Array.prototype.slice.call(document.getElementsByTagName("aside"));

      for (let node of asideNodes) {
        if (node.dataset['hidden']) {
          node.style.display = "none";
        }

        if (node.dataset['associatedid'] == id) {
          node.style.display = "block";

          node.addEventListener("mouseover", (ev: MouseEvent) => {
            // TODO
          });
        }
      }
    });
  }

  listenToScroll();
};

let start = function() {
  highlightCode();
  buildTableOfContents();
  addListeners();
};

document.addEventListener("DOMContentLoaded", start);
