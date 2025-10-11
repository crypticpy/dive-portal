require "json"
require "fileutils"

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
      docs = site.pages.select { |page| page.data["layout"] == "team" }.map do |page|
        {
          slug: page.data["slug"] || Jekyll::Utils.slugify(page.data["title"] || ""),
          title: page.data["title"],
          summary: page.data["summary"],
          tags: Array(page.data["tags"]).join(" "),
          url: page.url
        }
      end

      payload = { generated_at: Time.now.utc.iso8601, docs: docs }
      site.static_files << SearchIndexFile.new(site, payload)
      site.config["search_index_payload"] = payload
    end
  end
end
