<script>
  import Checkboxes from "./components/Checkboxes.svelte";
  import UploadButton from "./components/UploadButton.svelte";
  import TextArea from "./components/TextArea.svelte";
  import AnalyzeButton from "./components/AnalyzeButton.svelte";
  import EntitiesTable from "./components/EntitiesTable.svelte";
  import Sentiments from "./components/Sentiments.svelte";
  import BadWords from "./components/BadWords.svelte";
  import { Waiting, Authors } from "./store/store";
</script>

<header>
  <img class="Logo" src="static/logo-title.png" alt="Logo Title">
</header>
<br>
<main>
  <div class="userInput">
    <UploadButton />
    <TextArea />
    <Checkboxes />
  </div>
  <div class="Analyze">
    <AnalyzeButton />
  </div>
  {#if $Waiting}
    <div class="waiting">
      <img class="waitingLogo" src="static/waiting.gif" alt="Waiting icon">
    </div>
  {:else}
    <br>
    <div class="Responses">
      {#if Object.keys($Authors).length > 0}
        {#each Object.entries($Authors) as [Author, Values]}
          <div class="ResponseAuthor">
            <Sentiments { Author } Sentiments={ Values.Sentiments } />
            <EntitiesTable { Author } Entities={ Values.Entities } />
            <BadWords { Author } BadWords={ Values.BadWords } />
          </div>
          <br> <br>
        {/each}
      {/if}
    </div>
  {/if}
</main>

<style>

  * {
    font-family: 'Poppins', sans-serif;
  }

  header {
    display: flex;
    justify-content: center;
  }

  .Logo {
    max-width: 800px;
    min-width: 400px;
  }

  .userInput {
    display: flex;
    justify-content: center;
  }

  .Analyze {
    text-align: center;
  }

  .Responses {
    display: flex;
    flex-direction: column;
  }

  .ResponseAuthor {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .waiting {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .waitingLogo {
    max-width: 400px;
    min-width: 200px;
  }
</style>
