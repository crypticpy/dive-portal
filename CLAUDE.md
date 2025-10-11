# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the DIVE Data Learning Cohorts Gallery, a static Jekyll website showcasing City of Austin DIVE program cohort projects. The site is built with Jekyll, styled with Tailwind CSS, and hosted on GitHub Pages. All content management is handled through GitHub's web UI, with GitHub Actions automating deployment, validation, and content scaffolding.

## Development Commands

### Local Development
```bash
# Install Ruby dependencies
bundle install

# Install Node dependencies
npm install

# Build CSS from Tailwind (watch mode)
npm run watch:css

# Build CSS (production)
npm run build:css

# Serve the site locally (requires Jekyll and Ruby)
bundle exec jekyll serve

# Full production build
npm run build
```

### Testing and Validation
```bash
# Validate team front matter (run from repo root)
ruby scripts/check_front_matter.rb

# Check file sizes (ensures no files exceed 50MB)
ruby scripts/check_file_sizes.rb
```

## Architecture

### Technology Stack
- **Static Site Generator**: Jekyll 4.3 with Liquid templating
- **Styling**: Tailwind CSS (compiled to static CSS via GitHub Actions)
- **Search**: Lunr.js for client-side search
- **Hosting**: GitHub Pages
- **Automation**: GitHub Actions for CI/CD

### Key Directories
- `_layouts/`: Page templates (default, cohort, team)
- `_includes/`: Reusable UI components (cards, filters, header, footer, etc.)
- `_data/cohorts/`: YAML files defining cohort schedules, events, materials, and policies
- `cohorts/YYYY/teams/<slug>/`: Individual team project pages with front matter + markdown
- `assets/css/`: Compiled Tailwind CSS output
- `assets/js/`: Client-side JavaScript (filters.js, search.js, lunr.min.js)
- `.github/workflows/`: GitHub Actions for deployment, validation, and automation
- `scripts/`: Ruby/Node scripts for validation and scaffolding

### Layouts
- **default.html**: Base layout with header, navigation, footer
- **cohort.html**: Cohort landing pages with timeline, materials, and filterable team grid
- **team.html**: Individual team project pages with metadata, deliverables, and content

### Key Includes
- **feature-card.html**: Project showcase cards
- **team-card.html**: Team grid cards with filtering support
- **filter-controls.html**: Client-side filter UI for department, track, and tags
- **timeline.html**: Event timeline visualization
- **materials.html**: Learning resources display
- **header.html** / **footer.html**: Site navigation and footer

## Content Model

### Team Projects (`cohorts/YYYY/teams/<slug>/index.md`)
Each team has a Markdown file with extensive YAML front matter:
- **Required fields**: layout, title, slug, cohort, department, track, summary, tags
- **Optional fields**: coach, members, links (dashboard_url, poster_pdf, idea_sheet_pdf), methods, thumbnail, thumbnail_alt, accessibility
- **Body**: Markdown content for project findings, impact, and next steps

### Cohort Data (`_data/cohorts/YYYY.yml`)
Defines the structure for a cohort year:
- **events**: Array of events with id, name, date, time, location
- **materials**: Learning resources grouped by category (essentials, workshops)
- **policies**: Array of program policies and guidelines

## GitHub Actions Workflows

### Deployment
- **jekyll.yml**: Builds and deploys to GitHub Pages on push to main
  - Compiles Tailwind CSS
  - Builds Jekyll site with production baseurl
  - Deploys to GitHub Pages

### Content Automation
- **new-team.yml**: Triggered when an issue with `content:new-team` label is created
  - Parses issue form data
  - Runs `scripts/new_team_from_issue.js` to scaffold team files
  - Creates PR with new team content

- **new-year.yml**: Manually triggered workflow to scaffold a new cohort year
  - Runs `scripts/scaffold_year.rb`
  - Creates directory structure for new cohort
  - Creates default data file in `_data/cohorts/`

- **poster-thumb.yml**: Generates thumbnails from poster PDFs
  - Triggered on PR when `poster.pdf` is added/modified
  - Uses ImageMagick to create `thumb.jpg` from first page
  - Auto-commits thumbnails to the PR branch

### Validation
- **validate.yml**: Runs on all PRs to main
  - Checks all team front matter has required fields
  - Validates no files exceed 50MB size limit

## Styling and Branding

### Official City of Austin Brand Colors
All colors in `tailwind.config.js` align with the official City of Austin brand palette (see `austin_brand.md`). The color palette is organized into three tiers:

