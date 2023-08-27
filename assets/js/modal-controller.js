var entity = null;
var detail = null;

class Details {
  habitat;
  shape;
  growthRate;
  eggGroups;
  captureRate;
  baseHappiness;
}

function State() {
  this.container = null;
  this.btnClose = null;
}

const state = new State();

function init() {
  state.container = document.querySelector("#modal-pokemon-detail");
  state.btnClose = document.querySelector("#detail-close-button");

  state.btnClose.addEventListener("click", handleBtncloseClick);
}

function createPokemon(json) {
  pokemon = new Pokemon();
  pokemon.name = json.name;
  pokemon.number = json.id;
  pokemon.photo = json.sprites.other.home.front_default;
  pokemon.types = json.types.map((typeSlot) => typeSlot.type.name);
  const [type] = pokemon.types;
  pokemon.type = type;
  pokemon.weight = json.weight;

  return pokemon;
}

function setModalDetails(json) {
  console.log(json);
  detail = new Details();
  detail.habitat = json.habitat.name;
  detail.shape = json.shape.name;
  detail.growthRate = json.growth_rate.name;
  detail.eggGroups = json.egg_groups.map((group) => group.name);
  detail.baseHappiness = json.base_happiness;
  detail.captureRate = json.capture_rate;
  console.log(detail);
}

function createModal(pokemon) {
  entity = pokemon;
  document.querySelector(".modal-box").classList.add(entity.type);
  document.querySelector(".btn-container").classList.add(entity.type);
  document.querySelector(".btn-close").classList.add(entity.type);

  const newHtml = `
      <div class="identification-container">
            <li class="pokemon">
            
                <span class="name">${entity.name}</span>
                <span id="detail-number" class="number">#${entity.number}</span>
                <div class="detail">
                    <ol id="modal-detail" class="types">
                    ${entity.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                    </ol>
                </div>
            </li>
            <div class="pokemon-detail-frame">
                <img class="image-detail" src="${entity.photo}" alt="name">
            </div>
      </div>
      <div class="pokemon-data">
                <h3>About</h3>
                <div class="attributes-container">
                    <ul class="pokemon-attributes">
                        <li class="attribute">Species</li>
                        <li class="value">${entity.name}</li>
                        <li class="attribute">Shape</li>
                        <li class="value">${detail.shape}</li>
                        <li class="attribute">Weight</li>
                        <li class="value">${entity.weight}</li>
                        <li class="attribute">Habitat</li>
                        <li class="value">${detail.habitat}</li>
                        <li class="attribute">Base happiness</li>
                        <li class="value">${detail.baseHappiness}</li>
                        <li class="attribute">Capture rate</li>
                        <li class="value">${detail.captureRate}</li>
                    </ul>
                </div>
                <h3>Breeding</h3>
                <div class="attributes-container">
                    <ul class="pokemon-attributes">
                        <li class="attribute">Growth rate</li>
                        <li class="value">${detail.growthRate}</li>
                        <li class="attribute">Egg groups</li>
                        <li class="value">
                          <ol class="egg-group">
                          ${detail.eggGroups
                            .map((group) => `<li class="value">${group}</li>`)
                            .join("")}
                          </ol>
                        </li>
                    </ul>
                </div>
            </div>
  `;
  document
    .querySelector(".btn-container")
    .insertAdjacentHTML("afterend", newHtml);
}

function getAttributes(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return fetch(url)
    .then((response) => response)
    .then((response) => response.json())
    .then((json) => createPokemon(json))
    .then((obj) => createModal(obj));
}

function getDetails(name) {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
  return fetch(url)
    .then((response) => response.json())
    .then((json) => setModalDetails(json));
}
function showModal() {
  state.container.classList.add("active");
}

function closeModal() {
  state.container.classList.remove("active");
  document.querySelector(".identification-container").innerHTML = "";
  document.querySelector(".modal-box").classList.remove(entity.type);
  document.querySelector(".btn-container").classList.remove(entity.type);
  document.querySelector(".btn-close").classList.remove(entity.type);
  document.querySelector(".identification-container").remove();
  document.querySelector(".pokemon-data").remove();
}

function handleDetailLinkClick(event) {
  event.preventDefault();
  if (event.target.className == "open-modal name") {
    let name = event.target.textContent;
    getDetails(name);
    getAttributes(name);
    showModal();
  }
}

function handleBtncloseClick(event) {
  event.preventDefault();
  closeModal();
}
