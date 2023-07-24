import { MeiliSearch } from "meilisearch";
import jobTitles from "./job-titles-with-id.json" assert { type: "json" };

const client = new MeiliSearch({
  host: "http://localhost:7700",
  apiKey: "MASTER_KEY",
});

client
  .index("job-titles")
  .addDocuments(jobTitles, {
    primaryKey: "id",
  })
  .then((res) => console.log(res));
