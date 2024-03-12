const fs = require("node:fs");
const path = require("node:path");
const readLine = "node:readLine";

function escapeHtmlSpaceCharacters(text) {
  return text.replace(/[<>$]/g, (match) => {
    switch (match) {
      case "<":
        return "&lt";
      case ">":
        return "&lt";
      case "&":
        return "&amp";
      default:
        return match;
    }
  });
}

function escapeHtmlFile(inputFilePath, outputFilePath) {
  try {
    const fileContent = fs.readFileSync(inputFilePath, "utf-8");
    const escapedContent = escapeHtmlSpaceCharacters(fileContent);
    fs.writeFileSync(outputFilePath, escapedContent, "utf-8");
    console.log(`arquivo escapado com sucesso: ${outputFilePath}`);
  } catch (error) {
    console.log("Error", error.messade);
    process.exit(1);
  }
}
