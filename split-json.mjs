import fs from "node:fs";

// Function to split JSON data into smaller chunks
function splitJson(inputFile, maxSize) {
  const jsonData = JSON.parse(fs.readFileSync(inputFile));
  const chunks = [];
  let currentChunk = {};
  let currentSize = 0;

  const keys = Object.keys(jsonData);
  for (const key of keys) {
    const jsonString = JSON.stringify(jsonData[key]);
    const itemSize = Buffer.byteLength(jsonString, "utf8");

    if (
      currentSize + itemSize > maxSize &&
      Object.keys(currentChunk).length > 0
    ) {
      chunks.push(currentChunk);
      currentChunk = {};
      currentSize = 0;
    }

    currentChunk[key] = jsonData[key];
    currentSize += itemSize;
  }

  if (Object.keys(currentChunk).length > 0) {
    chunks.push(currentChunk);
  }

  return chunks;
}

// Input file and maximum chunk size (1 MB)
const inputFile = "synonyms.json";
const maxSize = 1 * 1024 * 1024; // 1 MB in bytes

// Split the JSON data
const chunks = splitJson(inputFile, maxSize);

// Save each chunk as a separate file
chunks.forEach((chunk, index) => {
  const chunkFilename = `chunk_${index + 1}.json`;
  fs.writeFileSync(chunkFilename, JSON.stringify(chunk, null, 2));
  console.log(`Chunk ${index + 1} saved as ${chunkFilename}`);
});

console.log("Splitting completed.");
