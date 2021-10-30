<script>
  import { TextAreaValue } from "./TextArea.svelte";
  import { Waiting, Authors, onlyShow } from "../store/store";

  function toJSON() {
    const TextUpload = TextAreaValue();

    if (TextUpload) {
      const obj = {
        Text: TextUpload
      };
      return JSON.stringify(obj);
    }
  }

  async function AnalyzeText() {
    Waiting.set(true);
    Authors.set([]);
    onlyShow.set([]);

    const params = toJSON();

    if (params) {
      const response = await fetch(
      "https://us-central1-sentiment-api-10a01.cloudfunctions.net/analize",
      {
        method: 'POST',
        body: params,
        mode: 'cors',
        headers: {
          'Content-type': 'application/json'
        }
      }).catch(function (err) {
        console.log(err);
      });

      const json = await response.json();

      const AllAuthors = {};

      for (const [key, value] of Object.entries(json)) {
        if (key != "queryTime" && key != "fullChat")
        AllAuthors[key] = value;
      }

      Waiting.set(false);
      Authors.set(AllAuthors);
      onlyShow.set(["All"]);
    }
  }
</script>


<button class="AnalyzeButton" on:click={ AnalyzeText }>Analyze</button>


<style>
  .AnalyzeButton {
    margin-top: 10px;
    background-color: #E06126;
    color: white;
    border-radius: 5px;
  }

  .AnalyzeButton:hover {
    background-color: #FF6600;
    box-shadow: 0 0 20px #ccc;
  }
</style>