**Official Palette:**
- **Logo Blue** (#44499C) - `brand-indigo`: Primary brand color for interactive elements
- **Logo Green** (#009F4D) - `brand-sea`: Primary brand color for accents
- **Faded White** (#f7f6f5) - `brand-cream`, `surface-base`: Background colors

**Supporting Palette:**
- **Dark Blue** (#22254E) - `brand-navy`: Headings and primary text
- **Compliant Green** (#008743) - `brand-forest`: Secondary green accent
- **Dark Green** (#005027) - `brand-darkGreen`: Additional green hierarchy
- **Light Blue** (#dcf2fd) - `surface-lightBlue`: Light backgrounds
- **Light Green** (#dff0e3) - `surface-lightGreen`: Light backgrounds

**Extended Palette:**
- **Cyan** (#009CDE) - `brand-sky`: Interactive elements and links
- **Yellow** (#FFC600) - `brand-gold`: Alert and highlight color
- **Orange** (#FF8F00) - `brand-amber`: Secondary accent
- **Red** (#F83125) - `brand-red`: Error states
- **Purple** (#9F3CC9) - `brand-purple`: Additional accent
- **Brown** (#8F5201) - `brand-brown`: Additional accent
- **Dark Gray** (#636262) - `brand-slate`, `brand-stone`: Body text
- **Light Gray** (#C6C5C4) - `brand-cloud`: Secondary text and borders
- **Black** (#000000) - `brand-black`: Maximum contrast text

### Color Usage Guidelines
- **Primary interactive elements**: Use `brand-sky` (Cyan) or `brand-indigo` (Logo Blue)
- **Headings**: Use `brand-navy` (Dark Blue)
- **Body text**: Use `brand-slate` or `brand-stone` (Dark Gray)
- **Backgrounds**: Use `surface-base` (Faded White) or `surface-card` (White)
- **Accents**: Use `brand-sea` (Logo Green), `brand-forest` (Compliant Green), or `brand-gold` (Yellow)

### Typography
- **Headings**: Source Sans 3 (Google Fonts)
- **Body**: Inter (Google Fonts)

### CSS Build Process
Tailwind scans content files defined in `tailwind.config.js` and generates utility classes. The build process compiles `assets/css/tailwind.css` to `assets/css/site.css`. Always run `npm run build:css` after modifying Tailwind configuration.

## Client-Side Features

### Filtering (filters.js)
Teams can be filtered by:
- Department (derived from team front matter)
- Track (program curriculum track)
- Tags (project keywords)

Filters use URL hash parameters to maintain state across page loads.

### Search (search.js + lunr.js)
Client-side search indexes:
- Team titles
- Summaries
- Tags

Search index is built at Jekyll build time from page front matter.

## Development Workflow

### Adding a New Team
1. Create GitHub issue using "Add team (creates PR)" template
2. Fill out form with team metadata
3. GitHub Action auto-creates PR with scaffolded `index.md`
4. Upload `poster.pdf` and `idea-sheet.pdf` via GitHub web UI
5. Thumbnail generation workflow auto-creates `thumb.jpg`
6. Review and merge PR to publish

### Adding a New Cohort Year
1. Go to Actions tab, select "Start new cohort year"
2. Run workflow with desired year (e.g., 2026)
3. Review and merge PR with scaffolded structure
4. Edit `_data/cohorts/YYYY.yml` to add events, materials, policies

### Making Design Changes
1. Edit Tailwind classes in `_layouts/` and `_includes/`
2. Run `npm run watch:css` during development
3. Test locally with `bundle exec jekyll serve`
4. Push changes; GitHub Actions rebuilds CSS and deploys

## Accessibility Requirements

The site must meet WCAG 2.1 AA standards:
- All images must have descriptive `alt` text
- Embedded iframes must have `title` attributes
- High-contrast color palette and clear focus states
- All PDF deliverables must be tagged for accessibility before upload

## Repository Constraints

- **Max repo size**: 1 GB (GitHub Pages limit)
- **Max file size**: 50 MB (enforced by validation script)
- **No Git LFS**: GitHub Pages does not serve LFS files
- **Branch protection**: Main branch requires PR with passing checks

## Important Files

- `_config.yml`: Jekyll configuration with site metadata, baseurl, plugins
- `package.json`: Node dependencies and CSS build scripts
- `Gemfile`: Ruby gem dependencies
- `tailwind.config.js`: Tailwind CSS configuration with brand colors
- `spec.md`: Original software project specification document
