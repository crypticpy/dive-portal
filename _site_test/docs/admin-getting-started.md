# DIVE Gallery: Getting Started Guide

**Welcome!** You've been chosen to help manage the DIVE Cohort Gallery, and we're glad you're here. This guide will walk you through everything you need to know to confidently manage cohort content using GitHub's web interface.

**Good news:** You don't need to be technical. Everything happens in your web browser, and automation handles the complex stuff. Let's get you started! 🚀

---

## 🌟 Before You Begin: You've Got This!

### New to GitHub? That's Okay!

If GitHub feels intimidating, you're not alone. Here's what you need to know:

**✅ You can't break anything permanently**
- Every change is version-controlled
- You can always undo changes
- Changes are reviewed before going live
- Practice in a test branch if you want

**✅ The interface guides you**
- Forms tell you what information is needed
- Workflows run automatically
- Validation catches errors before publishing
- You'll see exactly what's changing before it goes live

**✅ Help is available**
- This guide walks you through everything step-by-step
- Tooltips and descriptions appear in GitHub
- Your engineering team is here to help
- Questions are welcome!

### What You'll Be Doing

As a cohort coordinator, you'll use GitHub's web interface to:
- Start a new cohort year (once per year)
- Add team projects as they're submitted
- Upload posters and deliverables
- Update the cohort schedule and materials
- Review changes before they go live

All of this happens through **clicking, filling out forms, and drag-and-drop uploads** in your web browser. No command line. No coding. No local software installation.

---

## Table of Contents

