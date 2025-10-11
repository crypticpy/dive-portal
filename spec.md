Of course. Here is the information structured as a formal Software Project Enhancement a.k.a. SPEC document that you can provide to an AI developer for implementation.

---

## **SPEC Document: DIVE Data Learning Cohorts Gallery**

Version: 1.0

Date: October 10, 2025

Status: Scoping

---

### **1.0 Introduction**

#### **1.1 Project Overview**

This document outlines the specifications for the "DIVE Data Learning Cohorts Gallery," a static website designed to showcase projects from the City of Austin's DIVE data learning program. The entire system will be self-contained within a single GitHub repository, leveraging GitHub Pages for hosting and GitHub Actions for automation. The administrative workflow is designed to be entirely managed through the GitHub web UI, eliminating the need for external databases, servers, or complex CMS platforms.

#### **1.2 Goals and Objectives**

* **Primary Goal:** To create a modern, accessible, and maintainable public-facing gallery of DIVE cohort projects.
* **Ease of Management:** Enable non-technical administrators to manage all content (e.g., adding new cohorts, teams, and project deliverables) using only the GitHub web interface.
* **Automation:** Implement a robust set of automated workflows to handle repetitive tasks like scaffolding new cohort structures, generating project pages from issue forms, creating image thumbnails, and validating content.
* **Performance & Security:** Deliver a fast, secure, and reliable user experience by utilizing a static site architecture.

#### **1.3 Target Audience**

* **Content Administrators:** City staff, program managers, and coaches responsible for updating the website with new cohort information and team projects.
* **Public Viewers:** City of Austin employees, stakeholders, and the general public interested in viewing the outcomes of the DIVE program.

---

### **2.0 Technical Architecture**

#### **2.1 Core Technologies**

* **Static Site Generator:** Jekyll
* **Templating Language:** Liquid
* **Content Formats:** Markdown (for content), YAML (for data and metadata)
* **Hosting:** GitHub Pages
* **CI/CD & Automation:** GitHub Actions
* **Frontend Styling:** Tailwind CSS (compiled to a static CSS file via GitHub Actions)
* **Client-Side Search:** Lunr.js or Fuse.js, indexing a static** **`search.json` file.

#### **2.2 Hosting Environment**

The website will be published and hosted directly from the GitHub repository using the GitHub Pages service. A custom GitHub Actions workflow will be used for the build and deployment process.

#### **2.3 Constraints and Limitations**

* **Repository Size:** The published site must not exceed the GitHub Pages limit of 1 GB.
* **Bandwidth:** The site is subject to the GitHub Pages soft bandwidth limit of 100 GB per month.
* **Asset Size:** Individual binary assets (e.g., PDFs) should be kept under 50 MB to prevent repository bloat. An automated check will enforce this.
* **Git LFS:** Git Large File Storage (LFS)** ****must not** be used, as GitHub Pages does not serve files stored via LFS.

---

### **3.0 Content and Data Model**

#### **3.1 Repository Structure**

The project will be organized within a single repository with the following directory structure:

**Plaintext**

```
cityofaustin/dive-gallery/
├─ .github/
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ new-team.yml
│  │  └─ new-year.yml
│  └─ workflows/
│     ├─ pages.yml         # Build & Deploy
│     ├─ validate.yml      # PR Checks (file size, front matter)
│     ├─ poster-thumb.yml  # Auto-generate poster thumbnail
│     ├─ new-team.yml      # Create PR from new-team issue
│     └─ new-year.yml      # Scaffold new cohort year
├─ _config.yml             # Jekyll main configuration
├─ _data/
│  ├─ cohorts/
│  │  └─ 2025.yml          # Data for the 2025 cohort
│  └─ taxonomies.yml        # Controlled vocabularies (tags, tracks, etc.)
├─ _includes/              # Reusable UI components (card, filters, nav)
├─ _layouts/               # Page templates (default, cohort, team)
├─ assets/
│  ├─ css/site.css
│  └─ js/{filters.js, lunr.min.js, search.js}
└─ cohorts/
   └─ 2025/
      ├─ index.md          # Landing page for the 2025 cohort
      └─ teams/
         └─ <team-slug>/
            ├─ index.md    # Team page content and metadata
            ├─ poster.pdf
            ├─ idea-sheet.pdf
            └─ thumb.jpg   # Auto-generated from poster.pdf
```

