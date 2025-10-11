# DIVE Data Learning Cohorts Gallery

A production-grade, static Jekyll website showcasing City of Austin DIVE cohort projects. Styled with Tailwind CSS and deployed via GitHub Pages, the gallery is designed for non‑technical administrators to manage content entirely through the GitHub web UI with automation via GitHub Actions.

Live site: https://cityofaustin.github.io/dive-gallery

- Configuration: [`_config.yml`](./_config.yml)
- Node scripts: [`package.json`](./package.json)
- Ruby gems: [`Gemfile`](./Gemfile)
- Spec and architecture: [`spec.md`](./spec.md)
- Assistant guidance: [`CLAUDE.md`](./CLAUDE.md)
- Brand palette: [`austin_brand.md`](./austin_brand.md)
- Search plugin: [`_plugins/search_index.rb`](./_plugins/search_index.rb)
- Frontend JS (filters): [`assets/js/filters.js`](./assets/js/filters.js)
- Admin playbook: [`docs/admin-getting-started.md`](./docs/admin-getting-started.md)
- Frontend JS (search): [`assets/js/search.js`](./assets/js/search.js)
- Cohort data example: [`_data/cohorts/2025.yml`](./_data/cohorts/2025.yml)

## Overview

This repository powers the "DIVE Data Learning Cohorts Gallery"—a static site that:
- Publishes cohort landing pages, schedules, policies, and learning materials
- Displays filterable/project cards for team projects
- Hosts individual team pages with deliverables (dashboards, posters, idea sheets)
- Provides client-side search across titles, summaries, and tags

Architecture highlights:
- Static site generator: Jekyll 4.x with Liquid
- Styling: Tailwind CSS (compiled to a single minified CSS)
- Search: Lunr.js, generated at build-time by a Jekyll plugin
- Hosting: GitHub Pages (static deployment)
- Automation: GitHub Actions for CI/CD, validation, and scaffolding

Key plugin declaration: [`class SearchIndexGenerator`](./_plugins/search_index.rb:19)

## Quickstart

Prerequisites:
- Ruby 3.3.9 (managed via `rbenv`; see [`Gemfile`](./Gemfile))
- Bundler (`gem install bundler`)
- Node.js and npm (for Tailwind build tooling)
- Jekyll (`gem install jekyll`) for local serving

Verify that `rbenv` shims are active before installing gems:
```bash
rbenv --version
eval "$(rbenv init -)"
which ruby   # should resolve to ~/.rbenv/versions/3.3.9/...
```

Install dependencies (ensure your shell is using `rbenv init` shims):
```bash
rbenv exec bundle install
npm install
```

Run Tailwind in watch mode and serve locally (two terminals recommended):
```bash
npm run watch:css
rbenv exec bundle exec jekyll serve
```

Production build (CSS + Jekyll):
```bash
npm run build
```

Notes:
- `rbenv` must be installed and initialized (e.g., add `eval "$(rbenv init -)"` to your shell profile) so the repository’s Ruby 3.3.9 shims are used. Avoid calling the system `gem` or `bundle` directly.
- The Jekyll site serves at http://localhost:4000 by default
- The public base URL is `https://cityofaustin.github.io/dive-gallery` (see [`_config.yml`](./_config.yml))

## Repository Structure

Core directories/files:
- Layouts and includes:
  - `_layouts/` (page templates: default, cohort, team)
  - `_includes/` (reusable UI components, filters, cards, header/footer)
- Data and content:
  - `_data/taxonomies.yml` (controlled vocabularies: departments, tracks, tags)
  - `_data/cohorts/YYYY.yml` (year-specific schedule, materials, policies)
  - `cohorts/YYYY/teams/<slug>/index.md` (team page with YAML front matter + narrative)
- Assets and build:
  - `assets/css/tailwind.css` → `assets/css/site.css` (compiled by Tailwind)
  - `assets/js/filters.js` and `assets/js/search.js` (client-side filtering and search)
- Jekyll plugin:
  - `_plugins/search_index.rb` (generates `search.json` for Lunr)
- Scripts:
  - `scripts/check_front_matter.rb` (front matter validation)
  - `scripts/check_file_sizes.rb` (file-size guard)
  - `scripts/scaffold_year.rb` (creates new cohort structure)
  - `scripts/new_team_from_issue.js` (creates team content from issue form)

Representative files:
- Config: [`_config.yml`](./_config.yml)
- Cohort data: [`_data/cohorts/2025.yml`](./_data/cohorts/2025.yml)
- Filters: [`assets/js/filters.js`](./assets/js/filters.js)
- Search: [`assets/js/search.js`](./assets/js/search.js)
- Plugin: [`_plugins/search_index.rb`](./_plugins/search_index.rb)

## Content Model

Team pages (`cohorts/YYYY/teams/<slug>/index.md`) must include comprehensive YAML front matter followed by Markdown narrative content. Required keys are validated by the script:
- Validation keys reference: [`REQUIRED_KEYS`](./scripts/check_front_matter.rb:7)

