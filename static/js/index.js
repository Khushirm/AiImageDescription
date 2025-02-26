const form = document.getElementById("form");
const fileInput = document.getElementById("file");
const description = document.getElementById("description");
const btn = document.getElementById("btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btn.disabled = true;
  btn.innerText = "Loading...";

  if (fileInput.files.length === 0) {
    return alert("Please select a file first");
  }

  const reader = new FileReader();

  reader.onloadend = function () {
    const base64String = reader.result.split(",")[1];

    fetch("/api/generate-description", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64String }),
    })
      .then((res) => res.json())
      .then((data) => {
        btn.innerText = "Generate";
        description.innerHTML = data.description;
      });
  };

  reader.readAsDataURL(fileInput.files[0]);
});