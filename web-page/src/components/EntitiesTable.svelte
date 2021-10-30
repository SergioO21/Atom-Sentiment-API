<script>
  import { onlyShow } from "../store/store.js";

  export let Entities;
  export let Author;
</script>


{#if Entities.length > 0 && $onlyShow.includes(Author)}
  <div class="container">
    <h3>Entities of { Author }</h3>

    <div class="Table">
      <table>
        <tr>
          <th width="75">Entity</th>
          <th width="25">Type</th>
        </tr>
        {#each Entities as Entity}
          <tr>
            <td width="75">{ Entity.Text }</td>
            <td width="25">{ Entity.Type }</td>
          </tr>
        {/each}
      </table>
    </div>

  </div>
{:else if Entities.length === 0 && $onlyShow.includes(Author)}
  <div class="notFound">
    <h3>No Entities Found</h3>
  </div>
{/if}

<style>
  .container {
    text-align: center;
    height: 203px;
  }

  .notFound {
    width: 500px;
    text-align: center;
  }

  .Table {
    max-height: 175px;
    overflow-y: scroll;
    border-radius: 20px;
    box-shadow: 0 0 20px #ccc;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    width: 500px;
  }

  th, td {
    text-align: center;
    padding: 8px;
    max-width: 350px;
    overflow-wrap: break-word;
  }

  tr:nth-child(even){
    background-color: #FFF5EE
  }

  th {
    background-color: #FF6600;
    color: white;
  }
</style>