const btn = document.querySelector(".btn");
const Pokemon_Details = document.querySelector(".Pokemon_Details");
const pname = document.querySelector(".name");
const ability = document.querySelector(".ability");
const type = document.querySelector(".type");
const error_container = document.querySelector(".error_container");
// const error_message = document.querySelector(".error_message");
const image = document.querySelector("img");
const img_container = document.querySelector(".image");

btn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    error_container.classList.add("hidden");
    Pokemon_Details.classList.add("hidden");
    img_container.classList.add("hidden");
    const id = Math.floor(Math.random() * 1010) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    if (!response.ok) {
      throw new Error("Response not received.");
    }

    const data = await response.json();
    console.log(data);

    // displaying the images
    img_container.classList.remove("hidden");
    let image_source = data.sprites.other["official-artwork"].front_default;
    image.src = image_source;

    Pokemon_Details.classList.remove("hidden");
    pname.textContent = `Pokemon Name: ${data.name}`;
    type.textContent = `Type: ${data.types.map((t) => t.type.name).join(", ")}`;
    ability.textContent = `Ability: ${data.abilities
      .map((a) => a.ability.name)
      .join(", ")}`;
  } catch (err) {
    console.error(err);
    error_container.classList.remove("hidden");
  }
});
