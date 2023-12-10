"use strict";

const mainEl = document.querySelector("main");

const isViewModeMosaic = () => mainEl.getAttribute("view-mode") === "mosaic";

const scrollToArticle = (articleId) => {
  const article = document.querySelector(
    `article[data-article-id="${articleId}"]`
  );

  if (article) {
    window.scrollTo({ top: article.offsetTop, behavior: "smooth" });
  } else {
    console.error(`Article with ID ${articleId} not found`);
  }
};

/**
 * @description use to navigate in article page
 * - addViewList => create a new history entry corresponding to the view type list
 * - displayViewMosaic => display the view type mosaic
 * - displayViewList => display the view type list
 */
const articlePageNavigation = {
  addViewList: (articleId) => {
    const newUrl = new URL(location.toString());
    newUrl.searchParams.set("article-id", articleId);
    history.pushState({ viewMode: "list", articleId }, "", newUrl);

    mainEl.setAttribute("view-mode", "list");

    scrollToArticle(articleId);
  },
  displayViewMosaic: () => {
    const newUrl = new URL(location.toString());
    newUrl.searchParams.delete("article-id");

    history.replaceState({ viewMode: "mosaic" }, "", newUrl);

    mainEl.setAttribute("view-mode", "mosaic");
  },
  displayViewList: () => {
    const newUrl = new URL(location.toString());
    const articleId = history.state?.articleId
      ? history.state.articleId
      : newUrl.searchParams.get("article-id");

    newUrl.searchParams.set("article-id", articleId);

    history.replaceState(
      {
        viewMode: "list",
        articleId: articleId,
      },
      "",
      newUrl
    );

    mainEl.setAttribute("view-mode", "list");
    scrollToArticle(articleId);
  },
};

const handleArticleClick = (article) => {
  if (!isViewModeMosaic()) return;

  const articleId = article.getAttribute("data-article-id");
  articlePageNavigation.addViewList(articleId);
};

const setInitialViewMode = () => {
  const currentUrl = new URL(location.toString());
  const articleIdInURL = currentUrl.searchParams.get("article-id");

  if (articleIdInURL && articleIdInURL.length > 0) {
    articlePageNavigation.displayViewList();
  } else {
    articlePageNavigation.displayViewMosaic();
  }
};

document.querySelectorAll("article").forEach((article) => {
  article.addEventListener("click", () => handleArticleClick(article));
});

window.addEventListener("popstate", (e) => {
  if (e.state.viewMode === "mosaic") {
    articlePageNavigation.displayViewMosaic();
  } else if (e.state.viewMode === "list") {
    articlePageNavigation.displayViewList();
  }
});

setInitialViewMode();
