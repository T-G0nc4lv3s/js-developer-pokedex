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

function showModal() {
  state.container.classList.add("active");
}

function closeModal() {
  state.container.classList.remove("active");
}

function handleBtncloseClick(event) {
  event.preventDefault();
  closeModal();
}
