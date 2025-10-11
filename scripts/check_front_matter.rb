#!/usr/bin/env ruby
# frozen_string_literal: true

require "yaml"

TEAM_ROOT = File.expand_path("../cohorts", __dir__)
REQUIRED_KEYS = %w[title slug cohort department track coach members links summary methods tags thumbnail accessibility].freeze

def parse_front_matter(path)
  content = File.read(path)
  unless content =~ \A---\s*\n(.*?)\n---\s*\n/m
    raise "#{path} is missing YAML front matter"
  end

  yaml = Regexp.last_match(1)
  YAML.safe_load(yaml, permitted_classes: [], permitted_symbols: [], aliases: false) || {}
rescue Psych::SyntaxError => e
  raise "#{path} has invalid YAML: #{e.message}"
end

failures = []

Dir.glob(File.join(TEAM_ROOT, "**/teams/*/index.md")) do |file|
  data = parse_front_matter(file)
  missing = REQUIRED_KEYS.reject { |key| data.key?(key) }
  failures << "#{file} missing keys: #{missing.join(", " )}" if missing.any?

  if data["members"] && !data["members"].is_a?(Array)
    failures << "#{file} members must be an array"
  end

  if data["links"] && !data["links"].is_a?(Hash)
    failures << "#{file} links must be an object"
  end
end

if failures.any?
  warn failures.join("\n")
  exit 1
end

puts "Front matter validation passed."
