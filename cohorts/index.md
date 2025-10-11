---
layout: default
title: "Cohort Archive"
---

<section class="mb-10">
  <h1 class="text-4xl font-bold text-primary mb-4">Cohort Archive</h1>
  <p class="text-lg text-slate-600">Browse DIVE cohort galleries by year.</p>
</section>

<div class="grid gap-6 sm:grid-cols-2">
  {% assign sorted_years = site.data.cohorts | sort %}
  {% for cohort in sorted_years reversed %}
    {% assign year = cohort[0] %}
    <a class="block bg-white rounded-xl shadow hover:shadow-lg transition p-6" href="{{ '/cohorts/' | append: year | append: '/' | relative_url }}">
      <span class="text-sm uppercase tracking-wide text-secondary font-semibold">Cohort {{ year }}</span>
      <h2 class="text-2xl font-semibold text-slate-900 mt-2">Explore projects</h2>
    </a>
  {% endfor %}
</div>
