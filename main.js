const mainEl = document.querySelector("main");

const isViewModeMosaic = () => mainEl.getAttribute("view-mode") === "mosaic";

const scrollToArticle = (articleId) => {
  const article = document.querySelector(
    `article[data-article-id="${articleId}"]`
  );

  scroll({ top: article.offsetTop });
};

const handleArticleClick = (article) => {
  if (isViewModeMosaic()) {
    const articleId = article.getAttribute("data-article-id");
    const newUrl = new URL(location.toString());
    newUrl.searchParams.set("article-id", articleId);
    history.pushState({ viewMode: "list", articleId }, "", newUrl);

    mainEl.setAttribute("view-mode", "list");

    scrollToArticle(articleId);
  } else {
    return;
  }
};

document.querySelectorAll("article").forEach((article) => {
  article.addEventListener("click", () => handleArticleClick(article));
});

window.addEventListener("popstate", (e) => {
  if (e.state.viewMode === "mosaic") {
    changeViewMode("mosaic");
  } else if (e.state.viewMode === "list") {
    changeViewMode("list", e.state.articleId);
  }
});

const changeViewMode = (newViewMode, articleId) => {
  if (newViewMode === "mosaic") {
    setViewModeMosaic();
  } else {
    setViewModeList();
  }

  function setViewModeMosaic() {
    const newUrl = new URL(location.toString());
    newUrl.searchParams.delete("article-id");

    history.replaceState({ viewMode: "mosaic" }, "", newUrl);

    mainEl.setAttribute("view-mode", "mosaic");
  }

  function setViewModeList() {
    const newUrl = new URL(location.toString());
    newUrl.searchParams.set("article-id", articleId);
    history.replaceState({ viewMode: "list", articleId }, "", newUrl);

    mainEl.setAttribute("view-mode", "list");

    scrollToArticle(articleId);
  }
};

const currentUrl = new URL(location.toString());
const articleIdInURL = currentUrl.searchParams.get("article-id");

if (articleIdInURL && articleIdInURL.length > 0) {
  changeViewMode("list", articleIdInURL);
} else {
  changeViewMode("mosaic", articleIdInURL);
}
