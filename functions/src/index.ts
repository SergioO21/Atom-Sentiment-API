import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as AWS from "aws-sdk";
import * as cors from "cors";
import {toParse} from "./parser";


admin.initializeApp(functions.config().firebase);
AWS.config.loadFromPath("./config.json");

const app = express();
app.use(cors({origin: true}));

const Comprehend = new AWS.Comprehend();
const db = admin.firestore();


app.post("/", async (req, res) => {
  try {
    const responses: Record<string, unknown> = {};
    const data = toParse(req.body.Text);

    for (const author of data) {
      const response: Record<string, unknown> = {};
      const params = {
        Text: author.messages,
        LanguageCode: "",
      };

      const LanguageResponse = await Comprehend.detectDominantLanguage(
          req.body).promise();
      params.LanguageCode = LanguageResponse.Languages![0].LanguageCode!;

      const EntitiesResponse = await Comprehend.detectEntities(
          params).promise();
      const Entities = EntitiesResponse.Entities;
      for (const entity of Entities!) {
        delete entity["Score"];
        delete entity["BeginOffset"];
        delete entity["EndOffset"];
      }
      response.Entities = Entities;

      const SentimentsResponse = await Comprehend.detectSentiment(
          params).promise();
      response.Sentiments = SentimentsResponse;

      response.Text = [author.messages];
      responses[author.author] = response;
    }

    responses.queryTime = admin.firestore.FieldValue.serverTimestamp();
    responses.fullChat = req.body.Text;

    res.send(responses);
    db.collection("History").add(responses);
  } catch (err) {
    res.send(err);
  }
});


app.get("/history", async (req, res) => {
  const data = await db.collection("History").get();

  if (data.size > 0) {
    const response: Record<string, unknown> = {};

    data.forEach((doc) => {
      const docId = doc.id;
      response[docId] = doc.data();
    });
    res.send(response);
  } else {
    res.status(404).json({Error: "EMPTY COLLECTION"});
  }
});

exports.analize = functions.https.onRequest(app);
