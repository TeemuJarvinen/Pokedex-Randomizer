"use strict";

const totalNumberOfPokemons = 898;
const pokemonCardCount = 7;
const button = document.getElementById("getRandomPokemon");
const buttonShiny = document.getElementById("shinySwitch");

const pokemonName = document.querySelectorAll(".pokemonName");
const pokemonID = document.querySelectorAll(".pokemonID");
const pokemonImg = document.querySelectorAll(".pokemonImg");
const pokemonType = document.querySelectorAll(".pokemonType");

const pokemonAbility1 = document.querySelectorAll(".pokemonAbility1");
const pokemonAbility2 = document.querySelectorAll(".pokemonAbility2");
const pokemonAbility3 = document.querySelectorAll(".pokemonAbility3");

const shinySwitch = document.getElementById("shinySwitch");

var isShiny = false;

getPokemons();

// FUNCTIONS

function makeFirstCharUpper(x) {
  return x.charAt(0).toUpperCase() + x.slice(1);
}

function makeSentenceWithDashUpper(x) {
  let y = makeFirstCharUpper(x);
  return y.replace(/-\S/g, (y) => y.toUpperCase());
}

function makeFirstCharUpperForSentence(x, y) {
  return (
    x.charAt(0).toUpperCase() +
    x.slice(1) +
    " & " +
    y.charAt(0).toUpperCase() +
    y.slice(1)
  );
}

function getPokemons() {
  for (let i = 0; i < pokemonCardCount; i++) {
    pokemonName[i].innerHTML = "<em>Loading...</em>";
    pokemonID[i].innerHTML = "<em>Loading...</em>";
    pokemonType[i].innerHTML = "<em>Loading...</em>";
    pokemonAbility1[i].innerHTML = "<em>Loading...</em>";
    pokemonAbility2[i].innerHTML = "<em>Loading...</em>";
    pokemonAbility3[i].innerHTML = "<em>Loading...</em>";

    const randomPokemon = Math.ceil(Math.random() * totalNumberOfPokemons);
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`)
      .then((Response) => Response.json())
      .then((pokemon) => {
        let pokemonSprite = pokemon.sprites.front_default;
        if (isShiny) {
          pokemonSprite = pokemon.sprites.front_shiny;
        }

        pokemonImg[i].src = pokemonSprite;
        pokemonID[i].innerHTML = "#" + pokemon["id"];
        pokemonName[i].innerHTML = makeFirstCharUpper(pokemon.name);

        if (pokemon.types.length > 1) {
          pokemonType[i].innerHTML = makeFirstCharUpperForSentence(
            pokemon.types[0].type.name,
            pokemon.types[1].type.name
          );
        } else {
          pokemonType[i].innerHTML = makeFirstCharUpper(
            pokemon.types[0].type.name
          );
        }

        if (pokemon.abilities.length > 2) {
          pokemonAbility1[i].innerHTML = makeSentenceWithDashUpper(
            pokemon.abilities[0].ability.name
          );
          pokemonAbility2[i].innerHTML = makeSentenceWithDashUpper(
            pokemon.abilities[1].ability.name
          );
          pokemonAbility3[i].innerHTML = makeSentenceWithDashUpper(
            pokemon.abilities[2].ability.name
          );
        } else if (pokemon.abilities.length > 1) {
          pokemonAbility1[i].innerHTML = makeSentenceWithDashUpper(
            pokemon.abilities[0].ability.name
          );
          pokemonAbility2[i].innerHTML = makeSentenceWithDashUpper(
            pokemon.abilities[1].ability.name
          );
          pokemonAbility3[i].innerHTML = "---";
        } else {
          pokemonAbility1[i].innerHTML = makeSentenceWithDashUpper(
            pokemon.abilities[0].ability.name
          );
          pokemonAbility2[i].innerHTML = "---";
          pokemonAbility3[i].innerHTML = "---";
        }
      });
  }
}

// BUTTONS

button.addEventListener("click", (e) => {
  e.preventDefault();
  getPokemons();
});

buttonShiny.addEventListener("click", (e) => {
  e.preventDefault();
  let shinyPokemonID = document.querySelectorAll(".pokemonID");

  if (isShiny) {
    shinySwitch.style.backgroundColor = "#64edff";

    for (let i = 0; i < pokemonCardCount; i++) {
      let x = shinyPokemonID[i].innerHTML.slice(1);

      fetch(`https://pokeapi.co/api/v2/pokemon/${x}`)
        .then((Response) => Response.json())
        .then((pokemon) => {
          pokemonImg[i].src = pokemon.sprites.front_default;
        });
    }
    isShiny = false;
  } else {
    shinySwitch.style.backgroundColor = "#70ff3c";

    for (let i = 0; i < pokemonCardCount; i++) {
      let x = shinyPokemonID[i].innerHTML.slice(1);

      fetch(`https://pokeapi.co/api/v2/pokemon/${x}`)
        .then((Response) => Response.json())
        .then((pokemon) => {
          pokemonImg[i].src = pokemon.sprites.front_shiny;
        });
    }
    isShiny = true;
  }
});
