<script>
  import { onlyShow } from "../store/store";
  import { afterUpdate } from "svelte";

  export let Sentiments;
  export let Author;

  let canvas = null;
  let showScores = [];
  let SentimentScores = [];

  function setScores(allScores) {
    SentimentScores.push(
      Number((allScores.Positive * 100).toFixed(2)),
      Number((allScores.Negative * 100).toFixed(2)),
      Number((allScores.Neutral * 100).toFixed(2)),
      Number((allScores.Mixed * 100).toFixed(2)));
  }

  function CreateChar() {
    const labels = ["Positive", "Negative", "Neutral", "Mixed"];
    const Scores = SentimentScores;
    const barColors = [
      "#2ECC71",
      "#C0392B",
      "#2980B9",
      "#F1C40F"
    ];

    if (!canvas){
      return false;
    }

    let myChart = canvas.getContext("2d");
    new Chart(myChart, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          backgroundColor: barColors,
          data: Scores
        }]
      },
      options: {
        legend: {display: false},
        title: {
          display: true,
          text: "Sentiment Scores"
        }
      }
    });
  }
  afterUpdate(CreateChar);
</script>


{#if Object.keys(Sentiments).length > 0 && $onlyShow.includes(Author)}
  <div class="SentimentResults">
    <h3>Average sentiment of { Author }</h3>

    <div class="avSentiment">
      {#if Sentiments.Sentiment === "POSITIVE"}
        <img class="SentimentEmoji" src="static/positive.gif" alt="Positive">
      {:else if Sentiments.Sentiment === "NEGATIVE"}
        <img class="SentimentEmoji" src="static/negative.gif" alt="Negative">
      {:else if Sentiments.Sentiment === "NEUTRAL"}
        <img class="SentimentEmoji" src="static/neutral.gif" alt="Neutral">
      {:else if Sentiments.Sentiment === "MIXED"}
        <img class="SentimentEmoji" src="static/mixed.gif" alt="Mixed">
      {/if}

      <div class="toggleButton">
        <input
          type="checkbox"
          id={ [Author.replace( /\s/g, ""), "SentimentScores"].join("") }
          bind:group={ showScores }
          value={ Author }
          hidden
        />
        <label
          for={ [Author.replace( /\s/g, ""), "SentimentScores"].join("") }
          on:click={ setScores(Sentiments.SentimentScore) }
        >
          <img class="moreInfo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infobox_info_icon.svg/1200px-Infobox_info_icon.svg.png" alt="Show Scores">
        </label>
      </div>

      {#if showScores.includes(Author)}
        <canvas
          class="Charts"
          id={  [Author.replace( /\s/g, ""), "Scores"].join("") }
          bind:this={canvas}>
        </canvas>
      {/if}
    </div>

  </div>
{/if}


<style>
  .avSentiment {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .SentimentEmoji {
    max-width: 300px;
    min-width: 100px;
  }

  .SentimentResults {
    text-align: center;
  }

  .Charts {
    max-width: 350px;
    width: 100%;
    animation: reveal 1s linear forwards;
  }

  @keyframes reveal {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .moreInfo {
    width: 25px;
    margin-left: 10px;
  }

  .moreInfo:hover {
    width: 28px;
  }
</style>
