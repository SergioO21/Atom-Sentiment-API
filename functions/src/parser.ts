import * as chatParser from "whatsapp-chat-parser";

/**
 * This function is in charge of parsing a complete chat
 * and return the values of interest in an organized way.
 *
 * @param {string} text - Text to parse.
 *
 * @return {Record<string, (string|string[])>[]} - Returns messages from each
 * participant in the conversation
 */
export function toParse(text: string): Record<string, string>[] {
  const chat = chatParser.parseStringSync(text);

  const Authors: Record<string, string>[] = [];
  const Added: string[] = [];

  for (const info of chat) {
    if (info.author != "System" && Added.indexOf(info.author) === -1) {
      Authors.push({author: info.author, messages: ""});
      Added.push(info.author);
    }
  }

  let allMessages = "";

  for (const info of chat) {
    for (const author of Authors) {
      if (info.author === author.author) {
        author.messages = [author.messages, info.message].join("\n");
        allMessages = [allMessages, info.message].join("\n");
      }
    }
  }
  Authors.push({author: "All", messages: allMessages});
  return Authors;
}
