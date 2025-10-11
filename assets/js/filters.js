document.addEventListener("DOMContentLoaded", () => {
  const filterContainer = document.querySelector("[data-component='filters']");
  if (!filterContainer) return;

  const cards = Array.from(document.querySelectorAll("[data-team]"));
  const grid = document.querySelector("[data-team-grid]");
  const countEl = document.querySelector("[data-team-count]");
  const emptyState = document.querySelector("[data-empty-state]");
  const summaryEl = filterContainer.querySelector("[data-filter-summary]");
  const activePillsEl = filterContainer.querySelector("[data-filter-active-pills]");
  const clearBtn = filterContainer.querySelector("[data-filter-clear]");
  const searchInput = filterContainer.querySelector("[data-filter='search']");
  const optionButtons = Array.from(filterContainer.querySelectorAll("[data-filter-option]"));

  const filters = {
    department: null,
    track: null,
    tags: new Set(),
    search: ""
  };

  const formatLabel = (text = "") => text
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

  const updateSummary = () => {
    const parts = [];
    if (filters.department) parts.push(`Department: ${formatLabel(filters.department)}`);
    if (filters.track) parts.push(`Track: ${formatLabel(filters.track)}`);
    if (filters.tags.size) parts.push(`${filters.tags.size} tag${filters.tags.size > 1 ? 's' : ''}`);
    if (filters.search) parts.push(`Search: “${filters.search}”`);
    if (summaryEl) {
      summaryEl.textContent = parts.length ? `Active filters — ${parts.join(' · ')}` : 'Showing all teams';
    }

    if (!activePillsEl) return;
    activePillsEl.innerHTML = "";

    const createPill = (label, type, value) => {
      const pill = document.createElement("button");
      pill.type = "button";
      pill.className = "inline-flex items-center gap-2 rounded-full bg-brand-sky/15 px-3 py-1.5 text-xs font-semibold text-brand-navy transition hover:bg-brand-sky/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-sky/30";
      pill.dataset.removeFilter = type;
      pill.dataset.removeValue = value ?? "";
      pill.innerHTML = `${label}<span class=\"text-brand-sky/70\">×</span>`;
      activePillsEl.appendChild(pill);
    };

    if (filters.department) createPill(`Department: ${formatLabel(filters.department)}`, 'department');
    if (filters.track) createPill(`Track: ${formatLabel(filters.track)}`, 'track');
    filters.tags.forEach((tag) => createPill(formatLabel(tag), 'tag', tag));
    if (filters.search) createPill(`Search: ${filters.search}`, 'search');
  };

  const syncButtons = () => {
    optionButtons.forEach((btn) => {
      const type = btn.dataset.filterOption;
      const value = btn.dataset.filterValue;
      let isActive = false;
      if (type === "tag") {
        isActive = filters.tags.has(value);
      } else if (type === "department" || type === "track") {
        isActive = filters[type] === value;
      }
      btn.classList.toggle("is-active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  };

  const matchesFilter = (card) => {
    const department = card.dataset.teamDepartment;
    const track = card.dataset.teamTrack;
    const tags = card.dataset.teamTags?.split(",") ?? [];
    const title = card.querySelector("h3")?.textContent?.toLowerCase() ?? "";
    const summary = card.querySelector("p")?.textContent?.toLowerCase() ?? "";
    const slug = card.dataset.teamSlug;

    if (filters.department && filters.department !== department) return false;
    if (filters.track && filters.track !== track) return false;
    if (filters.tags.size) {
      const hasAllTags = Array.from(filters.tags).every((tag) => tags.includes(tag));
      if (!hasAllTags) return false;
    }

    if (filters.search) {
      const matches = window.__teamSearchMatches;
      if (matches instanceof Set) {
        return matches.has(slug);
      }

      return title.includes(filters.search) || summary.includes(filters.search);
    }

    return true;
  };

  const applyFilters = () => {
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

    if (countEl) countEl.textContent = String(visibleCount);
    if (emptyState) emptyState.classList.toggle("hidden", visibleCount !== 0);
    if (grid) grid.classList.toggle("grid-cols-1", visibleCount === 1);
  };

  optionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.filterOption;
      const value = btn.dataset.filterValue;
      if (!type || !value) return;

      if (type === "tag") {
        if (filters.tags.has(value)) {
          filters.tags.delete(value);
        } else {
          filters.tags.add(value);
        }
      } else {
        filters[type] = filters[type] === value ? null : value;
      }

      syncButtons();
      updateSummary();
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const value = event.target.value.trim().toLowerCase();
      filters.search = value;
      updateSummary();
      applyFilters();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      filters.department = null;
      filters.track = null;
      filters.tags.clear();
      filters.search = "";
      if (searchInput) searchInput.value = "";
      syncButtons();
      updateSummary();
      applyFilters();
    });
  }

  if (activePillsEl) {
    activePillsEl.addEventListener("click", (event) => {
      const target = event.target.closest("[data-remove-filter]");
      if (!target) return;
      const type = target.dataset.removeFilter;
      const value = target.dataset.removeValue;
      if (type === "tag" && value) {
        filters.tags.delete(value);
      } else if (type === "search") {
        filters.search = "";
        if (searchInput) searchInput.value = "";
      } else if (type) {
        filters[type] = null;
      }
      syncButtons();
      updateSummary();
      applyFilters();
    });
  }

  document.addEventListener("search-results:updated", (event) => {
    if (event.detail?.query) {
      filters.search = event.detail.query;
      if (searchInput && searchInput.value !== event.detail.query) {
        searchInput.value = event.detail.query;
      }
    }
    updateSummary();
    applyFilters();
  });

  syncButtons();
  updateSummary();
  applyFilters();
});
