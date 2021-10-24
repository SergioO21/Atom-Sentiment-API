import * as admin from "firebase-admin";
import * as AWS from "aws-sdk";
import {toParse} from "./parser";
import {badWords} from "./badWords";


AWS.config.loadFromPath("./config.json");
const Comprehend = new AWS.Comprehend();


/**
 * This function is in charge of performing all the necessary
 * analysis within the chat to return your insights.
 *
 * @param {string} text - Text to parse.
 *
 * @return {Promise<Record<string, unknown>>} - Returns the insights of
 * the entire chat as well as those of each participant.
 */
export async function analyze(text: string): Promise<Record<string, unknown>> {
  try {
    const responses: Record<string, unknown> = {};
    const data = toParse(text);

    for (const author of data) {
      const response: Record<string, unknown> = {};
      const params = {
        Text: author.messages,
        LanguageCode: "",
      };

      const LanguageResponse = await Comprehend.detectDominantLanguage(
          {Text: text}).promise();
      params.LanguageCode = LanguageResponse.Languages![0].LanguageCode!;

      const EntitiesResponse = await Comprehend.detectEntities(
          params).promise();
      const Entities = EntitiesResponse.Entities;
      for (const entity of Entities!) {
        delete entity["Score"];
        delete entity["BeginOffset"];
        delete entity["EndOffset"];
      }

      const ClearEntities: AWS.Comprehend.ListOfEntities = [];
      for (const data of Entities!) {
        if (ClearEntities.length === 0) {
          ClearEntities.push(data);
        } else {
          for (let i = 0; i < ClearEntities.length; i++) {
            if (data.Text === ClearEntities[i].Text) {
              break;
            }
            if (i === ClearEntities.length - 1) {
              ClearEntities.push(data);
            }
          }
        }
      }
      response.Entities = ClearEntities;

      const SentimentsResponse = await Comprehend.detectSentiment(
          params).promise();
      response.Sentiments = SentimentsResponse;

      response.Text = author.messages;
      response.BadWords = badWords(author.messages);
      responses[author.author] = response;
    }

    responses.queryTime = admin.firestore.FieldValue.serverTimestamp();
    responses.fullChat = text;

    return responses;
  } catch (err) {
    return {Error: err};
  }
}
