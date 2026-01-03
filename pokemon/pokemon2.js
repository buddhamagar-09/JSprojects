const search_btn = document.getElementById("search-button");
const pokemon_name = document.getElementById("name");
const pokemon_type = document.getElementById("type");
const pokemon_ability = document.getElementById("ability");
const img = document.getElementById("image");
const error = document.getElementById("error");
const loader = document.getElementById("loader");

search_btn.addEventListener("click", async (e) => {
  e.preventDefault();

  const name = document.getElementById("enter");
  let val = name.value.toLowerCase().trim();

  if (!val) return; // prevent empty input

  // 🔹 Reset previous results
  img.style.display = "none";
  document.querySelector("h1").style.display = "none";
  pokemon_name.textContent = "";
  pokemon_type.textContent = "";
  pokemon_ability.textContent = "";
  error.style.display = "none";

  // 🔹 Show loader
  loader.style.display = "block";

  try {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${val}`);
    if (!response.ok) throw new Error("Pokémon not found");

    let data = await response.json();

    // 🔹 Show Pokémon Image and Details after 1s (optional delay)
    setTimeout(() => {
      loader.style.display = "none";
      img.src = data.sprites.other["official-artwork"].front_default;
      img.style.display = "block";

      document.querySelector("h1").style.display = "block";
      pokemon_name.textContent = `Name: ${data.name}`;
      pokemon_type.textContent = `Type: ${data.types.map(t => t.type.name).join(", ")}`;
      pokemon_ability.textContent = `Ability: ${data.abilities.map(a => a.ability.name).join(", ")}`;
    }, 1000);

  } catch (err) {
    setTimeout(() => {
      console.error(err);
    loader.style.display = "none";  // hide loader immediately
    error.style.display = "block";
    },1000);   // show error message
  }
  name.value = "";
});
