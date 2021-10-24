import {readFileSync} from "fs";


const data = readFileSync("./SpanishBadWords.json", "utf-8");
const SpanishBadWords = JSON.parse(data);


/**
 * @param {string} text - Text to analyze.
 *
 * @return {string[]} - Returns all bad words found in the text.
*/
export function badWords(text: string): string[] {
  const allBadWords: string[] = [];

  for (const badWord of SpanishBadWords) {
    if (text.toLowerCase().includes(badWord)) {
      allBadWords.push(badWord);
    }
  }
  const ClearBadWords = [...new Set(allBadWords)];
  return ClearBadWords;
}
