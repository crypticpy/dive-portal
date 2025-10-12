#!/usr/bin/env node
/*
  Parse issue form submission and scaffold a new event page.
*/

const fs = require('fs');
const path = require('path');

const ISSUE_BODY = process.env.ISSUE_BODY || '';
const ISSUE_TITLE = process.env.ISSUE_TITLE || '';

if (!ISSUE_BODY.trim()) {
  console.error('Issue body is empty; cannot scaffold event.');
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

function slugify(input) {
  return (input || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const sections = ISSUE_BODY.split(/^###\s+/m).slice(1);
const values = {};

sections.forEach((section) => {
  const [headingLine, ...rest] = section.split('\n');
  const key = normalizeKey(headingLine || '');
  const value = rest.join('\n').trim();
  values[key] = value;
});

const year = (values.cohort_year || '').trim();
const title = (values.event_title || ISSUE_TITLE).trim();
let eventId = (values.event_id || '').trim();

if (!year || !title) {
  console.error('Cohort year and event title are required.');
  process.exit(1);
}

if (!eventId) eventId = slugify(title);
const slug = eventId;

// Optional fields
const summary = (values.event_summary || '').trim();
const eventDate = (values.event_date || '').trim();
const eventTime = (values.event_time || '').trim();
const eventLocation = (values.event_location || '').trim();
const details = (values.details || '').trim();

// Parse attachments: one per line in format "Title | URL"
const attachmentsBlock = (values.attachments || '').split('\n')
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => {
    const parts = line.split('|');
    if (parts.length >= 2) {
      const title = parts[0].trim();
      const url = parts.slice(1).join('|').trim();
      if (title && url) return { title, url };
    }
    // Try fallback pattern: Title - URL
    const dash = line.split(' - ');
    if (dash.length >= 2) {
      const title = dash[0].trim();
      const url = dash.slice(1).join(' - ').trim();
      if (title && url) return { title, url };
    }
    return null;
  })
  .filter(Boolean);

const frontMatterLines = [
  '---',
  'layout: event',
  `title: "${escapeYaml(title)}"`,
  `cohort: ${year}`,
  `event_id: ${slug}`,
];

if (summary) frontMatterLines.push(`summary: "${escapeYaml(summary)}"`);
if (eventDate) frontMatterLines.push(`event_date: "${escapeYaml(eventDate)}"`);
if (eventTime) frontMatterLines.push(`event_time: "${escapeYaml(eventTime)}"`);
if (eventLocation) frontMatterLines.push(`event_location: "${escapeYaml(eventLocation)}"`);

if (attachmentsBlock.length > 0) {
  frontMatterLines.push('attachments:');
  attachmentsBlock.forEach((item) => {
    frontMatterLines.push(`  - title: "${escapeYaml(item.title)}"`);
    frontMatterLines.push(`    url: "${escapeYaml(item.url)}"`);
  });
}

frontMatterLines.push('---');

const body = details || 'Event details will be added here.';
const content = frontMatterLines.join('\n') + '\n\n' + body + '\n';

const dir = path.join(process.cwd(), 'cohorts', year, 'events', slug);
if (fs.existsSync(dir)) {
  console.error(`Event directory already exists at cohorts/${year}/events/${slug}. Aborting to avoid overwriting curated content.`);
  process.exit(1);
}

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'index.md'), content);

const branch = `event/${year}-${slug}`;
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `slug=${slug}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `branch=${branch}\n`);
}

console.log(`Scaffolded event at cohorts/${year}/events/${slug}`);

