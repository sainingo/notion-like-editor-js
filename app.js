const editor = document.getElementById("editor");
const dropdown = document.getElementById("dropdown");
const resultContainer = document.getElementById("result-container");

let selectedHeading = null;

function handleInput(event) {
  const editorContent = editor.value.trim();

  if (editorContent.endsWith("/1")) {
    showDropdown();
  } else {
    hideDropdown();
  }

  if (event.key === "Enter") {
    event.preventDefault();
    applyHeading();
  }

}

function showDropdown() {
  dropdown.innerHTML = `
  <div class="dropdown-container">
    <h4>Add blocks</h4>
    <p>Keep typing to filter, or escape to exit</p>
    <span>Filtering keyword 1 </span>
    <div class="wrapper" onclick="selectHeading(1)">
      <span>T </span>
     <div class="wrapper-h3">  
      <p>Heading 1 </p>
      <h5>Shortcut: type # + space</h5>
     </div>
     </div>
  </div>
`;

  dropdown.style.display = "block";
}

function hideDropdown() {
  dropdown.style.display = "none";
}

function selectHeading(level) {
  selectedHeading = {
    level,
    text: `Heading ${level}`
  };
  editor.value = editor.value.replace("/1", "");
  editor.setAttribute("placeholder", selectedHeading.text);
  editor.style.fontSize = `2em`;
  hideDropdown();
}

function applyHeading() {
  const editorContent = editor.value;
  if (selectedHeading) {
    const resultElement = document.createElement("div");
    resultElement.innerHTML = `<h${selectedHeading.level}>${editorContent}</h${selectedHeading.level}>`;
    resultContainer.innerHTML = "";
    resultContainer.appendChild(resultElement);
    editor.value = "";
    editor.style.fontSize = "";
    editor.setAttribute("placeholder", "Now this is normal text. All I had to do /+1, and then type my text and hit ENTER/RETURN");
  }


  selectedHeading = null;
  hideDropdown();
}

// Add event listeners using addEventListener
editor.addEventListener("input", handleInput);
editor.addEventListener("keydown", handleInput);