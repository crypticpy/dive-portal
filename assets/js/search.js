document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("[data-filter='search']");
  if (!searchInput || typeof lunr === "undefined") return;

  const indexUrl = searchInput.getAttribute("data-search-index") || "/search.json";
  let index = null;
  let documents = {};

  function runSearch(rawQuery) {
    const query = rawQuery.trim().toLowerCase();
    if (!index || query.length < 2) {
      window.__teamSearchMatches = query.length ? new Set() : null;
      document.dispatchEvent(new CustomEvent("search-results:updated", { detail: { query } }));
      return;
    }

    const results = index.search(`${query}*`);
    window.__teamSearchMatches = new Set(results.map((result) => result.ref));
    document.dispatchEvent(new CustomEvent("search-results:updated", { detail: { results, documents, query } }));
  }

  fetch(indexUrl)
    .then((response) => (response.ok ? response.json() : null))
    .then((payload) => {
      if (!payload || !Array.isArray(payload.docs)) return;
      documents = payload.docs.reduce((map, doc) => {
        map[doc.slug] = doc;
        return map;
      }, {});

      index = lunr(function () {
        this.ref("slug");
        this.field("title");
        this.field("summary");
        this.field("tags");

        payload.docs.forEach((doc) => this.add(doc));
      });
    })
    .catch((error) => {
      console.error("Unable to load search index", error);
    });

  searchInput.addEventListener("input", (event) => {
    runSearch(event.target.value);
  });
});
