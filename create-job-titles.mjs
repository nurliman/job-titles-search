import fs from "node:fs/promises";

const file = await fs.readFile("job-titles.txt", "utf-8");

const lines = file.split("\n");

await fs.writeFile("job-titles.json", JSON.stringify(lines, null, 4));
