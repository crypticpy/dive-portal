---
layout: default
title: "DIVE Cohorts"
include_search: false
include_filters: false
---

<section class="mb-12">
  <h1 class="text-4xl font-bold text-primary mb-4">Data Learning Cohorts Gallery</h1>
  <p class="text-lg text-slate-600 max-w-3xl">
    Explore projects created by Austin City employees as part of the Data Interdisciplinary Vocational Experience (DIVE) program.
    Browse by cohort year to learn how teams are using data to deliver measurable civic impact.
  </p>
</section>

<section>
  <h2 class="text-2xl font-semibold text-primary mb-6">Cohort Years</h2>
  <div class="grid gap-6 sm:grid-cols-2">
    {% assign sorted_years = site.data.cohorts | sort %}
    {% for cohort in sorted_years reversed %}
      {% assign year = cohort[0] %}
      {% assign data = cohort[1] %}
      <a class="block bg-white rounded-xl shadow hover:shadow-lg transition p-6" href="{{ '/cohorts/' | append: year | append: '/' | relative_url }}">
        <p class="text-sm uppercase tracking-wide text-secondary font-semibold">Cohort {{ year }}</p>
        {% if data.events and data.events.size > 0 %}
          {% assign first_event = data.events | first %}
          <p class="text-lg font-semibold text-slate-900 mt-2">{{ first_event.name }}</p>
          <p class="text-sm text-slate-500">Starts {{ first_event.date | date: "%B %-d, %Y" }}</p>
        {% endif %}
        <p class="text-sm text-slate-600 mt-4">{{ data.policies | size }} program policies · {{ data.materials | size }} resource groups</p>
      </a>
    {% endfor %}
  </div>
</section>
