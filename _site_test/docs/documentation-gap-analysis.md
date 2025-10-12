# Documentation Gap Analysis

**Date:** October 11, 2025
**Purpose:** Compare current documentation against actual application state and identify gaps/misalignments

---

## Current Documentation Inventory

### Primary Documentation
- **README.md** (236 lines) - Tech-focused local development guide
- **CLAUDE.md** (239 lines) - AI assistant development guidance
- **spec.md** (256 lines) - Original software specification
- **docs/admin-getting-started.md** (114 lines) - GitHub-focused admin guide
- **austin_brand.md** (236 lines) - City of Austin brand guidelines

### Supporting Files
- **package.json** - npm scripts and dependencies
- **_config.yml** - Jekyll configuration
- **Gemfile** - Ruby dependencies

---

## Actual Application State

### GitHub Actions Workflows
✅ **All documented workflows exist:**
- `.github/workflows/pages.yml` - Build & Deploy to GitHub Pages
- `.github/workflows/validate.yml` - PR validation (front matter, file sizes)
- `.github/workflows/new-team.yml` - Create team from issue
- `.github/workflows/new-year.yml` - Scaffold new cohort year
- `.github/workflows/poster-thumb.yml` - Generate thumbnails from PDFs
- `.github/workflows/smoke.yml` - Weekly smoke build test
- `.github/workflows/update-schedule.yml` - Update cohort schedule from issue

### Issue Templates
✅ **All documented templates exist:**
- `.github/ISSUE_TEMPLATE/new-team.yml` - Add team (creates PR)
- `.github/ISSUE_TEMPLATE/new-year.yml` - Start new cohort year
- `.github/ISSUE_TEMPLATE/schedule.yml` - Update cohort schedule

### Scripts
✅ **All documented scripts exist:**
- `scripts/check_file_sizes.rb` - Validate file sizes < 50MB
- `scripts/check_front_matter.rb` - Validate required YAML fields
- `scripts/new_team_from_issue.js` - Create team files from issue
- `scripts/scaffold_year.rb` - Create new cohort structure
- `scripts/update_schedule_from_issue.rb` - Update cohort schedule YAML

### Content Model
✅ **Matches documentation:**
- Team pages: `cohorts/YYYY/teams/<slug>/index.md`
- Cohort data: `_data/cohorts/YYYY.yml`
- Taxonomies: `_data/taxonomies.yml`
- Layouts: `_layouts/default.html`, `_layouts/cohort.html`, `_layouts/team.html`
- Includes: 14 reusable components

---

## Gap Analysis

### README.md - Critical Issues

| Issue | Current State | Desired State | Severity |
|-------|--------------|---------------|----------|
| **Audience mismatch** | Targets developers with local setup | Should target non-technical content managers | HIGH |
| **Local dev emphasis** | 70+ lines on rbenv, Jekyll, npm commands | Should be 5 lines max with link to Technical Guide | HIGH |
| **GitHub UI missing** | No mention of GitHub web interface | Should emphasize GitHub-first workflow | CRITICAL |
| **Intimidating tone** | Assumes technical knowledge | Should be welcoming and jargon-free | HIGH |
| **No navigation** | Doesn't point to getting started guide | Should direct users to appropriate doc | MEDIUM |

**Specific problematic sections in current README:**
- Lines 36-71: "Quickstart" with rbenv, bundle, Jekyll serve
- Lines 73-100: "Repository Structure" (too technical for primary audience)
- Lines 148-221: "Development Workflow" and "Commands Reference" (developer-focused)

**What's good in current README:**
- Lines 1-35: Overview and architecture (can stay, simplified)
- Lines 101-112: Content Model (useful reference)
- Lines 167-174: Accessibility (important, keep visible)
- Accurate workflow descriptions

### TECHNICAL-GUIDE.md - Missing Entirely

**Currently:** Does not exist
**Needed:** Comprehensive developer guide for customization

**Should contain:**
- All local development setup (rbenv, Jekyll, Tailwind, npm)
- Architecture deep-dive (Jekyll + Liquid + Tailwind)
- CSS build pipeline details
- How to modify layouts and includes
- How to customize GitHub Actions
- How to extend content model
- Code references with line numbers
- Testing and validation procedures

**Sources to extract from:**
- Current README.md lines 36-71 (Quickstart)
- Current README.md lines 148-221 (Dev workflow, commands)
- CLAUDE.md lines 29-59 (Architecture, commands)
- CLAUDE.md lines 60-176 (Detailed architecture)

### docs/admin-getting-started.md - Needs Enhancement

