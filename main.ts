import { mkdirSync, writeFileSync } from "node:fs";

// The excuse that almost works: a text to the boss on GTA 6 launch
// week. The joke is the commute detail doing the work — the train
// doors took the bag, not the gamer, so the bag is on its way to the
// depot and the gamer is standing on the platform with nothing to
// carry and no way to get to work. It is specific, boring in the
// right way (a train, a bag, a depot), and it reads like it was
// typed one-handed while watching the train leave.
const excuse =
  "Boss, the train doors closed on my bag and it rode to the depot without me.";

// The gate: UTF-8 text, one line, 1-140 characters, at most 20
// words. Check both limits here so an invalid line can never ship.
const MAX_CHARS = 140;
const MAX_WORDS = 20;

function oneLine(text: string): string {
  const line = text.replace(/\s+/g, " ").trim();
  const words = line === "" ? 0 : line.split(" ").length;
  if (line.length < 1 || line.length > MAX_CHARS) {
    throw new Error(`excuse must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  if (words > MAX_WORDS) {
    throw new Error(`excuse must be at most ${MAX_WORDS} words, got ${words}`);
  }
  if (line.includes("\n")) {
    throw new Error("excuse must be a single line");
  }
  return line;
}

const line = oneLine(excuse);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
