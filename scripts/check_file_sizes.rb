#!/usr/bin/env ruby
# frozen_string_literal: true

require "find"

MAX_SIZE_BYTES = 50 * 1024 * 1024

ignored_directories = [".git", "node_modules", "vendor", "_site"].map { |dir| File.expand_path(dir, __dir__ + "/..") }
failures = []

Find.find(File.expand_path("..", __dir__)) do |path|
  if File.directory?(path)
    if ignored_directories.include?(path)
      Find.prune
    end
    next
  end

  size = File.size(path)
  next if size <= MAX_SIZE_BYTES

  failures << format("%s exceeds 50MB (%.2f MB)", path, size / (1024.0 * 1024.0))
end

if failures.any?
  warn "Large files detected:\n\t" + failures.join("\n\t")
  exit 1
end

puts "File size check passed."