| Issue | Current State | Needed Improvement | Priority |
|-------|--------------|-------------------|----------|
| **Tone** | Professional but not beginner-friendly | More reassuring, "you got this" energy | HIGH |
| **GitHub UI guidance** | Assumes familiarity with GitHub | Describe what buttons look like, where to click | HIGH |
| **Fear management** | No address of "what if I break something?" | Explicit reassurance about version control safety | HIGH |
| **Visual aids** | Text-only descriptions | Describe UI elements ("look for green button") | MEDIUM |
| **Troubleshooting** | Basic (lines 108-112) | Expanded FAQ, specific error solutions | MEDIUM |
| **Lifecycle detail** | Good structure, brief content | More detail in each phase | MEDIUM |

**What's already good:**
- GitHub-first approach (no local dev mentioned)
- Clear seasonal workflow checklist (lines 77-97)
- Logical structure through cohort lifecycle
- Practical, action-oriented

### CLAUDE.md - Minor Updates Needed

**Currently:** Well-structured AI assistant guidance
**Needed:** References to new documentation structure

**Changes required:**
- Update line 20 to mention new doc structure
- Add references to README (non-technical), TECHNICAL-GUIDE (developers), Getting Started (admins)
- Keep technical content (it's for AI assistants, not end-users)

---

## Content Alignment Issues

### Over-Emphasized in Wrong Documents
❌ **In README.md (should move to TECHNICAL-GUIDE):**
- rbenv setup and shell configuration
- Jekyll serve and local development
- npm run commands details
- Repository structure (file tree)
- Development workflow (local iteration)
- Commands reference (CLI tools)

### Under-Emphasized in Documentation
❌ **Should be prominent in README.md:**
- "This is a GitHub-based CMS - no command line needed!"
- "Everything happens in the GitHub web interface"
- "Automation handles the technical complexity"
- "No local development required for content management"
- Links to appropriate guides by user type

❌ **Should be enhanced in admin-getting-started.md:**
- "You cannot permanently break anything" message
- "Practice first" guidance (fork, test branch)
- Visual descriptions of GitHub UI elements
- Expected outcomes for each action
- Troubleshooting with specific fixes
- "What success looks like" confirmations

---

## Documentation Gaps Not Currently Addressed

### 1. Visual/UI Guidance Missing
- No descriptions of what GitHub buttons/UI looks like
- No "what to expect" screenshots or descriptions
- No visual guidance for finding workflows, issues, etc.

### 2. Psychological Barriers Not Addressed
- GitHub anxiety not acknowledged
- No "you got this" encouragement for non-technical users
- No explicit "you can't break production" safety message
- No guidance for "I'm stuck, what now?"

### 3. Testing/Practice Guidance Missing
- No mention of how to practice safely
- No guidance on creating test branches
- No "how to undo" if something goes wrong

### 4. Role-Based Navigation Missing
- No clear "start here" guidance by user role:
  - Content manager → Getting Started
  - Developer customizing → Technical Guide
  - Quick reference → README
  - AI assistant → CLAUDE.md

### 5. Workflow Outcomes Not Described
- Documentation says "run workflow" but not "you'll see a PR appear"
- No description of what happens after each action
- No "how to know it worked" confirmations

---

## Accuracy Check: Documentation vs. Reality

### ✅ Accurate and Current
- All workflow names and triggers
- All issue template names
- Content model structure
- Required YAML fields
- File size and repository constraints
- GitHub Actions automation descriptions
- Accessibility requirements
- Brand color guidelines

### ⚠️ Misleading or Misaligned
- **README implies local dev is primary workflow** (it's not - GitHub UI is)
- **No emphasis on "no technical skills needed"** (should be primary message)
- **admin-getting-started.md title** suggests "admin" but should welcome all users
- **spec.md status** says "Scoping" but app is production-ready

### ❌ Missing Documentation
- No developer customization guide
- No visual UI guidance
- No troubleshooting reference
- No FAQ for common concerns
- No "I'm stuck" guide

---

## Recommendations Summary

### High Priority (Immediate)
1. **Restructure README.md** - Make it GitHub-first, non-technical, welcoming
2. **Create TECHNICAL-GUIDE.md** - Extract all developer content from README
3. **Enhance admin-getting-started.md** - Add reassurance, visual guidance, troubleshooting

### Medium Priority
4. **Update CLAUDE.md** - Add references to new doc structure
5. **Add role-based navigation** - Help users find the right doc
6. **Expand troubleshooting** - Common errors and specific fixes

### Low Priority
7. **Consider visual additions** - Annotated screenshots or descriptions
8. **Create FAQ section** - Common questions and concerns
9. **Update spec.md status** - Change from "Scoping" to "Production"

---

## Success Criteria

Documentation restructuring will be successful when:
- ✅ A non-technical user can read README and feel confident they can manage content
- ✅ README does not mention local development or command-line tools
- ✅ A developer can find all customization info in TECHNICAL-GUIDE
- ✅ Getting started guide addresses GitHub anxiety explicitly
- ✅ Each document has a clear target audience and tone
- ✅ Users can navigate to the right doc for their role
- ✅ All technical accuracy is maintained

---

**Next Steps:** Begin implementation following the approved plan, starting with TECHNICAL-GUIDE.md creation.
