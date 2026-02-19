import fs from "node:fs";

const raw = fs.readFileSync(new URL("./lint-report.json", import.meta.url), "utf8");
const data = JSON.parse(raw);

const byRule = new Map();
const byFile = new Map();
let total = 0;

for (const file of data) {
  if (file.messages.length > 0) {
    byFile.set(file.filePath, file.messages.length);
  }
  for (const msg of file.messages) {
    const rule = msg.ruleId ?? "unknown";
    byRule.set(rule, (byRule.get(rule) ?? 0) + 1);
    total += 1;
  }
}

console.log(`TOTAL_MESSAGES ${total}`);
console.log("TOP_RULES");
for (const [rule, count] of [...byRule.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`${rule} ${count}`);
}

console.log("TOP_FILES");
for (const [filePath, count] of [...byFile.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)) {
  console.log(`${count} ${filePath}`);
}
