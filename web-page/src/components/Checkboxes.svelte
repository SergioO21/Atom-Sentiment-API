<script>
  import { Authors, onlyShow } from "../store/store";
</script>


<div class="Checkboxes">
  {#if Object.keys($Authors).length > 0}
    {#each Object.keys($Authors) as Author}
      <div>
        <div class="Checkbox">
          <input type="checkbox"
          id={ [Author.replace( /\s/g, ""), "Checkbox"].join("") }
          bind:group={$onlyShow}
          value={ Author }
          hidden>
          <label for={ [Author.replace( /\s/g, ""), "Checkbox"].join("") }></label>
          <p>{ Author }</p>
        </div>
      </div>
    {/each}
  {/if}
</div>


<style>
  .Checkboxes {
    margin-left: 20px;
    width: 200px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .Checkboxes div {
    box-sizing: border-box;
    width: 100%;
    text-align: left;
  }

  .Checkbox {
    display: flex;
    justify-content: left;
    align-items: center;
  }

  .Checkbox p {
    margin-left: 10px;
  }

  .Checkbox label {
    display: flex;
    justify-content: center;
    align-items:center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    cursor: pointer;
    height: 18px;
    left: 0;
    top: 0;
    width: 18px;
    box-shadow: 0 0 20px #ccc;
  }

  .Checkbox label:after {
    border: 2px solid #fff;
    border-top: none;
    border-right: none;
    content: "";
    height: 3px;
    left: 4px;
    opacity: 0;
    top: 6px;
    transform: rotate(-45deg);
    width: 9px;
  }

  .Checkbox input[type="checkbox"]:checked + label {
    background-color: #FF6600;
    border-color: #FF6600;
  }

  .Checkbox input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }
</style>