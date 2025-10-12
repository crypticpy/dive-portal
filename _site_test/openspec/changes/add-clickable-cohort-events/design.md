## Context
Add event detail pages to support preparation materials and logistics. Data currently lives in `_data/cohorts/<year>.yml` and a timeline include renders basic info.

## Goals / Non-Goals
- Goals: Clickable timeline → event pages; attachments per event; minimal authoring friction.
- Non-Goals: Calendar syncing, rich WYSIWYG, multi-language content.

## Decisions
- URL: `cohorts/<year>/events/<event-id>/` (human-readable, nested under cohort)
- Layout: `_layouts/event.html` reads from `_data/cohorts/<year>.yml` by `event_id`; front matter overrides allowed
- Attachments: from `page.attachments` or `event.attachments` in data
- Timeline links: derive from `include.year` (or `page.year`) + `event.id|slugify`

## Risks / Trade-offs
- If event page missing, link 404s; acceptable for GitHub-first workflow (create page when needed)
- No automatic generation of pages; prefer explicit authoring for clarity

## Migration Plan
1) Add layout and update timeline to link
2) Author event pages for existing cohort(s)
3) Document how to add more events

