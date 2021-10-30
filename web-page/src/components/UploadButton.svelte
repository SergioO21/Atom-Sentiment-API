<script>
  import { TextUpload } from "../store/store";

  function toRead() {
    document.getElementById("UploadButton").addEventListener("change", getFile);
  }

  function getFile(event) {
    const input = event.target;
    if ("files" in input && input.files.length > 0) {
      fillContent(input.files[0]);
    }
  }

  function fillContent(file) {
    readText(file).then(content => {
      TextUpload.update(value => content);
    }).catch(error => console.log(error));
  }

  function readText(file) {
      const reader = new FileReader();
      
      return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
      });
  }
</script>

<div class="Upload">
  <input type="file" id="UploadButton" accept=".txt" hidden/>
  <label for="UploadButton" on:click={toRead}>Upload</label>
</div>


<style>
  .Upload {
    margin-right: 20px;
    width: 100px;
    padding-left: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    background-color: #E06126;
    color: white;
    padding: 6.4px;
    border-radius: 5px;
    cursor: pointer;
    border: 1px solid #ccc;
  }

  label:hover {
    background-color: #FF6600;
    box-shadow: 0 0 20px #ccc;
  }
</style>