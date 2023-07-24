import fs from "node:fs/promises";
import jobTitles from "./job-titles.json" assert { type: "json" };

const jobTitlesWithId = jobTitles
  .filter((x) => !!x)
  .map((jobTitle, index) => ({
    id: index + 1,
    name: jobTitle,
  }));

await fs.writeFile(
  "./job-titles-with-id.json",
  JSON.stringify(jobTitlesWithId, null, 2)
);
