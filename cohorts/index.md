---
layout: default
title: "Cohort Archive"
---

{% assign sorted_years = site.data.cohorts | sort %}

<section class="mb-12 space-y-4">
  <span class="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cloud">Portal</span>
  <h1 class="text-4xl font-semibold text-brand-navy sm:text-5xl">Cohort archive</h1>
  <p class="max-w-2xl text-lg leading-relaxed text-brand-stone">Browse every published DIVE cohort. Each year includes a timeline, resource kits, and a searchable gallery of project teams.</p>
</section>

<div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
  {% for cohort in sorted_years reversed %}
    {% assign year = cohort[0] %}
    {% assign data = cohort[1] %}
    {% assign teams = site.pages | where: 'layout', 'team' | where: 'cohort', year | size %}
    {% assign kickoff = data.events | first %}
    <a class="group relative overflow-hidden rounded-2xl border border-brand-sky/15 bg-white/90 p-6 shadow-subtle transition hover:-translate-y-1 hover:border-brand-sky/40 hover:shadow-xl" href="{{ '/cohorts/' | append: year | append: '/' | relative_url }}">
      <div class="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-sky/10 transition group-hover:bg-brand-sky/20" aria-hidden="true"></div>
      <div class="flex items-center justify-between gap-4">
        <span class="text-xs font-semibold uppercase tracking-[0.3em] text-brand-cloud">Cohort {{ year }}</span>
        <span class="inline-flex items-center gap-2 rounded-full bg-brand-sky/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-indigo">{{ teams }} teams</span>
      </div>
      {% if kickoff %}
        <h2 class="mt-4 text-xl font-semibold text-brand-navy">{{ kickoff.name }}</h2>
        <p class="mt-1 text-sm text-brand-cloud">Kickoff {{ kickoff.date | date: "%B %-d, %Y" }}</p>
      {% else %}
        <h2 class="mt-4 text-xl font-semibold text-brand-navy">Explore projects</h2>
      {% endif %}
      <div class="mt-5 flex flex-wrap gap-2 text-[11px] font-medium uppercase tracking-wide text-brand-cloud">
        <span>{{ data.policies | size }} policies</span>
        <span>{{ data.materials | size }} resource groups</span>
      </div>
    </a>
  {% endfor %}
</div>
