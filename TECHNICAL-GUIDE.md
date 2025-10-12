# DIVE Portal Technical Guide

**Audience:** Fullstack developers customizing or extending the platform
**Prerequisites:** Familiarity with Jekyll, JavaScript, CSS, Git, and GitHub Actions

This guide covers local development setup, architecture, customization patterns, and deployment for developers who want to modify the DIVE Data Learning Cohorts Portal platform. The Gallery is a section of the portal that showcases finished team projects.

---

## Table of Contents

1. [Local Development Setup](#local-development-setup)
2. [Architecture Overview](#architecture-overview)
3. [Build System](#build-system)
4. [Content Model](#content-model)
5. [Layouts and Templates](#layouts-and-templates)
6. [Styling and Theming](#styling-and-theming)
7. [Client-Side Features](#client-side-features)
8. [GitHub Actions Workflows](#github-actions-workflows)
9. [Validation and Testing](#validation-and-testing)
10. [Deployment](#deployment)
11. [Customization Patterns](#customization-patterns)
12. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Prerequisites

- **Ruby 3.3.9** (managed via `rbenv`)
- **Bundler** (`gem install bundler`)
- **Node.js 18+** and npm
- **Jekyll** (`gem install jekyll`)
- **Git**

### Initial Setup

#### 1. Install rbenv and Ruby

```bash
# Install rbenv (if not already installed)
brew install rbenv ruby-build

# Initialize rbenv in your shell
echo 'eval "$(rbenv init -)"' >> ~/.zshrc  # or ~/.bashrc
source ~/.zshrc

# Install Ruby 3.3.9
rbenv install 3.3.9
rbenv local 3.3.9

# Verify Ruby version
ruby -v  # Should show 3.3.9
which ruby  # Should point to ~/.rbenv/versions/3.3.9/...
```

#### 2. Install Dependencies

```bash
# Install Ruby gems via Bundler
rbenv exec bundle install

# Install Node dependencies
npm install
```

### Running Locally

#### Option 1: Two Terminal Setup (Recommended)

**Terminal 1 - Tailwind CSS (watch mode):**
```bash
npm run watch:css
```
This watches for changes to HTML/Liquid files and recompiles CSS automatically.

**Terminal 2 - Jekyll server:**
```bash
rbenv exec bundle exec jekyll serve
```
Site available at: `http://localhost:4000`

#### Option 2: Single Build

```bash
# Build CSS once, then serve
npm run build:css
rbenv exec bundle exec jekyll serve
```

### Production Build

```bash
# Build CSS + Jekyll site for production
npm run build
```
Output in `_site/` directory.

### Common Commands

```bash
# CSS only
npm run build:css          # Minified production build
npm run watch:css          # Watch mode for development

# Jekyll only
bundle exec jekyll serve   # Development server
bundle exec jekyll build   # Production build
bundle exec jekyll doctor  # Check configuration

# Validation
ruby scripts/check_front_matter.rb   # Validate team YAML
ruby scripts/check_file_sizes.rb     # Check for >50MB files

# Full build (CSS + Jekyll)
npm run build
```

---

## Architecture Overview

### Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Static Site Generator** | Jekyll 4.3 | Transforms Markdown + YAML → HTML |
| **Templating** | Liquid | Dynamic content in templates |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS framework |
| **Client-Side Search** | Lunr.js | JavaScript search index |
| **Hosting** | GitHub Pages | Static site hosting |
| **CI/CD** | GitHub Actions | Build, deploy, validation automation |

### Directory Structure

```
dive-gallery/
├── _config.yml                 # Jekyll configuration
├── _data/                      # YAML data files
│   ├── cohorts/
│   │   └── 2025.yml           # Cohort schedule, materials, policies
│   └── taxonomies.yml         # Controlled vocabularies
├── _includes/                  # Reusable UI components
│   ├── header.html
│   ├── footer.html
│   ├── team-card.html
│   ├── filter-controls.html
│   └── [14 total components]
├── _layouts/                   # Page templates
│   ├── default.html           # Base layout
│   ├── cohort.html            # Cohort landing pages
│   └── team.html              # Team project pages
├── _plugins/                   # Jekyll plugins
│   └── search_index.rb        # Generates search.json for Lunr
├── assets/
│   ├── css/
│   │   ├── tailwind.css       # Source (input)
│   │   └── site.css           # Compiled (output)
│   └── js/
│       ├── filters.js         # Client-side filtering
│       ├── search.js          # Client-side search
│       └── lunr.min.js        # Search library
├── cohorts/
│   └── YYYY/                  # Cohort year directories
│       ├── index.md           # Cohort landing page
│       └── teams/
│           └── <slug>/        # Team project directories
│               ├── index.md   # Team page (YAML + Markdown)
│               ├── poster.pdf
│               ├── idea-sheet.pdf
│               └── thumb.jpg
├── scripts/                    # Automation scripts
│   ├── check_front_matter.rb
│   ├── check_file_sizes.rb
│   ├── new_team_from_issue.js
│   ├── scaffold_year.rb
│   └── update_schedule_from_issue.rb
└── .github/
    ├── ISSUE_TEMPLATE/        # Issue form templates
    └── workflows/             # GitHub Actions workflows
```

### Data Flow

```
1. Content Authors → GitHub Web UI (Issues, PRs, file uploads)
2. GitHub Actions → Trigger on issue/PR/push
3. Scripts → Parse issue data, scaffold files
4. Jekyll Build → Transform Markdown + YAML → HTML
5. Tailwind Build → Scan content → Generate CSS
6. Plugin → Generate search.json from front matter
7. GitHub Pages → Deploy static _site/ to production
8. Visitors → Browse static HTML + client-side JS
```

---

## Build System

### CSS Build Pipeline

**Source:** `assets/css/tailwind.css`
**Output:** `assets/css/site.css`

#### Tailwind Configuration (`tailwind.config.js`)

```javascript
module.exports = {
  content: [
    './_includes/**/*.html',
    './_layouts/**/*.html',
    './cohorts/**/*.md',
    './assets/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        // City of Austin brand colors
        brand: {
          indigo: '#44499C',    // Logo Blue
          sea: '#009F4D',       // Logo Green
          navy: '#22254E',      // Dark Blue
          sky: '#009CDE',       // Cyan
          // ... (see tailwind.config.js for full palette)
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Source Sans 3', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
```

**Build process:**
1. Tailwind scans all files in `content` array
2. Extracts class names used in templates
3. Generates minimal CSS with only used utilities
4. Outputs minified CSS to `assets/css/site.css`

### Jekyll Build Pipeline

**Configuration:** `_config.yml`

Key Jekyll settings:
```yaml
title: "DIVE Data Learning Cohorts Portal"
baseurl: "/dive-gallery"
url: "https://cityofaustin.github.io"
timezone: "America/Chicago"
markdown: kramdown
permalink: pretty

plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap
  - jekyll-include-cache

exclude:
  - node_modules
  - scripts
  - README.md
  - spec.md
```

**Build process:**
1. Load `_config.yml` and `_data/` YAML files
2. Process Markdown files in `cohorts/` with front matter
3. Apply layouts from `_layouts/`
4. Insert includes from `_includes/`
5. Run custom plugin (`search_index.rb`)
6. Generate static HTML in `_site/`

---

## Content Model

### Team Page Structure

**Location:** `cohorts/YYYY/teams/<slug>/index.md`

**YAML Front Matter (required):**
```yaml
---
layout: team
title: "Project Title"              # Required
slug: team-slug                     # Required (URL-safe)
cohort: 2025                        # Required (year)
department: "Department Name"       # Required
track: "Track Name"                 # Required
summary: "One-sentence description" # Required
tags: [tag1, tag2]                  # Required (array)

coach:                              # Optional
  name: "Coach Name"
  email: "coach@austintexas.gov"

members:                            # Optional
  - name: "Member 1"
  - name: "Member 2"

links:                              # Optional
  dashboard_url: "https://..."
  poster_pdf: "/cohorts/.../poster.pdf"
  idea_sheet_pdf: "/cohorts/.../idea-sheet.pdf"

methods: [SQL, Python, Tableau]     # Optional

thumbnail: "/cohorts/.../thumb.jpg" # Optional
thumbnail_alt: "Thumbnail alt text" # Optional

accessibility:                      # Optional
  dashboard_title: "Dashboard title for screen readers"
---

Markdown content goes here...
```

**Validation script:** `scripts/check_front_matter.rb:7`

### Cohort Data Structure

**Location:** `_data/cohorts/YYYY.yml`

```yaml
year: 2025

events:                             # Timeline entries
  - id: kickoff                     # Required (unique ID)
    name: "Kickoff"                 # Required
    date: "2025-08-20"              # Required (YYYY-MM-DD)
    time: "13:30–16:00"             # Optional
    location: "Location"            # Optional
    description: "Details"          # Optional
    type: milestone                 # Optional: milestone|workshop|deadline
    state: completed                # Optional: upcoming|completed
    icon: rocket                    # Optional: rocket|workshop|star

materials:                          # Learning resources
  essentials:
    - title: "Resource Title"
      type: "slide-deck"            # slide-deck|guide|video|hands-on
      url: "/path/or/https://..."
  workshops:
    - title: "Workshop Title"
      type: "hands-on"
      url: "https://..."

policies:                           # Program policies
  - "Policy statement 1"
  - "Policy statement 2"
```

### Taxonomies

**Location:** `_data/taxonomies.yml`

Controlled vocabularies for consistency:
```yaml
departments:
  - Austin Transportation
  - Austin Public Health
  - Austin Water

tracks:
  - Data Science Essentials
  - Data Storytelling
  - Civic Analytics

tags:
  - transportation
  - reliability
  - health
  # ... (add as needed)
```

---

## Layouts and Templates

### Layout Hierarchy

```
default.html
├── cohort.html (extends default)
└── team.html (extends default)
```

### default.html (`_layouts/default.html`)

Base layout with header, navigation, footer.

**Structure:**
```liquid
<!DOCTYPE html>
<html>
  {% include head.html %}
  <body>
    {% include header.html %}
    <main>
      {{ content }}
    </main>
    {% include footer.html %}
  </body>
</html>
```

### cohort.html (`_layouts/cohort.html`)

For cohort landing pages (`cohorts/YYYY/index.md`).

**Features:**
- Hero section with cohort year
- Event timeline (via `timeline.html` include)
- Learning materials section (via `materials.html` include)
- Filterable team grid (via `filter-controls.html` and `team-card.html`)

**Accessing data:**
```liquid
{% assign year = page.cohort %}
{% assign cohort_data = site.data.cohorts[year] %}
{% assign events = cohort_data.events %}
```

### team.html (`_layouts/team.html`)

For individual team pages.

**Features:**
- Project metadata display
- Team members and coach info
- Dashboard embed (if `links.dashboard_url` exists)
- PDF download links (poster, idea sheet)
- Markdown content body
- Related projects section

**Accessing front matter:**
```liquid
{{ page.title }}
{{ page.summary }}
{% for member in page.members %}
  {{ member.name }}
{% endfor %}
```

---

## Styling and Theming

### Brand Colors

Based on official City of Austin brand guidelines (`austin_brand.md`).

**Tailwind config (`tailwind.config.js`):**
```javascript
colors: {
  brand: {
    indigo: '#44499C',   // Logo Blue
    sea: '#009F4D',      // Logo Green
    navy: '#22254E',     // Dark Blue
    forest: '#008743',   // Compliant Green
    sky: '#009CDE',      // Cyan
    gold: '#FFC600',     // Yellow
    red: '#F83125',      // Red
    slate: '#636262',    // Dark Gray
    cloud: '#C6C5C4',    // Light Gray
  },
  surface: {
    base: '#f7f6f5',     // Faded White
    card: '#ffffff',
    lightBlue: '#dcf2fd',
    lightGreen: '#dff0e3',
  }
}
```

**Usage guidelines:**
- **Primary interactive elements:** `brand-sky` or `brand-indigo`
- **Headings:** `brand-navy`
- **Body text:** `brand-slate`
- **Backgrounds:** `surface-base` or `surface-card`
- **Accents:** `brand-sea`, `brand-forest`, `brand-gold`

### Typography

```javascript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  heading: ['Source Sans 3', 'sans-serif']
}
```

**Usage:**
- Headings: `font-heading`
- Body text: `font-sans`

### Responsive Design

Tailwind breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Example:**
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop -->
</div>
```

### Custom Components

Reusable includes in `_includes/`:

| Include | Purpose | Parameters |
|---------|---------|------------|
| `button.html` | Styled button component | `text`, `href`, `style` |
| `badge.html` | Tag/label badges | `text`, `color` |
| `icon.html` | SVG icons | `name`, `size` |
| `team-card.html` | Team project card | (uses `team` object) |
| `feature-card.html` | Featured project showcase | (uses `post` object) |
| `filter-controls.html` | Filter UI for team grid | (no params) |
| `timeline.html` | Event timeline visualization | `events` |
| `materials.html` | Learning resources list | `materials` |
| `empty-state.html` | No results message | `message` |
| `loading.html` | Loading spinner | (no params) |

**Usage example:**
```liquid
{% include button.html
   text="View Dashboard"
   href=page.links.dashboard_url
   style="primary"
%}
```

---

## Client-Side Features

### Filtering (`assets/js/filters.js`)

**Features:**
- Filter teams by department, track, and tags
- URL hash parameters maintain filter state
- Real-time count updates
- Event delegation for performance

**Implementation:**
```javascript
// Filters are stored in URL hash
// Example: #department=Austin+Transportation&track=Data+Science

// Filter state is read on page load
// Cards are shown/hidden based on data attributes:
<div class="team-card"
     data-department="Austin Transportation"
     data-track="Data Science Essentials"
     data-tags="transportation,reliability">
```

**Data attributes on team cards:**
```liquid
<div class="team-card"
     data-department="{{ team.department }}"
     data-track="{{ team.track }}"
     data-tags="{{ team.tags | join: ',' }}">
```

### Search (`assets/js/search.js` + Lunr.js)

**Index generation:** `_plugins/search_index.rb:19`

The plugin runs at build time and generates `search.json`:
```json
[
  {
    "id": "cohorts/2025/teams/transit-on-time/",
    "title": "On-Time Transit Analytics",
    "summary": "Uses APC/AVL to analyze late arrivals...",
    "tags": ["transportation", "reliability", "apc", "avl"],
    "url": "/dive-gallery/cohorts/2025/teams/transit-on-time/"
  }
]
```

**Search fields** (configured in `_config.yml`):
```yaml
search_index:
  fields:
    - title
    - summary
    - tags
```

**Client-side search:**
```javascript
// Lunr.js creates in-memory index from search.json
// User types query → Lunr matches → Results displayed
// Matching team cards are highlighted/filtered
```

---

## GitHub Actions Workflows

### 1. Build & Deploy (`pages.yml`)

**Trigger:** Push to `main` branch
**Purpose:** Build and deploy to GitHub Pages

**Steps:**
1. Checkout code
2. Setup Ruby 3.3 + Bundler cache
3. Setup Node 18
4. `npm ci` (install dependencies)
5. `npm run build:css` (compile Tailwind)
6. `bundle exec jekyll doctor` (validate config)
7. `bundle exec jekyll build` (generate site)
8. Upload artifact to GitHub Pages
9. Deploy to GitHub Pages environment

### 2. Validate (`validate.yml`)

**Trigger:** Pull requests to `main`
**Purpose:** Ensure content quality

**Checks:**
- All team pages have required YAML front matter
- No files exceed 50MB
- Jekyll configuration is valid

**Scripts:**
- `ruby scripts/check_front_matter.rb`
- `ruby scripts/check_file_sizes.rb`

### 3. New Team (`new-team.yml`)

**Trigger:** Issue created with label `content:new-team`
**Purpose:** Auto-create team page from issue form

**Steps:**
1. Parse issue body (form data)
2. Run `scripts/new_team_from_issue.js`
3. Create branch `content/team-<slug>`
4. Generate `cohorts/<year>/teams/<slug>/index.md`
5. Commit and push
6. Open pull request

### 4. New Year (`new-year.yml`)

**Trigger:** Manual (`workflow_dispatch`)
**Purpose:** Scaffold new cohort year structure

**Steps:**
1. Prompt for year (e.g., 2026)
2. Run `scripts/scaffold_year.rb`
3. Create `cohorts/<year>/` directory structure
4. Create `_data/cohorts/<year>.yml` with defaults
5. Create `cohorts/<year>/index.md` landing page
6. Open pull request

### 5. Poster Thumbnail (`poster-thumb.yml`)

**Trigger:** PR with `poster.pdf` added/modified
**Purpose:** Auto-generate thumbnail from PDF

**Steps:**
1. Detect changed `poster.pdf` files
2. Use ImageMagick to convert first page → `thumb.jpg`
3. Resize to 400px width
4. Commit `thumb.jpg` to same PR branch

### 6. Update Schedule (`update-schedule.yml`)

**Trigger:** Issue created with label `content:schedule`
**Purpose:** Update cohort timeline from issue form

**Steps:**
1. Parse YAML event list from issue
2. Run `scripts/update_schedule_from_issue.rb`
3. Update `_data/cohorts/<year>.yml`
4. Commit and push to PR branch

### 7. Smoke Test (`smoke.yml`)

**Trigger:** Weekly schedule + manual
**Purpose:** Ensure site builds successfully

**Steps:**
1. Full build (CSS + Jekyll)
2. Run `jekyll doctor`
3. Report status

---

## Validation and Testing

### Front Matter Validation

**Script:** `scripts/check_front_matter.rb`

**Required fields:**
```ruby
REQUIRED_KEYS = %w[
  layout title slug cohort department
  track summary tags
]
```

**Run locally:**
```bash
ruby scripts/check_front_matter.rb
```

**Output:**
```
Checking cohorts/2025/teams/transit-on-time/index.md
  ✓ All required keys present

Checking cohorts/2025/teams/example-team/index.md
  ✗ Missing required keys: summary, tags
```

### File Size Validation

**Script:** `scripts/check_file_sizes.rb`

**Constraint:** No file > 50MB (GitHub Pages limit)

**Run locally:**
```bash
ruby scripts/check_file_sizes.rb
```

### Jekyll Doctor

Validates configuration and plugin setup:
```bash
bundle exec jekyll doctor
```

### Local Build Test

Full production build:
```bash
# Set production environment
export JEKYLL_ENV=production

# Build CSS
npm run build:css

# Build Jekyll
bundle exec jekyll build

# Check output
ls -lh _site/
```

---

## Deployment

### GitHub Pages Configuration

**Settings → Pages:**
- **Source:** GitHub Actions
- **Custom domain:** (none)
- **HTTPS:** Enforced

**URL:** `https://cityofaustin.github.io/dive-gallery`

### Deployment Process

1. **Merge to `main`** → Triggers `pages.yml` workflow
2. **Build step:**
   - Install Ruby/Node dependencies
   - Compile Tailwind CSS
   - Build Jekyll site
   - Generate search index
3. **Upload artifact:** `_site/` directory
4. **Deploy step:** Publish to GitHub Pages environment
5. **Live in ~2 minutes**

### Environment Variables

Set in GitHub Actions workflow (no secrets required):
```yaml
env:
  JEKYLL_ENV: production
```

### Repository Constraints

| Limit | Value | Enforced By |
|-------|-------|-------------|
| Max repo size | 1 GB | GitHub Pages |
| Max file size | 50 MB | Validation script |
| Bandwidth | 100 GB/month (soft) | GitHub Pages |
| Builds | 10 per hour | GitHub Actions |

**No Git LFS:** GitHub Pages does not serve LFS files.

---

## Customization Patterns

### Adding a New Layout

1. Create `_layouts/my-layout.html`
2. Extend `default.html`:
```liquid
---
layout: default
---
<div class="my-custom-wrapper">
  {{ content }}
</div>
```
3. Use in front matter:
```yaml
---
layout: my-layout
title: "My Page"
---
```

### Adding a New Include Component

1. Create `_includes/my-component.html`
2. Add parameters:
```liquid
<div class="component">
  <h3>{{ include.title }}</h3>
  <p>{{ include.description }}</p>
</div>
```
3. Use in layout/page:
```liquid
{% include my-component.html
   title="Hello"
   description="World"
%}
```

### Extending the Content Model

#### Add new field to team pages:

1. Update validation: `scripts/check_front_matter.rb`
```ruby
REQUIRED_KEYS = %w[... new_field]
```
2. Update issue template: `.github/ISSUE_TEMPLATE/new-team.yml`
```yaml
- type: input
  id: new_field
  attributes:
    label: "New Field"
  validations:
    required: true
```
3. Update scaffolding: `scripts/new_team_from_issue.js`
```javascript
const newField = getInput('new_field');
frontMatter += `new_field: "${newField}"\n`;
```
4. Use in template: `_layouts/team.html`
```liquid
<p>{{ page.new_field }}</p>
```

### Customizing Tailwind Theme

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      custom: {
        primary: '#123456',
        secondary: '#789ABC'
      }
    },
    spacing: {
      '128': '32rem',
    }
  }
}
```

Rebuild CSS:
```bash
npm run build:css
```

### Adding a New Workflow

1. Create `.github/workflows/my-workflow.yml`
2. Define trigger and jobs:
```yaml
name: My Workflow
on:
  push:
    branches: [main]
jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Do something
        run: echo "Hello"
```
3. Test via manual trigger or push

### Modifying Search Index

Edit `_plugins/search_index.rb`:
```ruby
# Add new field to index
content = {
  id: page.url,
  title: page.data['title'],
  summary: page.data['summary'],
  new_field: page.data['new_field'],  # Add this
  url: site.config['baseurl'] + page.url
}
```

Update `_config.yml`:
```yaml
search_index:
  fields:
    - title
    - summary
    - new_field  # Add this
```

Rebuild:
```bash
bundle exec jekyll build
```

---

## Troubleshooting

### CSS Not Updating

**Issue:** Changes to HTML don't reflect in CSS

**Solution:**
```bash
# Rebuild CSS (Tailwind scans content files)
npm run build:css

# Or use watch mode during development
npm run watch:css
```

### Jekyll Build Fails

**Issue:** `bundle exec jekyll build` errors

**Diagnose:**
```bash
bundle exec jekyll doctor  # Check configuration
bundle exec jekyll build --trace  # Verbose error output
```

**Common causes:**
- Missing front matter field
- Invalid YAML syntax
- Liquid template error

### Ruby Version Mismatch

**Issue:** Wrong Ruby version used

**Solution:**
```bash
# Ensure rbenv is initialized
eval "$(rbenv init -)"

# Check version
ruby -v  # Should be 3.3.9
which ruby  # Should be ~/.rbenv/...

# If wrong, reinstall
rbenv install 3.3.9
rbenv local 3.3.9
```

### Workflow Fails on GitHub

**Issue:** GitHub Actions workflow fails

**Debug:**
1. Go to Actions tab in GitHub
2. Click failed workflow
3. Expand failed step
4. Check error message

**Common causes:**
- Missing required file
- Invalid YAML in data file
- Script execution error

### Search Not Working

**Issue:** Search returns no results

**Debug:**
1. Check `_site/search.json` exists
2. Verify JSON format is valid
3. Check browser console for JS errors

**Solution:**
```bash
# Rebuild site (regenerates search.json)
bundle exec jekyll build

# Check plugin output
grep -r "search_index" _site/
```

### Local vs. Production Differences

**Issue:** Site works locally but not on GitHub Pages

**Causes:**
- **Baseurl:** Ensure `baseurl: "/dive-gallery"` in `_config.yml`
- **JEKYLL_ENV:** Set `JEKYLL_ENV=production` for local prod testing
- **Excluded files:** Check `exclude:` in `_config.yml`

**Test locally as production:**
```bash
export JEKYLL_ENV=production
npm run build:css
bundle exec jekyll build
```

---

## Performance Optimization

### Reduce Build Time

- Use Jekyll `incremental: true` in `_config.yml` (development only)
- Minimize Tailwind `content` globs
- Use `jekyll-include-cache` plugin (already enabled)

### Reduce Page Size

- Minify CSS: `npm run build:css` (already minified)
- Optimize images: Keep PDFs under 10MB, thumbnails under 200KB
- Lazy-load images: Add `loading="lazy"` to img tags

### Improve Client-Side Performance

- Use `defer` on non-critical JavaScript
- Minimize Lunr.js index size (limit fields in `_config.yml`)
- Use CSS containment for list items

---

## References

### Key Files

- Jekyll config: [`_config.yml`](_config.yml:1)
- Tailwind config: `tailwind.config.js`
- Search plugin: [`_plugins/search_index.rb`](_plugins/search_index.rb:19)
- Validation script: [`scripts/check_front_matter.rb`](scripts/check_front_matter.rb:7)
- Brand colors: [`austin_brand.md`](austin_brand.md:33)

### External Documentation

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lunr.js](https://lunrjs.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [GitHub Pages](https://docs.github.com/en/pages)

---

## Support

For technical questions or customization requests:
1. Check this guide
2. Review inline comments in code
3. Consult Jekyll/Tailwind documentation
4. Open issue in repository for bugs
5. Contact engineering maintainer for architecture questions

---

**Last Updated:** October 11, 2025
