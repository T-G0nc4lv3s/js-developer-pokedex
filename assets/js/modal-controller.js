let target = null;

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
function getAttributes(name) {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  return fetch(url)
    .then((response) => response)
    .then((response) => response.json())
    .then((json) => createPokemon(json))
    .then((obj) => console.log(obj));
}

function showModal() {
  state.container.classList.add("active");
}

function closeModal() {
  state.container.classList.remove("active");
}

function handleDetailLinkClick(event) {
  event.preventDefault();
  target = event.target.textContent;
  getAttributes(target);

  showModal();
}

function handleBtncloseClick(event) {
  event.preventDefault();
  closeModal();
}