1. [Access & Preparation](#1-access--preparation)
2. [Start a New Cohort Year](#2-start-a-new-cohort-year)
3. [Manage the Cohort Schedule](#3-manage-the-cohort-schedule)
4. [Add and Maintain Team Pages](#4-add-and-maintain-team-pages)
5. [Upload Cohort Materials & Policies](#5-upload-cohort-materials--policies)
6. [Seasonal Workflow Checklist](#6-seasonal-workflow-checklist)
7. [After the Active Season](#7-after-the-active-season)
8. [Troubleshooting & FAQ](#8-troubleshooting--faq)

---

## 1. Access & Preparation

### Getting Access

You'll need **write access** to the `cityofaustin/dive-gallery` repository on GitHub.

**How to check:**
1. Go to [github.com/cityofaustin/dive-gallery](https://github.com/cityofaustin/dive-gallery)
2. Look for tabs at the top: Code, Issues, Pull requests, Actions, etc.
3. If you see "Settings" tab, you have write access ✅
4. If you don't see "Settings," contact your engineering team to request access

**Enable notifications** so you see when automation creates Pull Requests:
1. Click "Watch" button (top-right of repository page)
2. Select "All Activity"
3. GitHub will email you when PRs are created

### Familiarize Yourself with the Layout

Take 5 minutes to explore the repository:

**Key tabs you'll use:**
- **Code tab** - Browse files and folders (you'll rarely need this)
- **Issues tab** - Where you create new teams and schedule updates
- **Pull requests tab** - Where you review and approve changes
- **Actions tab** - Where automation workflows run

**What each folder contains:**
- `cohorts/2025/` - All content for the 2025 cohort
- `cohorts/2025/teams/` - Individual team project folders
- `_data/cohorts/2025.yml` - Schedule, materials, policies for 2025

**💡 Tip:** You can click on any file in GitHub to view it, and click the pencil icon to edit it directly in your browser.

---

## 2. Start a New Cohort Year

This is the first step when beginning a new DIVE cohort. You'll only do this once per year.

### What This Does

Creates the file structure for a new cohort year:
- A landing page for the cohort (`cohorts/2026/index.md`)
- A data file for schedule and materials (`_data/cohorts/2026.yml`)
- An empty folder for team projects (`cohorts/2026/teams/`)

### Step-by-Step Instructions

#### Step 1: Navigate to Actions

1. Go to your repository on GitHub
2. Click the **"Actions"** tab at the top
3. You'll see a list of workflows on the left sidebar

**What you're looking for:** "Scaffold new cohort year" workflow

#### Step 2: Run the Workflow

1. Click **"Scaffold new cohort year"** in the left sidebar
2. You'll see a blue button on the right that says **"Run workflow"**
3. Click **"Run workflow"**
4. A form appears asking for the year
5. Type the four-digit year (e.g., `2026`)
6. Click the green **"Run workflow"** button at the bottom

**What happens next:** GitHub runs the automation (takes 10-30 seconds) and creates a Pull Request with all the scaffolded files.

#### Step 3: Review the Pull Request

1. Go to the **"Pull requests"** tab
2. You'll see a new PR titled something like "Scaffold cohort 2026"
3. Click on it to open
4. Look at the "Files changed" tab to see what's being added:
   - `cohorts/2026/index.md` - Cohort landing page with placeholder text
   - `_data/cohorts/2026.yml` - Empty schedule/materials template
   - `cohorts/2026/teams/.gitkeep` - Empty folder placeholder

#### Step 4: Customize the Content (Optional)

If you want to add initial content before publishing:

1. In the Pull Request, click on a file you want to edit
2. Click the **three dots** `⋯` in the upper-right
3. Select **"Edit file"**
4. Make your changes (e.g., update the cohort intro text)
5. Scroll down and click **"Commit changes"**
6. Choose "Commit directly to the `scaffold-2026` branch"
7. Click **"Commit changes"** button

**What to customize:**
- **`cohorts/2026/index.md`** - Add a welcome message for the cohort
- **`_data/cohorts/2026.yml`** - Add initial events, materials, or policies

#### Step 5: Merge to Publish

When you're happy with the scaffolded structure:

1. Scroll to the bottom of the Pull Request
2. Click the green **"Merge pull request"** button
3. Click **"Confirm merge"**
4. The new cohort year is now live! 🎉

**What success looks like:**
- The PR shows "Merged" in purple
- The site rebuilds automatically (check Actions tab for "Build & Deploy")
- In 2-3 minutes, visit your live site and you'll see the new cohort year

**💡 Tip:** The new cohort starts empty. You'll add teams and schedule details throughout the season using the workflows below.

---

## 3. Manage the Cohort Schedule

Use this workflow to add or update events in the cohort timeline (kickoff, workshops, milestones, celebration).

### What This Does

Updates the event timeline displayed on the cohort landing page. Events appear in a visual timeline with dates, times, and locations.

### Step-by-Step Instructions

#### Step 1: Prepare Your Event List

You'll provide events in a specific format called YAML. Here's an example:

```yaml
events:
  - id: kickoff
    name: "Kickoff & Welcome"
    date: "2026-08-15"
    time: "9:00 AM - 12:00 PM"
    location: "Austin City Hall, Council Chambers"
    type: milestone
    icon: rocket

  - id: workshop-excel
    name: "Excel Workshop"
    date: "2026-08-20"
    time: "1:00 PM - 4:00 PM"
    location: "Online via Zoom"
    type: workshop
    icon: workshop

  - id: midpoint
    name: "Midpoint Check-in"
    date: "2026-10-05"
    time: "2:00 PM - 4:00 PM"
    location: "City Hall, Room 404"
    type: milestone
    state: upcoming

  - id: final
    name: "Final Celebration & Poster Showcase"
    date: "2026-11-10"
    location: "City Hall Atrium"
    type: milestone
    icon: star
```

**Event fields explained:**
- `id` - Unique identifier (lowercase, no spaces)
- `name` - Event title (appears on timeline)
- `date` - Date in YYYY-MM-DD format
- `time` - Optional, time range as text
- `location` - Where the event happens
- `type` - Optional: `milestone`, `workshop`, or `deadline`
- `state` - Optional: `upcoming` or `completed`
- `icon` - Optional: `rocket`, `workshop`, `star`, etc.

**💡 Tip:** Copy an existing event and modify it. It's easier than starting from scratch!

#### Step 2: Create a Schedule Update Issue

1. Go to the **"Issues"** tab
2. Click the green **"New issue"** button
3. Select **"Update cohort schedule"** template
4. Fill out the form:
   - **Cohort year**: e.g., `2026`
   - **Event list (YAML)**: Paste your events from Step 1
5. Click **"Submit new issue"**

**What happens next:** GitHub automation parses your YAML, validates it, and creates a Pull Request with the updated schedule.

#### Step 3: Review the Pull Request

1. Go to **"Pull requests"** tab
2. Find the PR titled "Update 2026 cohort schedule"
3. Click on it to open
4. Click **"Files changed"** tab to see the updates
5. You'll see your events added to `_data/cohorts/2026.yml`

**Check for errors:**
- Green `+` lines show what's being added
- If there are red `-` lines, some old events are being removed (expected if you replaced the list)
- Look for any validation warnings from the automation

#### Step 4: Make Inline Edits (If Needed)

If you spot a typo or want to adjust something:

1. In "Files changed" tab, click on the file name
2. Click the **three dots** `⋯` in upper-right
3. Select **"Edit file"**
4. Make your corrections
5. Commit directly to the PR branch

#### Step 5: Merge to Publish

When the schedule looks correct:

1. Scroll to bottom of PR
2. Ensure checks are passing (green checkmarks)
3. Click **"Merge pull request"**
4. Click **"Confirm merge"**
5. Visit the live site in 2-3 minutes to see the updated timeline!

**💡 Tip:** You can reopen or close the issue after merging. Keep it open if you anticipate more schedule changes, or close it to keep things tidy.

### Updating the Schedule Later

**To add/change events mid-season:**
- Create a new schedule update issue with the **complete** event list (including existing + new events)
- The automation will replace the entire `events:` section
- Treat each update as the "source of truth" for the full schedule

**💡 Best practice:** Keep a working copy of your event list in a document so you can easily add to it and resubmit.

---

## 4. Add and Maintain Team Pages

This is how you add team projects to the gallery. You'll do this each time a team submits their project information.

### What This Does

Creates a full project page for a team with:
- Project title, summary, and details
- Team members and coach information
- Links to dashboard, poster, and idea sheet
- Tags for filtering
- Auto-generated thumbnail from poster PDF

### Step-by-Step Instructions

#### Step 1: Gather Team Information

Before creating the issue, collect all the required information from the team:

**Required:**
- Team title (project name)
- One-sentence project summary
- Department name
- Track (Data Science Essentials, Data Storytelling, etc.)
- Tags (topic keywords: transportation, health, equity, etc.)
- Coach name and email
- Team member names

**Optional but recommended:**
- Dashboard URL (Tableau, Power BI, etc.)
- Methods and tools used (SQL, Python, etc.)
- Project narrative (findings, impact, next steps)

**💡 Tip:** Create a simple form or template that teams fill out. Then you can copy/paste into the GitHub issue form.

#### Step 2: Create a New Team Issue

1. Go to **"Issues"** tab
2. Click **"New issue"**
3. Select **"Add team (creates PR)"** template
4. Fill out every field in the form:

**Form fields:**
- **Cohort Year** - e.g., `2026`
- **Team Title** - e.g., "On-Time Transit Analytics"
- **Department** - e.g., "Austin Transportation"
- **Track** - e.g., "Data Science Essentials"
- **Project Summary** - One sentence, ~20-30 words
- **Coach Name** - Full name
- **Coach Email** - City email address
- **Team Members** - One name per line
- **Methods** - Comma-separated: "SQL, Python, Tableau"
- **Tags** - Comma-separated: "transportation, reliability, data quality"
- **Dashboard URL** - Optional: Full URL to public dashboard
- **Accessible Dashboard Title** - Optional: "Transit Performance Dashboard"
- **Project Narrative** - Optional: Multi-paragraph description

5. Give the issue a title: "[Team] Team Name"
6. Click **"Submit new issue"**

**What happens next:** GitHub automation creates a Pull Request with a new team page file, already filled with the information you provided.

#### Step 3: Review the Generated Pull Request

1. Go to **"Pull requests"** tab
2. Find PR titled "Add team: [Team Name]"
3. Click to open it
4. Click **"Files changed"** to see what was created:
   - `cohorts/2026/teams/team-slug/index.md` - Team page with YAML front matter + placeholder content

**Review the YAML front matter** (at the top of the file):
```yaml
---
layout: team
title: "On-Time Transit Analytics"
slug: transit-on-time
cohort: 2026
department: "Austin Transportation"
track: "Data Science Essentials"
# ... etc ...
---
```

**Check that:**
- All fields are filled correctly
- Slug (URL-friendly name) makes sense
- No typos in names or emails
- Tags are relevant

#### Step 4: Upload Deliverables (PDFs)

This is where you add the team's poster and idea sheet.

1. **Navigate to the team folder in the PR:**
   - In the PR, click **"Code"** tab at the top (not "Files changed")
   - Or click "View files" button if visible
   - Browse to `cohorts/2026/teams/team-slug/`

2. **Upload poster.pdf:**
   - Look for "Add file" button or drag-and-drop area
   - Click **"Upload files"**
   - Drag `poster.pdf` from your computer into the box
   - Or click **"choose your files"** to browse

3. **Write a commit message:**
   - Summary: "Add poster for [Team Name]"
   - Click **"Commit changes"**
   - **Important:** Select "Commit directly to the `content/team-slug` branch"
   - Click **"Commit changes"** button

4. **Upload idea-sheet.pdf:**
   - Repeat the same process
   - Commit message: "Add idea sheet for [Team Name]"
   - Commit to the same branch

**What happens automatically:** When you upload `poster.pdf`, a workflow runs and generates `thumb.jpg` (thumbnail) from the first page of the PDF. This takes 1-2 minutes.

**💡 Tip:** You can upload both files at once by dragging multiple files into the upload box.

#### Step 5: Edit the Project Narrative (Optional)

If the team provided a detailed project description, add it to the Markdown body:

1. In the PR, open the team's `index.md` file
2. Click **pencil icon** to edit
3. Scroll past the YAML front matter (everything between `---` and `---`)
4. **Below the second `---`**, add the narrative content:

```markdown
---
[YAML front matter above]
---

The On-Time Transit Analytics project examined APC and AVL data to identify trends in late arrivals for a high-volume bus route.

## Key Findings

* Late arrivals clustered during evening peak hours.
* Weather events correlated with service disruptions.

## Impact

* Recommendations informed dynamic dispatch scheduling.
* Dashboard is now used by route supervisors.

## Next Steps

1. Integrate predictive analytics
2. Extend dashboard to cover accessibility metrics
```

5. Commit changes to the PR branch

#### Step 6: Wait for Validation

After uploading files, the **"Validate"** workflow runs automatically:
- Checks that required YAML fields are present
- Ensures no files exceed 50 MB
- Confirms proper file structure

**Check status:**
- Look for green checkmarks next to "Validate" near the bottom of the PR
- If validation fails (red X), click "Details" to see what's wrong

**Common validation errors:**
- Missing required field (e.g., forgot to add tags)
- Typo in YAML field name
- File too large (compress PDFs if needed)

#### Step 7: Merge to Publish

When everything looks good:
1. Ensure all checks are passing (green checkmarks)
2. Ensure thumbnail was generated (check for `thumb.jpg` in files)
3. Click **"Merge pull request"**
4. Click **"Confirm merge"**
5. The team page is now live! 🎉

**What success looks like:**
- PR shows "Merged" in purple
- "Build & Deploy" workflow runs (check Actions tab)
- In 2-3 minutes, visit the live site and search for the team name

### Editing Existing Team Pages

Need to update information after a team is published?

1. Go to **"Code"** tab
2. Navigate to `cohorts/2026/teams/team-slug/index.md`
3. Click the **pencil icon** to edit
4. Make your changes
5. Scroll down to "Commit changes"
6. Write a brief description: "Update team summary"
7. **Select:** "Create a new branch and start a pull request"
8. Click **"Propose changes"**
9. Review the PR and merge when ready

**💡 Tip:** For small typo fixes, you can commit directly to `main` branch (skip PR). For significant changes, use a PR for review.

---

## 5. Upload Cohort Materials & Policies

Learning materials (slide decks, handouts, guides) and program policies are stored in the cohort data file.

### Step-by-Step Instructions

#### Step 1: Open the Cohort Data File

1. Go to **"Code"** tab
2. Navigate to `_data/cohorts/2026.yml`
3. Click the **pencil icon** to edit

#### Step 2: Add Materials

Materials are grouped by category (essentials, workshops, etc.).

**Add to the `materials:` section:**
```yaml
materials:
  essentials:
    - title: "Data Storytelling Guide"
      type: "slide-deck"
      url: "/assets/learning/2026/data-storytelling.pdf"
    - title: "Austin Open Data Portal"
      type: "guide"
      url: "https://data.austintexas.gov/"

  workshops:
    - title: "Geospatial Foundations"
      type: "hands-on"
      url: "/assets/learning/2026/geospatial-workshop.pdf"
    - title: "Power BI Basics"
      type: "hands-on"
      url: "https://example.com/powerbi-basics"
```

**Material types:**
- `slide-deck` - Presentation slides
- `guide` - Written documentation
- `video` - Video tutorial
- `hands-on` - Interactive workshop

**URLs can be:**
- External links: `https://...`
- Internal files: `/assets/learning/2026/filename.pdf`

#### Step 3: Add Policies

**Add to the `policies:` section:**
```yaml
policies:
  - "No PII; publish only approved public data."
  - "Accessibility: WCAG 2.1 AA for all posted assets."
  - "Deliverables must be approved by department communications."
  - "Dashboard URLs must point to public-facing dashboards only."
```

#### Step 4: Commit Changes

1. Scroll down to "Commit changes"
2. Write description: "Add learning materials for 2026"
3. Select: **"Create a new branch and start a pull request"**
4. Click **"Propose changes"**
5. Review PR and merge

**💡 Tip:** For multiple related changes (materials + policies), make them all in one PR rather than separate commits.

### Uploading PDF Materials

If you have PDF files to host (rather than linking externally):

1. Create folder `assets/learning/2026/` (if it doesn't exist)
2. Upload PDFs there using "Add file" → "Upload files"
3. Reference them in the YAML using: `/assets/learning/2026/filename.pdf`

---

## 6. Seasonal Workflow Checklist

This checklist guides you through a typical DIVE cohort lifecycle.

### 📅 Pre-Kickoff (1-2 weeks before start)

**Tasks:**
- [ ] Run "Scaffold new cohort year" workflow
- [ ] Update cohort landing page intro text
- [ ] Add initial schedule (at least kickoff and final dates)
- [ ] Upload initial policies and onboarding materials
- [ ] Test creating a dummy team to familiarize yourself with the process

**Deliverable:** Cohort landing page is live with initial schedule

### 🚀 Kickoff (Week 1)

**Tasks:**
- [ ] Collect team submissions via intake form or email
- [ ] Create issues for each team using "Add team (creates PR)" template
- [ ] Request posters and idea sheets (or placeholders)
- [ ] Merge team PRs as submissions come in
- [ ] Verify all teams appear on cohort landing page

**Deliverable:** All teams have placeholder pages (full content comes later)

### 🏫 Mid-Season (Weeks 2-8)

**Tasks:**
- [ ] Update schedule as workshops and events are confirmed
- [ ] Add workshop materials after each session
- [ ] Encourage teams to update dashboards and summaries
- [ ] Monitor GitHub Actions for any failures (check weekly)
- [ ] Update taxonomies if new departments/tracks/tags are needed

**Deliverable:** Timeline stays current, materials are accessible

### 📊 Dashboard & Data Work (Weeks 6-10)

**Tasks:**
- [ ] Collect dashboard URLs from teams
- [ ] Update team pages with dashboard links
- [ ] Verify dashboards are publicly accessible
- [ ] Ensure dashboard titles are accessibility-friendly

**Deliverable:** All team pages link to working dashboards

### 🎨 Poster Season (Weeks 10-12)

**Tasks:**
- [ ] Request final posters from teams (PDF format)
- [ ] Verify posters are accessibility-tagged
- [ ] Upload posters to team PRs or create new PRs
- [ ] Verify thumbnails auto-generate successfully
- [ ] Upload idea sheets (if not already present)
- [ ] Update project narratives with final findings

**Deliverable:** All team pages have posters, thumbnails, and complete content

### 🎉 Final Celebration (Week 12)

**Tasks:**
- [ ] Run final "Validate" check manually (Actions tab)
- [ ] Spot-check all team pages for completeness
- [ ] Update final celebration event as "completed"
- [ ] Take screenshots for archival records

**Deliverable:** Gallery is complete and polished

### 📁 Post-Season (Ongoing)

**Tasks:**
- [ ] Close open issues and PRs
- [ ] Archive cohort with Git tag (optional, for engineering team)
- [ ] Document any process improvements for next year
- [ ] Leave cohort content as-is for public viewing

**Deliverable:** Cohort is archived, ready to start next year's cycle

---

## 7. After the Active Season

Once the cohort wraps up, the gallery becomes an archive of the work.

### Keeping Content Live

- **Leave everything as-is** - The site remains live and publicly accessible
- **No need to delete** - Past cohorts serve as a portfolio and reference
- **Update if needed** - Teams can request updates post-graduation (rare)

### Archival Snapshot (Optional)

Your engineering team can create a Git tag to mark the official end:

1. Go to **"Code"** → **"Releases"**
2. Click **"Create a new release"**
3. Tag: `cohort-2026-final`
4. Title: "Cohort 2026 Final"
5. Description: "Archive of 2026 cohort at graduation"
6. Click **"Publish release"**

This creates a permanent snapshot you can reference later.

### Preparing for Next Year

When the next cohort approaches:
- **Review this guide** and update any process improvements
- **Test workflows** on a dummy branch if there were any changes
- **Start fresh** with Step 2: "Start a New Cohort Year"

---

## 8. Troubleshooting & FAQ

### Common Issues and Solutions

#### ❌ "Validation failed" on Pull Request

**What it means:** The automated check found issues with your content.

**How to fix:**
1. Click **"Details"** next to the failed check
2. Read the error message (it tells you exactly what's wrong)
3. Common causes:
   - Missing required field (e.g., `summary:` or `tags:`)
   - Typo in YAML field name
   - File exceeds 50 MB size limit
4. Edit the file in the PR to fix the issue
5. Re-run the check (it runs automatically on new commits)

**Example error:**
```
Missing required keys: summary, tags
File: cohorts/2026/teams/example/index.md
```
**Fix:** Add `summary:` and `tags:` fields to the YAML front matter.

---

#### ❌ Poster thumbnail not generating

**What it means:** The automation didn't create `thumb.jpg` from the PDF.

**Possible causes:**
- PDF isn't named exactly `poster.pdf` (case-sensitive)
- PDF was uploaded to wrong folder
- PR is from a forked repository (automation only runs on branches)
- Workflow has a bug

**How to fix:**
1. Check that `poster.pdf` exists in the correct folder
2. Go to **"Actions"** tab → **"Generate poster thumbnails"**
3. Click **"Run workflow"** manually
4. Select the PR's branch
5. Click **"Run workflow"**

If it still fails:
- Check Actions logs for error details
- Verify PDF isn't corrupted (open it locally to confirm)
- Contact engineering team if workflow has a bug

---

#### ❌ Changes not showing up on live site

**What it means:** Site hasn't rebuilt yet, or build failed.

**How to check:**
1. Go to **"Actions"** tab
2. Look for the latest **"Build & Deploy"** workflow
3. Check if it's in progress (yellow), succeeded (green), or failed (red)

**If in progress (yellow):**
- Wait 2-3 minutes, then refresh the live site

**If failed (red):**
- Click on the workflow run to see logs
- Look for error messages (usually a Jekyll build error or invalid YAML)
- Fix the issue and push another commit to trigger a new build

**If succeeded (green):**
- Clear your browser cache and hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Wait another minute for GitHub Pages CDN to update
- Try opening the site in a private/incognito browser window

---

#### ❌ "No changes detected" when updating schedule

**What it means:** The YAML you submitted is identical to what's already in the file.

**How to fix:**
1. Open `_data/cohorts/2026.yml` in GitHub to see current content
2. Compare it to what you submitted
3. Make sure your new event list is actually different
4. Resubmit the issue with the updated YAML

---

#### ❌ Can't upload files to Pull Request

**What it means:** You might not have permission, or you're viewing the wrong tab.

**How to fix:**
1. Make sure you're in the PR (not an issue)
2. Look for the **"Add file"** or **"Upload files"** button
3. If you don't see it, click the **"Code"** tab within the PR first
4. If still not visible, verify you have write access to the repository

---

### Frequently Asked Questions

#### Q: What if I make a mistake and merge something wrong?

**A:** Don't worry! You can revert any change.

1. Go to **"Code"** → **"Commits"**
2. Find the commit you want to undo
3. Click the commit to view it
4. Click the **"Revert"** button (top-right)
5. This creates a new PR that undoes the change
6. Merge the revert PR to restore the previous state

**Remember:** Everything in Git is tracked. You can always go back.

---

#### Q: Can I practice without affecting the live site?

**A:** Yes! Use a test branch.

1. Go to **"Code"** tab
2. Click the branch dropdown (usually says "main")
3. Type a new branch name: `test-practice`
4. Click "Create branch"
5. Now any commits you make to `test-practice` won't affect `main` or the live site
6. Practice creating issues, making changes, etc.
7. When done, delete the test branch (no need to merge)

---

#### Q: How do I know if a workflow succeeded?

**A:** Look for checkmarks in the PR or Actions tab.

- **Green checkmark** ✅ = Success
- **Yellow circle** ⏳ = In progress
- **Red X** ❌ = Failed

Click on any status to view details.

---

#### Q: What if a team submits updates after publishing?

**A:** Edit their existing team page.

1. Navigate to the team's `index.md` file
2. Click **pencil icon** to edit
3. Make updates
4. Commit with a new PR for review
5. Merge to publish updates

---

#### Q: Can multiple people work on the repository at once?

**A:** Yes! That's the beauty of version control.

- Each person works in their own PR (separate branch)
- PRs can be merged independently
- GitHub handles conflicts if two people edit the same file
- You can assign reviewers to specific PRs

---

#### Q: What if I accidentally delete something important?

**A:** Git keeps everything. You can restore it.

1. Go to **"Code"** → **"Commits"**
2. Find the commit where the content existed
3. Click the file, then click **"View"**
4. Copy the content
5. Create a new commit adding it back

Or ask engineering team to help with a Git revert.

---

#### Q: Do I need to know YAML?

**A:** Not really. Just follow the examples.

YAML basics:
- Use `key: "value"` format
- Indent with spaces (not tabs)
- Lists start with `-`
- Comments start with `#`

**When in doubt, copy an existing example and modify it.**

---

#### Q: Who do I contact if I'm stuck?

**A:** Help is available!

1. **Check this guide** - Most answers are here
2. **Search repository issues** - Someone may have had the same question
3. **Ask engineering team** - They're here to help
4. **Open an issue** - Describe what you're trying to do

**Remember:** There are no dumb questions. We want you to feel confident!

---

## You're Ready! 🎉

You've reached the end of the guide. Here's what you've learned:

✅ How to start a new cohort year
✅ How to add and manage team projects
✅ How to update schedules and materials
✅ How to troubleshoot common issues
✅ How to navigate GitHub with confidence

### Next Steps

1. **Bookmark this guide** for quick reference
2. **Test the workflows** with a practice branch if you want
3. **Start your first cohort** when ready
4. **Ask questions** whenever you need help

### Quick Reference Card

| Task | Where to Go | What to Click |
|------|------------|--------------|
| Start new cohort | Actions tab | "Scaffold new cohort year" |
| Add team | Issues tab | New issue → "Add team" |
| Update schedule | Issues tab | New issue → "Update schedule" |
| Edit existing content | Code tab | Navigate to file → Pencil icon |
| Review changes | Pull requests tab | Click PR → Review files |
| Check status | Actions tab | View workflow runs |

### Helpful Links

- **Repository:** [github.com/cityofaustin/dive-gallery](https://github.com/cityofaustin/dive-gallery)
- **Live site:** [cityofaustin.github.io/dive-gallery](https://cityofaustin.github.io/dive-gallery)
- **README:** [Main documentation](../README.md)
- **Technical guide:** [For developers](../TECHNICAL-GUIDE.md)

---

**Welcome to the team! You're going to do great.** 🚀

If you ever feel stuck or unsure, remember: you can't break anything permanently, every change can be undone, and help is always available. Now go create an amazing cohort gallery!

---

*Last updated: October 11, 2025*
