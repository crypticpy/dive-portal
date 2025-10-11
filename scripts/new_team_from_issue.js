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

function escapeYaml(value) {
  return (value || '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
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
title: "${escapeYaml(title)}"
slug: ${slug}
cohort: ${cohortYear}
department: "${escapeYaml(department)}"
track: "${escapeYaml(track)}"
coach:
  name: "${escapeYaml(coachName)}"
  email: "${escapeYaml(coachEmail)}"
members:
${members.map((member) => `  - name: "${escapeYaml(member.name)}"`).join('\n') || '  - name: TBD'}
links:
  dashboard_url: "${escapeYaml(dashboardUrl)}"
  poster_pdf: "${posterPath}"
  idea_sheet_pdf: "${ideaSheetPath}"
summary: "${escapeYaml(summary)}"
methods:
${methods.map((method) => `  - "${escapeYaml(method)}"`).join('\n') || '  - TBD'}
tags:
${tags.map((tag) => `  - "${escapeYaml(tag)}"`).join('\n') || '  - TBD'}
thumbnail: "${thumbnailPath}"
thumbnail_alt: "Poster thumbnail for ${escapeYaml(title)}"
accessibility:
  dashboard_title: "${escapeYaml(values.dashboard_title || title)}"
---

${values.project_overview || 'Project narrative forthcoming.'}
`;

const teamDir = path.join(process.cwd(), 'cohorts', cohortYear, 'teams', slug);
if (fs.existsSync(teamDir)) {
  console.error(`Team directory already exists at cohorts/${cohortYear}/teams/${slug}. Aborting to avoid overwriting curated content.`);
  process.exit(1);
}

fs.mkdirSync(teamDir, { recursive: true });
fs.writeFileSync(path.join(teamDir, 'index.md'), frontMatter);

console.log(`Scaffolded team at cohorts/${cohortYear}/teams/${slug}`);

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `slug=${slug}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `cohort_year=${cohortYear}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `branch=team/${slug}\n`);
}
