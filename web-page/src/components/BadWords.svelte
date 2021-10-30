<script>
  import { onlyShow } from "../store/store";

  export let BadWords;
  export let Author;

  let ShowBadwords = [];
</script>


{#if BadWords.length > 0 && $onlyShow.includes(Author)}
  <div class="BadWords">
    <h3>Bad words of { Author }</h3>

    <div class="allBadWords">
      <img class="badWordEmoji" src="static/bad-words.gif" alt="Bad Words">

      <div class="toggleButton">
        <input
        type="checkbox"
        id={ [Author.replace( /\s/g, ""), "BadWord"].join("") }
        bind:group={ ShowBadwords }
        value={ Author }
        hidden />
        <label for={ [Author.replace( /\s/g, ""), "BadWord"].join("") }>
          <img class="moreInfo" src="static/info.png" alt="Show Badwords">
        </label>
      </div>

      {#if ShowBadwords.includes(Author)}
        <div id="BadWordsTable">
          <table>
            {#each BadWords as BadWord}
              <tr>
                <td>{ BadWord }</td>
              </tr>
            {/each}
          </table>
        </div>
      {/if}
    </div>

  </div>
{:else if BadWords.length === 0 && $onlyShow.includes(Author)}
  <div class="notFound">
    <h3>No Bad Words Found</h3>
  </div>
{/if}


<style>
  .notFound {
    text-align: center;
  }

  .BadWords {
    text-align: center;
  }

  .allBadWords {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .badWordEmoji {
    max-width: 300px;
    min-width: 100px;
  }

  .moreInfo {
    width: 25px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .moreInfo:hover {
    width: 28px;
  }

  #BadWordsTable {
    max-height: 175px;
    overflow-y: scroll;
    border-collapse: collapse;
    border-radius: 20px;
    box-shadow: 0 0 20px #ccc;
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

  td {
    text-align: center;
    max-width: 200px;
    padding: 8px;
  }

  tr:nth-child(even){
    background-color: #FFF5EE
  }
</style>