import fs from "node:fs/promises";

const file = await fs.readFile(
  "synonym_job_titles_for_search_alternative.txt",
  "utf-8"
);

const lines = file.split("\n");

const json = {};

for (const line of lines) {
  const [keywordstr] = line.split(" => ");
  const keywords = keywordstr.split(", ");

  if (keywords.length <= 1) {
    continue;
  }

  for (const keyword of keywords) {
    json[keyword] = keywords.filter((k) => k !== keyword);
  }
}

await fs.writeFile("synonyms.json", JSON.stringify(json, null, 4));
