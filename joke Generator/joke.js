const btn = document.querySelector("button");
const setup = document.querySelector(".setup");
const punchline = document.querySelector(".punchline");
const loader = document.querySelector("#loader");

loader.style.display = "none";
btn.addEventListener("click", async (e) => {
  try {
    loader.style.display = "block";
    setup.textContent = "";
    punchline.textContent = "";

    let response = await fetch(
      "https://official-joke-api.appspot.com/random_joke"
    );

    if (!response.ok) {
      throw new Error("Response not received.");
    }

    let data = await response.json();
    console.log(data);

    setTimeout(() => {
      loader.style.display = "none";
      setup.textContent = data.setup;
      punchline.textContent = data.punchline;
      punchline.classList.remove("opacity-0");
      setup.classList.remove("opacity-0");
    }, 1000);
  } catch (err) {
    console.error(err);
    setup.textContent = "Sorry couldnt get a joke.";
    punchline.textContent = "";
    loader.style.display = "none";
  }
});
