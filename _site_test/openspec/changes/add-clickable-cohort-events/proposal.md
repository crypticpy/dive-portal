## Why
Participants need detailed, shareable pages for each cohort event (date, time, location, description) with attached materials (PDFs, slides, docs) so they can prepare. Planners also need a simple place to publish logistics (e.g., parking instructions) and updates.

## What Changes
- Add event detail pages under `cohorts/<year>/events/<event-id>/` using a new `event` layout.
- Make timeline events clickable; link to event detail pages when `page.year` is known.
- Support `attachments` on events (front matter or `_data/cohorts/<year>.yml`).
- Keep implementation minimal and GitHub-first friendly (no scripts required).

## Impact
- Affected specs: `events`
- Affected code: `_includes/timeline.html`, `_layouts/event.html`, `cohorts/<year>/events/*/index.md`, `_data/cohorts/<year>.yml`

