const searchButton = document.querySelector('#page-home main a');
const modal = document.querySelector('#modal');
const closeButton = document.querySelector('#modal .header a');

searchButton.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeButton.addEventListener('click', () => {
  modal.classList.add('hidden');
});
