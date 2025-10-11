document.addEventListener("DOMContentLoaded", () => {
  const filterContainer = document.querySelector("[data-component='filters']");
  if (!filterContainer) return;

  const filters = {
    department: "",
    track: "",
    tag: "",
    search: ""
  };

  const cards = Array.from(document.querySelectorAll("[data-team]"));
  const grid = document.querySelector("[data-team-grid]");
  const countEl = document.querySelector("[data-team-count]");
  const emptyState = document.querySelector("[data-empty-state]");

  function matchesFilter(card) {
    const department = card.dataset.teamDepartment;
    const track = card.dataset.teamTrack;
    const tags = card.dataset.teamTags?.split(",") ?? [];
    const title = card.querySelector("h3")?.textContent?.toLowerCase() ?? "";
    const summary = card.querySelector("p.text-sm")?.textContent?.toLowerCase() ?? "";
    const slug = card.dataset.teamSlug;

    if (filters.department && filters.department !== department) return false;
    if (filters.track && filters.track !== track) return false;
    if (filters.tag && !tags.includes(filters.tag)) return false;

    if (filters.search) {
      const matches = window.__teamSearchMatches;
      if (matches instanceof Set) {
        return matches.has(slug);
      }

      const q = filters.search.toLowerCase();
      return title.includes(q) || summary.includes(q);
    }

    return true;
  }

  function applyFilters() {
    let visibleCount = 0;
    cards.forEach((card) => {
      if (matchesFilter(card)) {
        card.classList.remove("hidden");
        card.setAttribute("aria-hidden", "false");
        visibleCount += 1;
      } else {
        card.classList.add("hidden");
        card.setAttribute("aria-hidden", "true");
      }
    });

    if (countEl) countEl.textContent = visibleCount;
    if (emptyState) emptyState.classList.toggle("hidden", visibleCount !== 0);
    if (grid) grid.classList.toggle("grid-cols-1", visibleCount === 1);
  }

  filterContainer.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;

    const key = target.dataset.filter;
    if (!key) return;

    filters[key] = target.value.trim().toLowerCase();
    applyFilters();
  });

  document.addEventListener("search-results:updated", () => {
    applyFilters();
  });

  applyFilters();
});
