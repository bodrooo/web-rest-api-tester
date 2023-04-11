import Ask from "./utils/ask.js";

const ask = new Ask();

const baseUrl = document.getElementById("base-url");
const routeUrl = document.getElementById("route-url");
const allUrl = document.querySelectorAll(".input input");
const send = document.getElementById("send");
const json = document.getElementById("json");
const spinner = document.getElementById("spinner");

const showError = (error) => {
  const errorTag = document.createElement("div");
  errorTag.textContent = `Error: ${error.message}`;
  errorTag.classList.add("error");
  while (json.firstChild) json.removeChild(json.firstChild);
  json.appendChild(errorTag);
  spinner.style.display = "none";
};


allUrl.forEach((input) => {
  input.addEventListener("change", async () => {
    if (input.value.length !== 0) {
      spinner.style.display = "block";
      try {
        const results = await ask.get(routeUrl.value);
        const resultsText = JSON.stringify(results, null, 2);
        const preTag = document.querySelector("#json pre");
        while (json.firstChild) json.removeChild(json.firstChild);
        if (preTag) preTag.remove()
        const pre = document.createElement("pre");
        pre.textContent = resultsText;
        json.appendChild(pre);
      } catch (error) {
        showError(error)
      } finally {
        spinner.style.display = "none";
      }
    }
  });
});

send.addEventListener("click", async () => {
  ask.setBaseUrl(baseUrl.value);
  spinner.style.display = "block";
  try {
    const results = await ask.get(routeUrl.value);
    const resultsText = JSON.stringify(results, null, 2);
    const preTag = document.querySelector("#json pre");
    if (preTag) preTag.remove();
    const pre = document.createElement("pre");
    pre.textContent = resultsText;
    json.appendChild(pre);
  } catch (error) {
    showError(error)
  } finally {
    spinner.style.display = "none";
  }
});
