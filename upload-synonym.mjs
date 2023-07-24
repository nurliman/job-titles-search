import fs from "node:fs/promises";
import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
  host: "http://localhost:7700",
  apiKey: "MASTER_KEY",
});

const processChunk = async (chunkFile) => {
  const synonym = JSON.parse(await fs.readFile(chunkFile));
  return await client
    .index("job-titles")
    .updateSynonyms(synonym)
    .then((res) => console.log(res));
};

const chunkFiles = (await fs.readdir("./")).filter((file) =>
  file.startsWith("chunk_")
);

await Promise.all(chunkFiles.map((chunkFile) => processChunk(chunkFile)));

console.log("Synonyms uploaded.");
