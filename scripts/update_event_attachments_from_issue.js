#!/usr/bin/env node
/*
  Update attachments list in an existing event page from an issue form.
  - Finds page at cohorts/<year>/events/<event_id>/index.md
  - Replaces or appends to `attachments:` in front matter
*/

const fs = require('fs');
const path = require('path');

const ISSUE_BODY = process.env.ISSUE_BODY || '';
const ISSUE_TITLE = process.env.ISSUE_TITLE || '';

function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
  }
}

if (!ISSUE_BODY.trim()) {
  console.error('Issue body is empty; cannot update event.');
  setOutput('changed', 'false');
  process.exit(0);
}

function normalizeKey(key) {
  return (key || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

// Parse sections
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
const mode = (values.mode || 'REPLACE').toUpperCase().includes('APPEND') ? 'APPEND' : 'REPLACE';
const attachmentsLines = (values.attachments || '')
  .split('\n').map((l) => l.trim()).filter(Boolean);

if (!year || !eventId || attachmentsLines.length === 0) {
  console.error('Missing year, event id, or attachments.');
  setOutput('changed', 'false');
  process.exit(0);
}

// Parse attachments: Title | URL
const newItems = attachmentsLines.map((line) => {
  let title = '';
  let url = '';
  if (line.includes('|')) {
    const parts = line.split('|');
    title = parts[0].trim();
    url = parts.slice(1).join('|').trim();
  } else if (line.includes(' - ')) {
    const parts = line.split(' - ');
    title = parts[0].trim();
    url = parts.slice(1).join(' - ').trim();
  }
  if (!title || !url) return null;
  return { title, url };
}).filter(Boolean);

if (newItems.length === 0) {
  console.error('No valid attachments parsed.');
  setOutput('changed', 'false');
  process.exit(0);
}

const relPath = path.join('cohorts', year, 'events', eventId, 'index.md');
const absPath = path.join(process.cwd(), relPath);
if (!fs.existsSync(absPath)) {
  console.error(`Event page not found: ${relPath}`);
  setOutput('changed', 'false');
  process.exit(0);
}

const content = fs.readFileSync(absPath, 'utf8');

// Extract front matter
const fmStart = content.indexOf('---');
if (fmStart !== 0) {
  console.error('Front matter not found at top of file.');
  setOutput('changed', 'false');
  process.exit(0);
}
const fmEnd = content.indexOf('\n---', 3);
if (fmEnd < 0) {
  console.error('Front matter end not found.');
  setOutput('changed', 'false');
  process.exit(0);
}

const fmContent = content.substring(4, fmEnd).split('\n');
const body = content.substring(fmEnd + 4 + 1); // skip newline

// Remove existing attachments block from fmContent & collect existing if append
let inAttachments = false;
const keptLines = [];
let existing = [];

for (let i = 0; i < fmContent.length; i++) {
  const line = fmContent[i];
  if (!inAttachments && /^attachments\s*:\s*$/.test(line)) {
    inAttachments = true;
    // collect following indented lines as existing attachments
    let j = i + 1;
    const items = [];
    let current = null;
    while (j < fmContent.length) {
      const l = fmContent[j];
      if (l.startsWith('  - ')) {
        if (current) items.push(current);
        current = { title: '', url: '' };
      } else if (/^[A-Za-z0-9_]/.test(l) || /^\S/.test(l)) {
        break;
      } else if (current && l.trim().startsWith('title:')) {
        current.title = l.split(':').slice(1).join(':').trim().replace(/^"|"$/g, '');
      } else if (current && l.trim().startsWith('url:')) {
        current.url = l.split(':').slice(1).join(':').trim().replace(/^"|"$/g, '');
      }
      j++;
    }
    if (current) items.push(current);
    existing = items.filter((x) => x.title || x.url);
    i = j - 1; // skip consumed lines
    continue;
  }
  if (inAttachments) {
    // Skip until next top-level key detected (handled above)
    continue;
  }
  keptLines.push(line);
}

let merged = [];
if (mode === 'APPEND') {
  // Combine existing + new, avoid duplicates by title+url
  const seen = new Set();
  for (const it of existing.concat(newItems)) {
    const key = `${(it.title || '').toLowerCase()}|${(it.url || '').toLowerCase()}`;
    if (it.title && it.url && !seen.has(key)) {
      seen.add(key);
      merged.push(it);
    }
  }
} else {
  merged = newItems;
}

if (merged.length === 0) {
  console.error('No attachments to write after merge.');
  setOutput('changed', 'false');
  process.exit(0);
}

// Rebuild front matter with new attachments at end
const newFm = [...keptLines];
newFm.push('attachments:');
merged.forEach((it) => {
  newFm.push(`  - title: "${it.title.replace(/"/g, '\\"')}"`);
  newFm.push(`    url: "${it.url.replace(/"/g, '\\"')}"`);
});

const newContent = `---\n${newFm.join('\n')}\n---\n\n${body}`;

fs.writeFileSync(absPath, newContent, 'utf8');

const branch = `event-attachments/${year}-${eventId}-${Date.now()}`;
setOutput('branch', branch);
setOutput('slug', `${year}-${eventId}`);
setOutput('changed', 'true');

console.log(`Updated attachments for ${relPath}`);

