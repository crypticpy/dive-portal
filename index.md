---
layout: default
title: "DIVE Cohorts"
include_search: false
include_filters: false
---

{% assign cohorts = site.data.cohorts | sort %}
{% assign total_cohorts = cohorts | size %}
{% assign all_teams = site.pages | where: 'layout', 'team' %}
{% assign total_teams = all_teams | size %}
{% assign total_departments = all_teams | map: 'department' | uniq | size %}
{% assign total_tracks = all_teams | map: 'track' | uniq | size %}

<section class="relative mb-16 overflow-hidden rounded-3xl border border-brand-sky/20 bg-gradient-to-br from-white via-brand-sky/5 to-brand-sea/5 shadow-card">
  <div class="absolute -left-28 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-brand-sky/20 blur-3xl" aria-hidden="true"></div>
  <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-gold/20 blur-3xl" aria-hidden="true"></div>
  <div class="relative grid gap-12 px-6 py-14 sm:px-10 lg:grid-cols-[1.6fr_minmax(0,1fr)]">
    <div class="space-y-6">
      <span class="inline-flex items-center gap-2 rounded-full border border-brand-cloud/20 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-brand-cloud shadow-subtle">City of Austin · DIVE Program</span>
      <h1 class="text-4xl font-semibold text-brand-navy sm:text-5xl">Data Learning Cohorts Gallery</h1>
      <p class="max-w-2xl text-lg leading-relaxed text-brand-stone">Discover how Austin public servants apply data science, storytelling, and civic analytics to deliver measurable impact. Each cohort highlights cross-department teams, curated resources, and outcomes you can explore and reuse.</p>
      <div class="flex flex-col gap-3 sm:flex-row">
        <a class="inline-flex items-center justify-center rounded-full bg-brand-sky px-6 py-3 text-sm font-semibold text-white shadow-subtle transition hover:-translate-y-0.5 hover:bg-brand-indigo focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-sky/40" href="{{ '/cohorts/2025/' | relative_url }}">
          Explore 2025 Cohort
        </a>
        <a class="inline-flex items-center justify-center rounded-full border border-brand-sky/40 bg-white px-6 py-3 text-sm font-semibold text-brand-indigo transition hover:-translate-y-0.5 hover:border-brand-indigo hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-sky/30" href="{{ '/cohorts/' | relative_url }}">
          View Cohort Archive
        </a>
      </div>
    </div>
    <div class="grid gap-4 sm:grid-cols-2">
      {% include stat-block.html value=total_teams label="Teams showcased" description="Across all published cohorts" %}
      {% include stat-block.html value=total_departments label="Departments engaged" description="City divisions collaborating" %}
      {% include stat-block.html value=total_tracks label="Program tracks" description="Curriculum pillars for learners" %}
      {% include stat-block.html value=total_cohorts label="Cohort years" description="Hosted on the DIVE gallery" %}
    </div>
  </div>
</section>

{% assign featured_cohort = cohorts | last %}
{% assign featured_year = featured_cohort[0] %}
{% assign featured_data = featured_cohort[1] %}
{% assign featured_teams = all_teams | where: 'cohort', featured_year | slice: 2 %}

<section class="mb-16 space-y-8">
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 class="text-2xl font-semibold text-brand-navy">Spotlight projects</h2>
      <p class="text-sm text-brand-cloud">Highlights from the {{ featured_year }} cohort demonstrating civic data leadership.</p>
    </div>
    <a class="inline-flex items-center gap-2 text-sm font-semibold text-brand-sky transition hover:text-brand-indigo" href="{{ '/cohorts/' | append: featured_year | append: '/' | relative_url }}">
      View all {{ featured_year }} teams
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0-5 5m5-5-5-5"/></svg>
    </a>
  </div>
  <div class="grid gap-6 lg:grid-cols-2">
    {% for team in featured_teams %}
      {% include feature-card.html title=team.title url=team.url summary=team.summary department=team.department track=team.track tags=team.tags thumbnail=team.thumbnail thumbnail_alt=team.thumbnail_alt %}
    {% else %}
      <div class="rounded-2xl border border-brand-sky/15 bg-white/80 p-8 text-sm text-brand-stone shadow-subtle">
        Projects from the latest cohort will appear here as they are added. Explore prior cohorts in the archive to see impact stories and resources.
      </div>
    {% endfor %}
  </div>
