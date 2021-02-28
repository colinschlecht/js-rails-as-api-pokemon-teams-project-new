const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", () => {
  //FETCH
  getTrainers();

  /// fetch to get trainers and pass to build trainer card
  function getTrainers() {
    fetch(TRAINERS_URL)
      .then((resp) => resp.json())
      .then((trainers) =>
        trainers.forEach((trainer) => buildTrainerCard(trainer))
      );
  }

  function releasePokemon(pokemon) {
    fetch(`${POKEMONS_URL}/${pokemon.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        let pokemonLi = document.querySelector(
          `[data-pokemon-id='${pokemon.id}']`
        );
        pokemonLi.parentElement.remove();
      });
  }
  // function postPokemon(trainer) {
  //   fetch(POKEMONS_URL, {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json'
        
  //     },
  //     body: JSON.stringify({
  //       trainer_id: trainer.id
  //     })
  //   })
  //     .then(resp => resp.json())
  //     .then(pokemon => {
  //       let card = document.querySelector(`[data-id='${trainer.id}']`)
  //       console.log(card)
  //       buildPokemonLi(pokemon, card)
  //     });
  // }
  function postPokemon(e) {
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify({
        trainer_id: e.target.dataset.trainerId
      })
    })
      .then(resp => resp.json())
      .then(pokemon => {
        let card = document.querySelector(`[data-id='${e.target.dataset.trainerId}']`)
        console.log(card)
        buildPokemonLi(pokemon, card)
      });
  }

  //------- functions

  function buildTrainerCard(trainer) {
    let div = document.createElement("div");
    let p = document.createElement("p");
    let btn = document.createElement("button");
    let ul = document.createElement("ul");

    let main = document.querySelector("main");

    div.className = "card";
    div.setAttribute("data-id", trainer.id);
    p.textContent = trainer.name;
    btn.textContent = "Add Pokemon";
    btn.setAttribute("data-trainer-id", trainer.id);
    // ----- calls the post pokemon function to add a poke
    btn.addEventListener("click", postPokemon);
    // btn.addEventListener("click", () => postPokemon(trainer));

    trainer.pokemons.forEach((pokemon) => buildPokemonLi(pokemon, ul));

    div.append(p, btn, ul);
    main.appendChild(div);
  }

  function buildPokemonLi(pokemon, ul) {
    let li = document.createElement("li");
    li.textContent = `${pokemon.nickname} (${pokemon.species})`;
    let btn = document.createElement("button");
    btn.textContent = "Release";
    btn.className = "release";
    btn.setAttribute("data-pokemon-id", pokemon.id);
    // ----- calls the release pokemon function to delete a poke
    btn.addEventListener("click", () => releasePokemon(pokemon));

    li.appendChild(btn);
    ul.appendChild(li);
  }
});

/* <div class="card" data-id="1"><p>Prince</p>
  <button data-trainer-id="1">Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  </ul>
</div> */
