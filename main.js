"use strict";

const mainEl = document.querySelector("main");

const articlePageNavigation = {
  displayViewMosaic: () => {
    mainEl.setAttribute("view-mode", "mosaic");
  },
  displayViewList: (articleIdParam) => {
    mainEl.setAttribute("view-mode", "list");
  },
};

document.querySelectorAll("article").forEach((article) => {
  article.addEventListener("click", () => {
    articlePageNavigation.displayViewList();
  });
});

document.querySelector("button").addEventListener("click", () => {
  articlePageNavigation.displayViewMosaic();
});

// Check html anchor
if (window.location.hash.substring()) {
  articlePageNavigation.displayViewList();
} else {
  articlePageNavigation.displayViewMosaic();
}

window.addEventListener("popstate", () => {
  if (window.location.hash.substring()) {
    articlePageNavigation.displayViewList();
  } else {
    articlePageNavigation.displayViewMosaic();
  }
});