#### **3.2 Cohort Data Model (`_data/cohorts/YYYY.yml`)**

This YAML file defines the schedule, learning materials, and policies for a specific cohort year.

**YAML**

```
year: 2025
events:
  - id: kickoff
    name: "Kickoff"
    date: "2025-08-20"
    location: "Online"
  - id: midpoint
    name: "Midpoint Project Check‑in"
    date: "2025-10-02"
    time: "13:30–16:00"
    location: "Austin City Hall, Council Chambers"
  - id: final
    name: "Final Celebration & Poster Showcase"
    date: "2025-11-05"
    location: "Austin City Hall"
materials:
  essentials:
    - { title: "Data Storytelling", type: "slide-deck", url: "/learning/2025/data-storytelling.pdf" }
    - { title: "Austin Open Data Portal – intro", type: "guide", url: "https://data.austintexas.gov/" }
policies:
  - "No PII; publish only approved public data."
  - "Accessibility: WCAG 2.1 AA for posted assets."
```

#### **3.3 Team Content Model (`cohorts/YYYY/teams/<slug>/index.md`)**

Each team project is a Markdown file with extensive YAML front matter for metadata. The body of the file contains the project's narrative content (e.g., findings, impact).

**YAML**

```
---
layout: team
title: "On‑Time Transit Analytics"
slug: transit-on-time
cohort: 2025
department: "Austin Transportation"
track: "Data Science Essentials"
coach:
  name: "Jane Smith"
  email: "jane.smith@austintexas.gov"
members:
  - name: "A. Patel"
  - name: "B. Nguyen"
links:
  dashboard_url: "https://public.tableau.com/..."
  poster_pdf: "/cohorts/2025/teams/transit-on-time/poster.pdf"
  idea_sheet_pdf: "/cohorts/2025/teams/transit-on-time/idea-sheet.pdf"
summary: "Uses APC/AVL to analyze late arrivals on Bus Line 7 and recommend interventions."
methods: ["SQL","Pandas","Power BI"]
tags: ["transportation","reliability","apc","avl"]
thumbnail: "/cohorts/2025/teams/transit-on-time/thumb.jpg"
accessibility:
  dashboard_title: "Transit On‑Time dashboard"
---

Detailed project description, findings, impact, and next steps go here...
```

---

### **4.0 Features and Functionality**

#### **4.1 Public-Facing Site**

* **Cohort Landing Pages:** Each cohort year will have a dedicated landing page displaying its schedule, learning materials, and a filterable gallery of team projects.
* **Filterable Team Gallery:** Users can filter the project cards by department, track, and tags.
* **Team Detail Pages:** Each project has a detailed page showing its summary, members, links to deliverables (dashboard, poster), and full project narrative.
* **Client-Side Search:** A search functionality will allow users to find teams by keywords across titles, summaries, and tags.

#### **4.2 Administrative Interface (GitHub UI)**

* **New Cohort Creation:** A manually triggered GitHub Action allows an admin to scaffold the entire directory and data file structure for a new cohort year.
* **New Team Creation:** Admins will use a GitHub Issue Form to submit the metadata for a new team. This will automatically generate the required files and open a Pull Request.
* **File Uploads:** Deliverables like PDFs are uploaded by dragging and dropping them into the correct folder within the Pull Request branch in the GitHub UI.
* **Content Review:** All content changes are managed via Pull Requests, which provide a space for review, validation checks, and deployment previews before merging.

#### **4.3 Automation Workflows (GitHub Actions)**

