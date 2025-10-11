#!/usr/bin/env ruby
# frozen_string_literal: true

require "fileutils"
require "yaml"

year = ENV.fetch("COHORT_YEAR")

root = File.expand_path("..", __dir__)
cohort_dir = File.join(root, "cohorts", year)
teams_dir = File.join(cohort_dir, "teams")
data_dir = File.join(root, "_data", "cohorts")

FileUtils.mkdir_p(teams_dir)

index_path = File.join(cohort_dir, "index.md")
unless File.exist?(index_path)
  File.write(index_path, <<~MARKDOWN)
    ---
    layout: cohort
    title: "Cohort #{year}"
    year: #{year}
    intro: "Placeholder introduction for the #{year} cohort. Update with program summary."
    ---

    Content for the #{year} cohort will be added here.
  MARKDOWN
end

FileUtils.mkdir_p(data_dir)

data_path = File.join(data_dir, "#{year}.yml")
unless File.exist?(data_path)
  template = {
    "year" => year.to_i,
    "events" => [
      { "id" => "kickoff", "name" => "Kickoff", "date" => "#{year}-08-01", "location" => "TBD" },
      { "id" => "midpoint", "name" => "Midpoint Check-in", "date" => "#{year}-10-01", "location" => "TBD" },
      { "id" => "final", "name" => "Final Showcase", "date" => "#{year}-11-01", "location" => "TBD" }
    ],
    "materials" => {
      "essentials" => [
        { "title" => "Program Handbook", "type" => "guide", "url" => "/learning/#{year}/handbook.pdf" }
      ]
    },
    "policies" => [
      "No PII; publish only approved public data.",
      "Accessibility: WCAG 2.1 AA for posted assets."
    ]
  }

  File.write(data_path, template.to_yaml)
end

puts "Scaffolded year #{year}"
