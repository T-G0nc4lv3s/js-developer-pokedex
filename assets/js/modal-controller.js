var entity = null;

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

  return pokemon;
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
                        <li class="value">valor</li>
                        <li class="attribute">Height</li>
                        <li class="value">valor</li>
                        <li class="attribute">Weight</li>
                        <li class="value">valor</li>
                    </ul>
                </div>
                <h3>Breeding</h3>
                <div class="attributes-container">
                    <ul class="pokemon-attributes">
                        <li class="attribute">Gender</li>
                        <li class="value">valor</li>
                        <li class="attribute">Egg groups</li>
                        <li class="value">valor</li>
                        <li class="attribute">Egg cycle</li>
                        <li class="value">valor</li>
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
    getAttributes(name);
    showModal();
  }
}

function handleBtncloseClick(event) {
  event.preventDefault();
  closeModal();
}