Cohort data (`_data/cohorts/YYYY.yml`) contains:
- `events`: timeline entries with id, name, date/time, location
- `materials`: grouped learning resources (e.g., essentials, workshops)
- `policies`: program policies to display on cohort pages

Example year file: [`_data/cohorts/2025.yml`](./_data/cohorts/2025.yml)

## Client-Side Features

Filters:
- Users can filter team cards by department, track, and tags
- Filter state is reflected in UI pills and updated count of visible teams
- Implementation: [`assets/js/filters.js`](./assets/js/filters.js)

Search:
- Lunr.js index built from team front matter (title, summary, tags) via Jekyll plugin
- Live query updates and grid matching:
  - Plugin: [`_plugins/search_index.rb`](./_plugins/search_index.rb)
  - Frontend: [`assets/js/search.js`](./assets/js/search.js)

## Administrative Workflows

Content management is done entirely via GitHub (issues, PRs, file uploads). Automation flows (implemented via GitHub Actions) typically include:

- Build & Deploy:
  - On push to main, compiles Tailwind CSS, builds Jekyll, deploys to GitHub Pages
- Validation:
  - PR checks ensure front matter completeness and block files >50MB
  - Run locally with:
    ```bash
    ruby scripts/check_front_matter.rb
    ruby scripts/check_file_sizes.rb
    ```
- New Team from Issue:
  - Issue form creates a branch and scaffolds `cohorts/YYYY/teams/<slug>/index.md` via [`scripts/new_team_from_issue.js`](./scripts/new_team_from_issue.js)
- Scaffold New Year:
  - Manually triggered workflow prepares `cohorts/YYYY/` and `_data/cohorts/YYYY.yml` via [`scripts/scaffold_year.rb`](./scripts/scaffold_year.rb)
- Poster Thumbnail Generation:
  - Automatically builds `thumb.jpg` from `poster.pdf` when added in a PR

Even if specific workflow filenames are not listed here, they live under `.github/workflows/` and are discoverable in the repository Actions tab.

## Development Workflow

Local iteration:
1. Edit layouts and includes under `_layouts/` and `_includes/`
2. Run `npm run watch:css` to continuously rebuild Tailwind
3. Serve locally with `bundle exec jekyll serve` and test changes

Adding a new cohort:
1. Trigger the "Start new cohort year" workflow (Actions tab)
2. Review PR with scaffolded `cohorts/YYYY/` and `_data/cohorts/YYYY.yml`
3. Merge PR and update content in the year data file

Adding a new team:
1. Create GitHub issue using the "Add team (creates PR)" template
2. Upload `poster.pdf` and `idea-sheet.pdf` to the team folder in the PR branch
3. Ensure thumbnail auto-generation completes and validation passes
4. Merge PR to publish

## Accessibility

The gallery adheres to WCAG 2.1 AA:
- All images require meaningful `alt` text
- Embedded `iframe` elements must include `title` attributes
- High-contrast palette and visible focus states are enforced
- PDFs must be accessibility‑tagged prior to upload

Accessibility rules are reflected in content validation and UI design.

## Branding and Design

Tailwind CSS is configured to align with official City of Austin brand guidelines:
- Palette and usage are documented in [`austin_brand.md`](./austin_brand.md)
- Typography uses Source Sans 3 (headings) and Inter (body)
- Build process compiles Tailwind from `assets/css/tailwind.css` to `assets/css/site.css`

## Repository Constraints

Operational constraints for GitHub Pages:
- Max repository size: 1 GB
- No single file should exceed 50 MB (validated via [`scripts/check_file_sizes.rb`](./scripts/check_file_sizes.rb))
- Git LFS is not supported for served assets

Branch protection:
- Merges to `main` require at least one review and successful validation checks

## Configuration Notes

- Base URL: set in [`_config.yml`](./_config.yml)
- Timezone: `"America/Chicago"`
- Search index fields: title, summary, tags (plugin generated)
- Exclusions:
  - Jekyll excludes this README from the site build (see `exclude:` in [`_config.yml`](./_config.yml))

## Commands Reference

Development:
```bash
rbenv exec bundle install
npm install
npm run watch:css
rbenv exec bundle exec jekyll serve
```

Build:
```bash
npm run build:css
npm run build
```

Validation:
```bash
ruby scripts/check_front_matter.rb
ruby scripts/check_file_sizes.rb
```

## Contributing

- Use Issues and Pull Requests for all content and code changes
- Ensure validation scripts pass locally before opening PRs
- Follow repository brand and accessibility guidelines
- Keep binary assets small and approved by department communications

## License

This project is a public-sector initiative by the City of Austin. If a formal license file is added, it will appear at the repository root (e.g., `LICENSE`). Until then, content and code usage should follow City policy and program guidelines.

---
For a deeper dive into goals, scope, and architecture, see the SPEC document: [`spec.md`](./spec.md). For assistant/developer guidance and command details, see: [`CLAUDE.md`](./CLAUDE.md).
