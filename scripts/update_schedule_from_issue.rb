#!/usr/bin/env ruby
# frozen_string_literal: true

require "yaml"
require "psych"
require "date"
require "time"

issue_body = ENV.fetch("ISSUE_BODY", "")
issue_number = ENV.fetch("ISSUE_NUMBER", "unknown")

if issue_body.strip.empty?
  warn "Issue body is empty; cannot update schedule."
  exit 1
end

def normalize_key(key)
  key.to_s
     .strip
     .downcase
     .gsub(/[^a-z0-9]+/, "_")
     .gsub(/\A_+|_+\z/, "")
end

sections = issue_body.split(/^###\s+/).drop(1)
values = {}
sections.each do |section|
  heading_line, *rest = section.lines
  next unless heading_line

  key = normalize_key(heading_line)
  values[key] = rest.join.strip
end

cohort_year = values["cohort_year"].to_s.strip
schedule_yaml = values["schedule_entries"].to_s.strip

if cohort_year.empty?
  warn "Cohort year is required in the issue form."
  exit 1
end

unless cohort_year.match?(/\A\d{4}\z/)
  warn "Cohort year must be a four-digit year."
  exit 1
end

if schedule_yaml.empty?
  warn "No schedule entries were provided."
  exit 1
end

begin
  parsed_events = YAML.safe_load(schedule_yaml, permitted_classes: [Date], permitted_symbols: [], aliases: false)
rescue Psych::SyntaxError => e
  warn "Schedule YAML could not be parsed: #{e.message}"
  exit 1
end

unless parsed_events.is_a?(Array)
  warn "Schedule entries must be a YAML array of events."
  exit 1
end

def slugify(value)
  value.to_s.strip.downcase.gsub(/[^a-z0-9]+/, "-").gsub(/\A-+|-+\z/, "")
end

processed_events = []
used_ids = {}

parsed_events.each_with_index do |event, index|
  unless event.is_a?(Hash)
    warn "Event at index #{index} is not a mapping."
    exit 1
  end

  name = event["name"].to_s.strip
  date_value = event["date"].to_s.strip

  if name.empty? || date_value.empty?
    warn "Each event must include a name and date (index #{index})."
    exit 1
  end

  begin
    date_iso = Date.iso8601(date_value).to_s
  rescue Date::Error
    warn "Event '#{name}' has an invalid date #{date_value.inspect}; expected YYYY-MM-DD."
    exit 1
  end

  event_id = event["id"].to_s.strip
  event_id = slugify(name) if event_id.empty?

  original_id = event_id.dup
  counter = 1
  while used_ids[event_id]
    counter += 1
    event_id = "#{original_id}-#{counter}"
  end
  used_ids[event_id] = true

  normalized = {
    "id" => event_id,
    "name" => name,
    "date" => date_iso
  }

  %w[time location description type state icon].each do |optional_key|
    value = event[optional_key]
    next if value.nil? || value.to_s.strip.empty?

    normalized[optional_key] = value.to_s.strip
  end

  processed_events << normalized
end

data_path = File.expand_path("../_data/cohorts/#{cohort_year}.yml", __dir__)

unless File.exist?(data_path)
  warn "Data file not found for cohort #{cohort_year}: #{data_path}"
  exit 1
end

original_content = File.read(data_path)
data = YAML.safe_load(original_content, permitted_classes: [Date], permitted_symbols: [], aliases: false) || {}
data["events"] = processed_events

new_content = Psych.dump(data, line_width: -1)

if new_content == original_content
  puts "No schedule changes detected for cohort #{cohort_year}."
  if (output = ENV["GITHUB_OUTPUT"])
    File.open(output, "a") { |f| f.puts("changed=false") }
  end
  exit 0
end

File.write(data_path, new_content)

summary_lines = processed_events.map { |event| "- #{event['name']} (#{event['date']})" }
branch = "schedule/#{cohort_year}-#{Time.now.utc.strftime('%Y%m%d%H%M%S')}"

if (output = ENV["GITHUB_OUTPUT"])
  File.open(output, "a") do |f|
    f.puts("changed=true")
    f.puts("branch=#{branch}")
    f.puts("year=#{cohort_year}")
    f.puts("summary<<SUMMARY")
    f.puts(summary_lines.join("\n"))
    f.puts("SUMMARY")
  end
end

puts "Updated schedule for cohort #{cohort_year} (issue ##{issue_number})."
