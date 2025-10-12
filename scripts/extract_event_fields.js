#!/usr/bin/env node
const fs = require('fs');

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
const eventId = (values.event_id || '').trim();

if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `cohort_year=${year}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `event_id=${eventId}\n`);
}

console.log(`Extracted fields: cohort_year='${year}', event_id='${eventId}'`);

