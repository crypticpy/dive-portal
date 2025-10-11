#!/usr/bin/env node
/*
  Parse issue form submission and scaffold a new team folder.
*/

const fs = require('fs');
const path = require('path');

const ISSUE_BODY = process.env.ISSUE_BODY || '';
const ISSUE_TITLE = process.env.ISSUE_TITLE || '';

if (!ISSUE_BODY.trim()) {
  console.error('Issue body is empty; cannot scaffold team.');
  process.exit(1);
}

function normalizeKey(key) {
  return key
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

const sections = ISSUE_BODY.split(/^###\s+/m).slice(1);
const values = {};

sections.forEach((section) => {
  const [headingLine, ...rest] = section.split('\n');
  const key = normalizeKey(headingLine || '');
  const value = rest.join('\n').trim();
  values[key] = value;
});

const title = values.team_title || ISSUE_TITLE;
const cohortYear = values.cohort_year || new Date().getFullYear().toString();

if (!title) {
  console.error('Team title is required.');
  process.exit(1);
}

const slug = (values.slug || title)
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)/g, '');

const department = values.department || '';
const track = values.track || '';
const summary = values.summary || '';
const coachName = values.coach_name || '';
const coachEmail = values.coach_email || '';
const members = (values.team_members || '')
  .split('\n')
  .map((name) => name.trim())
  .filter(Boolean)
  .map((name) => ({ name }));
const methods = (values.methods || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);
const tags = (values.tags || '')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

const dashboardUrl = values.dashboard_url || '';
const posterPath = `/cohorts/${cohortYear}/teams/${slug}/poster.pdf`;
const ideaSheetPath = `/cohorts/${cohortYear}/teams/${slug}/idea-sheet.pdf`;
const thumbnailPath = `/cohorts/${cohortYear}/teams/${slug}/thumb.jpg`;

const frontMatter = `---
layout: team
title: "${title.replace(/"/g, '\"')}"
slug: ${slug}
cohort: ${cohortYear}
department: "${department.replace(/"/g, '\"')}"
track: "${track.replace(/"/g, '\"')}"
coach:
  name: "${coachName.replace(/"/g, '\"')}"
  email: "${coachEmail}"
members:
${members.map((member) => `  - name: "${member.name.replace(/"/g, '\"')}"`).join('\n') || '  - name: TBD'}
links:
  dashboard_url: "${dashboardUrl}"
  poster_pdf: "${posterPath}"
  idea_sheet_pdf: "${ideaSheetPath}"
summary: "${summary.replace(/"/g, '\"')}"
methods:
${methods.map((method) => `  - ${method}`).join('\n') || '  - TBD'}
tags:
${tags.map((tag) => `  - ${tag}`).join('\n') || '  - TBD'}
thumbnail: "${thumbnailPath}"
thumbnail_alt: "Poster thumbnail for ${title.replace(/"/g, '\"')}"
accessibility:
  dashboard_title: "${(values.dashboard_title || title).replace(/"/g, '\"')}"
---

${values.project_overview || 'Project narrative forthcoming.'}
`;

const teamDir = path.join(process.cwd(), 'cohorts', cohortYear, 'teams', slug);
fs.mkdirSync(teamDir, { recursive: true });
fs.writeFileSync(path.join(teamDir, 'index.md'), frontMatter);

['poster.pdf', 'idea-sheet.pdf'].forEach((filename) => {
  const filePath = path.join(teamDir, filename);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'Placeholder - replace via GitHub UI.');
  }
});

const thumbPath = path.join(teamDir, 'thumb.jpg');
if (!fs.existsSync(thumbPath)) {
  fs.writeFileSync(thumbPath, 'Thumbnail will be generated from poster.pdf.');
}

console.log(`Scaffolded team at cohorts/${cohortYear}/teams/${slug}`);

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `slug=${slug}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `cohort_year=${cohortYear}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `branch=team/${slug}\n`);
}
