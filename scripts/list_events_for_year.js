#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ISSUE_BODY = process.env.ISSUE_BODY || '';

function normalizeKey(key) {
  return (key || '')
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

const year = (values.cohort_year || '').trim();

function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}<<EOF\n${value}\nEOF\n`);
  }
}

if (!year) {
  setOutput('events_md', 'No cohort year provided.');
  setOutput('year', '');
  process.exit(0);
}

const dataPath = path.join(process.cwd(), '_data', 'cohorts', `${year}.yml`);
if (!fs.existsSync(dataPath)) {
  setOutput('events_md', `No schedule found for ${year} at _data/cohorts/${year}.yml`);
  setOutput('year', year);
  process.exit(0);
}

const lines = fs.readFileSync(dataPath, 'utf8').split('\n');
const events = [];
let current = null;
for (let i = 0; i < lines.length; i++) {
  const raw = lines[i];
  const line = raw.trim();
  if (line.startsWith('- id:')) {
    if (current) events.push(current);
    current = { id: line.split(':').slice(1).join(':').trim() };
  } else if (current && line.startsWith('name:')) {
    current.name = line.split(':').slice(1).join(':').trim().replace(/^"|"$/g, '');
  } else if (current && line.startsWith('date:')) {
    current.date = line.split(':').slice(1).join(':').trim().replace(/^"|"$/g, '');
  } else if (/^\s*-\s+name:/.test(raw)) {
    // handle entries without explicit id (rare): start a new item
    if (current) events.push(current);
    const name = raw.split(':').slice(1).join(':').trim();
    current = { id: '', name, date: '' };
  }
}
if (current) events.push(current);

const md = events.length
  ? events.map((e) => `- ${e.id || '(no id)'} — ${e.name || ''}${e.date ? ` (${e.date})` : ''}`).join('\n')
  : 'No events found in this cohort schedule.';

setOutput('events_md', md);
setOutput('year', year);
console.log('Generated events list for year', year);

