#!/usr/bin/env ruby
# frozen_string_literal: true

require 'yaml'
require 'date'

issue_body = ENV['ISSUE_BODY'].to_s

def slugify(str)
  str.to_s.downcase.gsub(/[^a-z0-9]+/, '-').gsub(/^-|-$/, '')
end

sections = issue_body.split(/^###\s+/).drop(1)
values = {}
sections.each do |section|
  heading, *rest = section.split("\n")
  key = heading.to_s.strip.downcase.gsub(/[^a-z0-9]+/, '_').gsub(/^_+|_+$/, '')
  values[key] = rest.join("\n").strip
end

year = values['cohort_year'].to_s.strip
yaml_text = values['schedule_entries'].to_s

begin
  parsed = YAML.safe_load(yaml_text) || []
rescue StandardError
  parsed = []
end

events = parsed.map do |e|
  name = e['name'].to_s
  id = (e['id'] || slugify(name)).to_s
  date = e['date']
  { 'id' => id, 'name' => name, 'date' => date }
end

md = if events.empty?
  "No events detected in the YAML block."
else
  lines = events.map do |e|
    line = "- `#{e['id']}` — #{e['name']}"
    line += " (#{e['date']})" if e['date']
    line
  end
  lines.join("\n")
end

if (output = ENV['GITHUB_OUTPUT'])
  File.open(output, 'a') do |f|
    f.puts("year=#{year}")
    f.puts("preview_ids<<MD")
    f.puts(md)
    f.puts('MD')
  end
end

puts 'Previewed normalized event IDs.'

