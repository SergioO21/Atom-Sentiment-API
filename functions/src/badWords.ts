import {readFileSync} from "fs";


const data = readFileSync("./SpanishBadWords.json", "utf-8");
const SpanishBadWords = JSON.parse(data);

const allBadWords: string[] = [];

/**
 * @param {string} text - Text to analyze.
 *
 * @return {string[]} - Returns all bad words found in the text.
*/
export function badWords(text: string): string[] {
  for (const badWord of SpanishBadWords) {
    if (text.includes(badWord)) {
      allBadWords.push(badWord);
    }
  }
  return allBadWords;
}
