# DIVE Data Learning Cohorts Portal

A portal for City of Austin DIVE program cohort projects, managed entirely through GitHub's web interface.

**Live Site:** [cityofaustin.github.io/dive-gallery](https://cityofaustin.github.io/dive-gallery)

---

## What is This?

The DIVE Portal is the public hub for the City of Austin's DIVE (Data, Insight, Visualization, and Evaluation) data learning program. The Gallery is a section of the portal that showcases finished team projects. Each cohort of DIVE participants creates data-driven projects that are featured with:

- Project summaries and findings
- Team member information
- Interactive dashboards
- Downloadable posters and documentation
- Searchable and filterable project gallery

**The best part:** You manage all content through GitHub's web interface—no command line, no coding, no local software installation required!

---

## 🌟 Quick Start: Find Your Guide

Choose the guide that matches your role:

### 📊 **Content Managers & Program Coordinators**
You want to add teams, update schedules, and manage cohort content using GitHub's web interface.

**→ Start here:** [Admin Getting Started Guide](docs/admin-getting-started.md)

This friendly, step-by-step guide walks you through:
- Starting a new cohort year
- Adding team projects
- Uploading materials and deliverables
- Managing the cohort lifecycle

**No technical experience needed!** Everything happens in your web browser.

### 👨‍💻 **Developers & Designers**
You want to customize the look and feel, modify layouts, or extend the platform's functionality.

**→ Start here:** [Technical Guide](TECHNICAL-GUIDE.md)

This comprehensive developer guide covers:
- Local development setup
- Architecture and build system
- Customization patterns
- Deployment and workflows

**Assumes fullstack development experience.**

### 🤖 **AI Assistants**
You're Claude, Copilot, or another AI helping with this codebase.

**→ Start here:** [CLAUDE.md](CLAUDE.md)

---

## How Content Management Works

### The GitHub-First Workflow

This site uses **GitHub as a content management system (CMS)**. Here's how it works:

```
1. You create an issue or upload a file through GitHub's web interface
2. GitHub Actions (automation) generates the necessary files
3. Changes are proposed in a Pull Request for review
4. When approved and merged, the site automatically rebuilds and deploys
5. Your changes are live in about 2 minutes!
```

**No local development environment needed.** Everything happens in your browser on GitHub.com.

### What You Can Do (No Coding Required)

✅ **Create a new cohort year** - Start a fresh cohort with one click
✅ **Add team projects** - Fill out a form, automation creates the page
✅ **Upload deliverables** - Drag and drop PDFs right into GitHub
✅ **Update schedules** - Edit event timelines through issue forms
✅ **Manage materials** - Add learning resources and workshop links
✅ **Review changes** - Approve content before it goes live

### What Happens Automatically

🤖 **Thumbnail generation** - Upload a poster PDF, get a thumbnail automatically
🤖 **Site deployment** - Merge a change, site rebuilds and deploys automatically
🤖 **Content validation** - Pull requests are checked for required information
🤖 **File scaffolding** - Issue forms create properly structured files for you

---

## Site Features

### For Site Visitors
- **Cohort landing pages** - Browse projects by year with timelines and materials
- **Filterable gallery** - Find projects by department, track, or topic tags
- **Search** - Keyword search across all projects
- **Team pages** - Detailed project information, dashboards, and deliverables
- **Responsive design** - Works on desktop, tablet, and mobile
- **Accessible** - Meets WCAG 2.1 AA standards

### For Content Managers
- **GitHub issue forms** - Structured templates guide you through adding content
- **Pull request reviews** - Preview changes before publishing
- **Automated validation** - Catch errors before content goes live
- **Version history** - See what changed and when, rollback if needed
- **Collaboration** - Multiple team members can manage content safely

---

## Common Tasks

### Adding a New Team
1. Go to **Issues → New issue**
2. Select **"Add team (creates PR)"** template
3. Fill out the form with team details
4. Submit the issue
5. GitHub creates a Pull Request with the team page
6. Upload poster and idea sheet PDFs to the PR
7. Review and merge to publish

**Detailed walkthrough:** [Admin Getting Started Guide - Section 4](docs/admin-getting-started.md#4-add-and-maintain-team-pages)

### Starting a New Cohort
1. Go to **Actions → Scaffold new cohort year**
2. Click **Run workflow**
3. Enter the year (e.g., 2026)
4. Review the Pull Request with scaffolded files
5. Merge to activate the new cohort

**Detailed walkthrough:** [Admin Getting Started Guide - Section 2](docs/admin-getting-started.md#2-start-a-new-cohort-year)

### Updating the Schedule
1. Go to **Issues → New issue**
2. Select **"Update cohort schedule"** template
3. Paste your event list (formatted as YAML)
4. Submit the issue
5. Review the Pull Request with updated timeline
6. Merge to publish changes

**Detailed walkthrough:** [Admin Getting Started Guide - Section 3](docs/admin-getting-started.md#3-manage-the-cohort-schedule)

---

## Repository Structure

Here's what's in this repository and where content lives:

```
dive-gallery/
├── cohorts/
│   └── 2025/                      # Cohort year directory
│       ├── index.md              # Cohort landing page
│       └── teams/
│           └── team-name/        # Individual team directory
│               ├── index.md      # Team page content
│               ├── poster.pdf    # Project poster
│               ├── idea-sheet.pdf# Initial project proposal
│               └── thumb.jpg     # Auto-generated thumbnail
│
├── _data/
│   ├── cohorts/
│   │   └── 2025.yml             # Cohort schedule, materials, policies
│   └── taxonomies.yml            # Department, track, and tag options
│
├── docs/
│   └── admin-getting-started.md # Content manager guide
│
├── TECHNICAL-GUIDE.md            # Developer customization guide
└── README.md                     # This file
```

### Where Content Lives

| Content Type | Location | Managed Via |
|-------------|----------|-------------|
| Team projects | `cohorts/YYYY/teams/<slug>/` | Issue form → PR |
| Cohort schedule | `_data/cohorts/YYYY.yml` | Issue form → PR |
| Deliverables (PDFs) | Same as team project | Upload to PR branch |
| Taxonomies | `_data/taxonomies.yml` | Edit via GitHub UI |

---

## Content Model Quick Reference

### Team Page Requirements

Each team page needs:

**Required Information:**
- Team title
- Project summary (one sentence)
- Department
- Track (program curriculum)
- Tags (topic keywords)
- Cohort year

**Optional Information:**
- Coach name and email
- Team member names
- Dashboard URL
- Methods and tools used
- Project narrative (findings, impact)

**Deliverables:**
- `poster.pdf` - Final project poster
- `idea-sheet.pdf` - Initial project proposal
- `thumb.jpg` - Auto-generated from poster

### Cohort Data

Each cohort year needs:

- **Events timeline** - Kickoff, workshops, milestones, celebrations
- **Learning materials** - Links to resources, slide decks, guides
- **Policies** - Program guidelines and requirements

---

## Accessibility Standards

All content must meet **WCAG 2.1 AA** accessibility standards:

- ✅ All images must have descriptive alt text
- ✅ PDFs must be tagged for accessibility before upload
- ✅ Dashboards must have accessible titles
- ✅ High-contrast colors (automatically enforced by design)
- ✅ Keyboard navigation supported (automatically provided)

**Before uploading PDFs:** Ensure they are accessibility-tagged in Adobe Acrobat or your PDF tool.

---

## Repository Limits

GitHub Pages has some constraints to keep in mind:

| Limit | Value | What This Means |
|-------|-------|-----------------|
| **Repository size** | 1 GB max | Keep total size under 1 GB |
| **File size** | 50 MB max | Keep individual files under 50 MB |
| **Bandwidth** | 100 GB/month | Typical usage is well under this |
| **Builds** | 10 per hour | Site rebuilds are throttled |

**💡 Tip:** Poster PDFs should be under 10 MB. Compress if needed before upload.

---

## Troubleshooting

### "Validation failed" on Pull Request

**What happened:** Content is missing required information or files are too large.

**How to fix:**
1. Click on the failed check to see details
2. Common issues:
   - Missing required field (title, summary, tags, etc.)
   - File exceeds 50 MB
   - Invalid YAML syntax
3. Edit the file in the PR to fix the issue
4. Re-run the validation check

### Poster thumbnail not generating

**What happened:** The thumbnail generation workflow didn't run.

**How to fix:**
1. Ensure `poster.pdf` exists in the team folder
2. Check that the PR is from a branch (not a fork)
3. Re-run the "Generate poster thumbnails" workflow manually from the Actions tab

### Changes not appearing on live site

**What happened:** Site hasn't rebuilt yet or build failed.

**How to fix:**
1. Go to **Actions** tab
2. Check the latest "Build & Deploy" workflow
3. If failed, click to see error details
4. If successful, wait 2-3 minutes for GitHub Pages to serve updated content
5. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

### Need to undo a change

**What happened:** You merged something you didn't mean to.

**How to fix:**
1. Don't panic! Everything in Git is versioned
2. Go to the **Code** tab → **Commits**
3. Find the commit you want to revert
4. Click the commit, then "Revert" button
5. This creates a new PR that undoes the change

**💡 Remember:** You can't permanently break anything! All changes are tracked and reversible.

---

## Getting Help

### Documentation
- **Content managers:** [Admin Getting Started Guide](docs/admin-getting-started.md)
- **Developers:** [Technical Guide](TECHNICAL-GUIDE.md)
- **Brand guidelines:** [Austin Brand Guide](austin_brand.md)
- **Original specification:** [spec.md](spec.md)

### Support Channels
- **Issues tab** - Report bugs or request features
- **Discussions tab** - Ask questions and share ideas
- **Engineering team** - Contact maintainers for urgent technical issues

### Useful GitHub Resources
- [GitHub Issues Guide](https://docs.github.com/en/issues)
- [GitHub Pull Requests Guide](https://docs.github.com/en/pull-requests)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## Contributing

We welcome contributions! Here's how to help:

1. **Report issues** - Found a bug? Open an issue
2. **Suggest improvements** - Have an idea? Start a discussion
3. **Submit content** - Use the issue templates to add teams or update schedules
4. **Review pull requests** - Help review pending content changes

### Content Guidelines
- Follow the issue templates for consistency
- Ensure all required fields are completed
- Test links before submitting
- Keep deliverables under file size limits
- Make accessibility a priority

### Code Guidelines (for developers)
- Follow existing code style and patterns
- Test locally before submitting PRs
- Update documentation when changing behavior
- Ensure validation scripts pass
- See [Technical Guide](TECHNICAL-GUIDE.md) for development details

---

## Technical Details (For Reference)

**Technology Stack:**
- **Static site generator:** Jekyll 4.3
- **Styling:** Tailwind CSS 3.4
- **Search:** Lunr.js (client-side)
- **Hosting:** GitHub Pages
- **Automation:** GitHub Actions

**Brand:**
- **Typography:** Source Sans 3 (headings), Inter (body)
- **Colors:** Official City of Austin brand palette
- **Design:** Responsive, accessible, mobile-first

**Browser Support:**
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation for older browsers

**For full technical details:** See [Technical Guide](TECHNICAL-GUIDE.md)

---

## License & Ownership

This project is a public-sector initiative by the City of Austin. Content and code usage should follow City of Austin policies and program guidelines.

---

## Quick Links

### For Content Managers
- [👉 Get Started Managing Content](docs/admin-getting-started.md)
- [Create Issue for New Team](../../issues/new/choose)
- [View All Workflows](../../actions)
- [Browse Pull Requests](../../pulls)

### For Developers
- [👉 Technical Development Guide](TECHNICAL-GUIDE.md)
- [Brand Guidelines](austin_brand.md)
- [Original Specification](spec.md)
- [AI Assistant Guide](CLAUDE.md)

### Live Site
- [🌐 Visit Live Portal](https://cityofaustin.github.io/dive-gallery)

---

**Welcome to the DIVE Portal!** Whether you're managing content or customizing code, we're glad you're here. Pick your guide above and let's get started! 🚀
