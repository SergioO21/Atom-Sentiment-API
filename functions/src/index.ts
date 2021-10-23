import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import {analyze} from "./analize";


admin.initializeApp(functions.config().firebase);

const app = express();
app.use(cors({origin: true}));

const db = admin.firestore();


app.post("/", async (req, res) => {
  const response = await analyze(req.body.Text);

  if (!("Error" in response)) {
    db.collection("History").add(response);
  }
  res.send(response);
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
