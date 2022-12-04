import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let pointsMap: Record<string, number> = {};
// Capitals
for (let i = 1; i <= 26; i++) {
  const capitalChar = String.fromCharCode(i + 64);
  const lowerChar = String.fromCharCode(i + 96);

  pointsMap[lowerChar] = i;
  pointsMap[capitalChar] = i + 26;
}

const lines = readFileSync(resolve(__dirname, "input.txt"))
  .toString()
  .split("\n")
  .filter((line) => line !== "");
const sacks = lines.map((line) => [
  line.substring(0, line.length / 2),
  line.substring(line.length / 2),
]);

const inBoth = sacks.map((line) => {
  const seen = line[0].split("");
  let inBothInternal = "";

  line[1].split("").forEach((char) => {
    if (seen.includes(char)) {
      inBothInternal = char;
    }
  });

  return inBothInternal;
});

/** @type {number} */
const points = inBoth
  .map((char) => pointsMap[char])
  .reduce((prev, cur) => prev + cur, 0);

console.log(points);

let groups: string[][] = [];
lines.forEach((line, index) => {
  const group = (index - (index % 3)) / 3;

  if (groups[group] === undefined) {
    groups[group] = [];
  }

  groups[group].push(line);
});

const groupSame = groups.map((group) => {
  const seen: Record<string, number> = {};

  group.forEach((member) => {
    const seenInMember: string[] = [];
    member.split("").forEach((char) => {
      if (seenInMember.includes(char)) {
        return;
      } else {
        seenInMember.push(char);
      }

      if (seen[char]) {
        seen[char] += 1;
      } else {
        seen[char] = 1;
      }
    });
  });

  return Object.entries(seen).find(([k, v]) => v === 3)![0];
});

const groupPoints = groupSame
  .map((char) => pointsMap[char])
  .reduce((prev, cur) => prev + cur, 0);

console.log(groupPoints);