1. **Build & Deploy:** On every push to the** **`main` branch, an action will build the Jekyll site (including compiling Tailwind CSS) and deploy the static output to GitHub Pages.
2. **Content Validation:** On every Pull Request, an action will run checks to ensure no files exceed the 50 MB size limit and that all required front matter keys are present in team markdown files.
3. **Poster Thumbnail Generation:** When a** **`poster.pdf` is added or updated in a Pull Request, an action will automatically generate a** **`thumb.jpg` from the first page of the PDF and commit it to the same branch.
4. **New Team from Issue:** When an issue with the** **`content:new-team` label is created, an action will parse the issue body, create a new branch, generate the team's** **`index.md` file, and open a Pull Request.
5. **Scaffold New Year:** A manually triggered (`workflow_dispatch`) action that prompts for a year and creates the necessary directories and default data files for that new cohort.

---

### **5.0 User Workflows (Admin)**

#### **5.1 Workflow: Scaffolding a New Cohort Year**

1. Admin navigates to the "Actions" tab in the GitHub repository.
2. Selects the "Start new cohort year" workflow.
3. Clicks "Run workflow," enters the new year (e.g., "2026"), and submits.
4. The action runs, creating a new branch and a Pull Request containing the folder** **`cohorts/2026/` and the data file** **`_data/cohorts/2026.yml`, pre-filled with default values.
5. Admin reviews and merges the Pull Request.

#### **5.2 Workflow: Adding a New Team Project**

1. Admin navigates to the "Issues" tab and clicks "New issue."
2. Selects the "Add team (creates PR)" template.
3. Fills out the form fields (Title, Department, Summary, etc.) and submits the issue.
4. A GitHub Action is triggered, which automatically creates a new branch and opens a Pull Request with the** **`index.md` file for the team, populated with the data from the issue form.
5. Admin navigates to the created Pull Request and branch.
6. In the appropriate team folder (`cohorts/YYYY/teams/<slug>/`), the admin uploads the** **`poster.pdf` and** **`idea-sheet.pdf`files using the GitHub UI's drag-and-drop functionality.
7. The thumbnail generation action automatically runs and pushes the** **`thumb.jpg` to the branch.

#### **5.3 Workflow: Content Review and Publishing**

1. The Pull Request now contains the team's metadata file and all associated deliverables.
2. Validation checks (file size, front matter keys) run automatically and must pass.
3. A deployment preview link is posted as a comment in the PR for final review.
4. A designated reviewer approves the changes.
5. The admin merges the Pull Request into the** **`main` branch.
6. The final "Build & Deploy" action is triggered, publishing the changes to the live GitHub Pages site.

---

### **6.0 User Interface and Experience (UI/UX)**

#### **6.1 Layouts**

* **`default`:** Base layout including header, navigation, and footer.
* **`cohort`:** For cohort landing pages. Includes a hero section, an event timeline, links to materials, and the filterable team card grid.
* **`team`:** For individual team pages. Includes project metadata, an embed for the dashboard (if available), links to PDF assets, and the main content body.

#### **6.2 Styling and Branding**

* Styling will be implemented using Tailwind CSS.
* The build process will compile all styles into a single, minified** **`assets/css/site.css` file.
* City of Austin brand colors and typography will be configured using CSS variables for easy theming and maintenance.

#### **6.3 Accessibility**

The site must adhere to** ****WCAG 2.1 AA** standards.

* All images must have descriptive** **`alt` text. The thumbnail will be generated with appropriate alt text.
* Embedded** **`iframe` elements (e.g., for dashboards) must have a** **`title` attribute.
* UI must feature a high-contrast color palette and clear focus states for interactive elements.
* All PDF deliverables must be tagged for accessibility before being uploaded.

---

### **7.0 Governance and Compliance**

* **Roles:** Repository will use GitHub's standard permission levels. Program staff will have "Maintainer" roles, while coaches or other contributors can submit content via Issues and Pull Requests.
* **Branch Protection:** The** **`main` branch will be protected. Merging will require at least one review and the successful completion of the** **`validate.yml` status check.
* **Releases:** At the end of a cohort year, a Git tag (e.g.,** **`v2025-final`) will be created to preserve a snapshot of the site for archival purposes.
