document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("[data-filter='search']");
  if (!searchInput || typeof lunr === "undefined") return;

  const indexUrl = searchInput.getAttribute("data-search-index") || "/search.json";
  let index = null;
  let documents = {};
  const resultsPanel = document.querySelector("[data-search-results]");
  const resultsList = document.querySelector("[data-search-events]");

  function updateEventResultsPanel(items) {
    if (!resultsPanel || !resultsList) return;
    if (!items || items.length === 0) {
      resultsPanel.classList.add("hidden");
      resultsList.innerHTML = "";
      return;
    }
    resultsList.innerHTML = items.map((doc) => {
      const title = doc.title || "Event";
      const url = doc.url || "#";
      return `
        <li>
          <a class="flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-brand-navy hover:bg-brand-sky/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-sky/30" href="${url}">
            <span class="flex items-center gap-2">
              <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-sky/10 text-brand-indigo">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16 2v4M8 2v4M4.5 9h15M5 20h14a1 1 0 0 0 1-1v-9H4v9a1 1 0 0 0 1 1Z"/></svg>
              </span>
              <span>${title}</span>
            </span>
            <svg class="h-4 w-4 text-brand-sky" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0-5 5m5-5-5-5"/></svg>
          </a>
        </li>`;
    }).join("");
    resultsPanel.classList.remove("hidden");
  }

  function runSearch(rawQuery) {
    const query = rawQuery.trim().toLowerCase();
    if (!index || query.length < 2) {
      window.__teamSearchMatches = query.length ? new Set() : null;
      window.__eventSearchResults = [];
      updateEventResultsPanel([]);
      document.dispatchEvent(new CustomEvent("search-results:updated", { detail: { query } }));
      return;
    }

    const results = index.search(`${query}*`);
    window.__teamSearchMatches = new Set(results.map((result) => result.ref));
    const eventResults = results
      .map((r) => documents[r.ref])
      .filter((doc) => doc && doc.kind === "event")
      .slice(0, 6);
    window.__eventSearchResults = eventResults;
    updateEventResultsPanel(eventResults);
    document.dispatchEvent(new CustomEvent("search-results:updated", { detail: { results, documents, query, events: eventResults } }));
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

  // Light debounce to avoid excessive index queries while typing
  let debounceTimer = null;
  searchInput.addEventListener("input", (event) => {
    const value = event.target.value;
    if (debounceTimer) window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
      runSearch(value);
    }, 120);
  });

  // Hide results on outside click
  document.addEventListener("click", (e) => {
    if (!resultsPanel) return;
    if (resultsPanel.contains(e.target)) return;
    if (e.target === searchInput) return;
    resultsPanel.classList.add("hidden");
  });
});
