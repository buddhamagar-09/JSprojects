let search_btn = document.getElementById("search-button");
let error_msg = document.getElementById("error-msg");
const img = document.querySelector("#pokemon-image");

search_btn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const name = document.querySelector("input").value.toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

    if (!response.ok) {
      throw new Error("could not fetch data");
    }
    const data = await response.json();
    console.log(data.name);
    // console.log(data);

    // displaying the image
    // const pokemon_img = data.sprites.front_default;
    img.src = data.sprites.other["official-artwork"].front_default;
    // img.src = pokemon_img;
    img.classList.remove("hidden");
    // Displaying additional details
    document.querySelector("h2").classList.remove("hidden");
    document.getElementById("pokemon-name").textContent = `Name: ${data.name}`;
    document.getElementById("pokemon-type").textContent = `Type: ${data.types.map(t => t.type.name).join(", ")}`;
    document.getElementById("pokemon-ability").textContent = `Abilities: ${data.abilities.map(a => a.ability.name).join(", ")}`;  

    // Hide error message if successful
    error_msg.classList.add("hidden");
  } catch (err) {
    console.error(err);
    error_msg.innerHTML = "Please enter a valid Pokemon name";
    error_msg.classList.remove("hidden");
    error_msg.classList.add("text-red-600");
    error_msg.classList.add("font-bold");
    error_msg.classList.add("animate-pulse");
    error_msg.classList.add("mt-4");
 
    // Optionally hide the image if error
    // const img = document.querySelector("img");
    img.classList.add("hidden");
    document.querySelector("h2").classList.add("hidden");
    document.getElementById("pokemon-name").textContent = "";
    document.getElementById("pokemon-type").textContent = "";
    document.getElementById("pokemon-ability").textContent = "";
  }
  document.querySelector("input").value = "";
});