</section>

<section class="mb-16 space-y-8">
  <div>
    <h2 class="text-2xl font-semibold text-brand-navy">Impact highlights</h2>
    <p class="text-sm text-brand-cloud">Program insights illustrating how teams leverage data, storytelling, and community partnerships.</p>
  </div>
  <div class="grid gap-6 md:grid-cols-3">
    <div class="rounded-2xl border border-brand-sky/10 bg-white/80 p-6 shadow-subtle">
      <span class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-cloud">Civic Storytelling</span>
      <h3 class="mt-4 text-xl font-semibold text-brand-navy">Data narratives that resonate</h3>
      <p class="mt-3 text-sm text-brand-stone">Teams translate complex datasets into accessible dashboards and posters that help residents and leaders make informed decisions.</p>
    </div>
    <div class="rounded-2xl border border-brand-sky/10 bg-white/80 p-6 shadow-subtle">
      <span class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-cloud">Cross-Department</span>
      <h3 class="mt-4 text-xl font-semibold text-brand-navy">Collaborative delivery</h3>
      <p class="mt-3 text-sm text-brand-stone">Coaches and analysts from multiple departments pair up to co-design solutions, strengthening citywide data literacy.</p>
    </div>
    <div class="rounded-2xl border border-brand-sky/10 bg-white/80 p-6 shadow-subtle">
      <span class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-cloud">Re-usable Assets</span>
      <h3 class="mt-4 text-xl font-semibold text-brand-navy">Open resources for future teams</h3>
      <p class="mt-3 text-sm text-brand-stone">Each project publishes deliverables, playbooks, and accessibility notes to accelerate future cohorts and community partners.</p>
    </div>
  </div>
</section>

<section class="space-y-8">
  <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h2 class="text-2xl font-semibold text-brand-navy">Browse cohort years</h2>
      <p class="text-sm text-brand-cloud">Select a year to view teams, schedules, and learning resources.</p>
    </div>
    <span class="text-xs font-medium uppercase tracking-[0.3em] text-brand-cloud">{{ total_cohorts }} published cohorts</span>
  </div>
  <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    {% for cohort in cohorts reversed %}
      {% assign year = cohort[0] %}
      {% assign data = cohort[1] %}
      {% assign event = data.events | first %}
      {% assign teams_for_year = all_teams | where: 'cohort', year | size %}
      <a class="group relative overflow-hidden rounded-2xl border border-brand-sky/10 bg-white/90 p-6 shadow-subtle transition hover:-translate-y-1 hover:border-brand-sky/40 hover:shadow-xl" href="{{ '/cohorts/' | append: year | append: '/' | relative_url }}">
        <div class="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-sky/10 transition group-hover:bg-brand-sky/20" aria-hidden="true"></div>
        <div class="flex items-center justify-between gap-4">
          <span class="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cloud">Cohort {{ year }}</span>
          <span class="inline-flex items-center gap-2 rounded-full bg-brand-sky/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-indigo">{{ teams_for_year }} teams</span>
        </div>
        {% if event %}
          <h3 class="mt-4 text-xl font-semibold text-brand-navy">{{ event.name }}</h3>
          <p class="mt-1 text-sm text-brand-cloud">Kickoff {{ event.date | date: "%B %-d, %Y" }}</p>
        {% endif %}
        <div class="mt-5 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wide text-brand-cloud">
          <span>{{ data.policies | size }} policies</span>
          <span>{{ data.materials | size }} resource groups</span>
        </div>
      </a>
    {% endfor %}
  </div>
</section>
