require "json"
require "fileutils"
require "time"

module Dive
  class SearchIndexFile < Jekyll::StaticFile
    def initialize(site, payload)
      super(site, site.source, "", "search.json")
      @payload = payload
    end

    def write(dest)
      dest_path = destination(dest)
      FileUtils.mkdir_p(File.dirname(dest_path))
      File.write(dest_path, JSON.pretty_generate(@payload))
      true
    end
  end

  class SearchIndexGenerator < Jekyll::Generator
    safe true
    priority :low

    def generate(site)
      docs = []
      site.pages.each do |page|
        layout = page.data["layout"]
        title = page.data["title"]
        summary = page.data["summary"]
        case layout
        when "team"
          docs << {
            slug: page.data["slug"] || Jekyll::Utils.slugify(title || ""),
            title: title,
            summary: summary,
            tags: Array(page.data["tags"]).join(" "),
            url: page.url,
            kind: "team"
          }
        when "event"
          # Use a non-conflicting ref for events so they don't affect team filtering logic
          event_id = page.data["event_id"] || Jekyll::Utils.slugify(title || "")
          year = page.data["cohort"] || ""
          docs << {
            slug: "event:#{year}:#{event_id}",
            title: title,
            summary: summary,
            tags: "",
            url: page.url,
            kind: "event"
          }
        end
      end

      payload = { generated_at: Time.now.utc.iso8601, docs: docs }
      site.static_files << SearchIndexFile.new(site, payload)
      site.config["search_index_payload"] = payload
    end
  end
end
