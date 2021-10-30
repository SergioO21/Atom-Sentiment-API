<script context="module">
  import { TextUpload } from "../store/store";

  export function TextAreaValue() {
    return document.getElementById("TextArea").value;
  }
</script>


<textarea
  type="text"
  id="TextArea"
  placeholder="Paste or upload the Whatsapp chat to be analyzed
  (Use the default export format)."
  >{$TextUpload}</textarea>


<style>
  #TextArea {
    width: 500px;
    height: 300px;
    resize: none;
    box-shadow: 0 0 20px #ccc;
  }
</style>