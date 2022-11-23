const populateUFs = () => {
  const ufSelect = document.querySelector('select[name=uf]');

  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then((res) => res.json())
    .then((states) => {
      states.forEach((state) => {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      });
    })
    .catch((err) => console.log(err));
};

populateUFs();

const getCities = (event) => {
  const citiesSelect = document.querySelector('select[name=city]');
  const stateInput = document.querySelector('input[name=state]');

  const ufValue = event.target.value;

  /* const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text; */ // Solução do Maykão

  citiesSelect.innerHTML = `<option value="">Selecione a Cidade</option>`;
  citiesSelect.disabled = true;

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  )
    .then((res) => res.json())
    .then((cities) => {
      cities.forEach((city) => {
        citiesSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      });

      citiesSelect.removeAttribute('disabled');
      stateInput.value = cities[0].microrregiao.mesorregiao.UF.nome;
    })
    .catch((err) => console.log(err));
};

document.querySelector('select[name=uf]').addEventListener('change', getCities);

// Items de coleta
const selectedItemsInput = document.querySelector('input[name=items]');

let selectedItems = [];

const handleSelectedItem = (event) => {
  const itemLi = event.target.closest('li');

  // Add or remove class with javascript
  itemLi.classList.toggle('selected');

  const itemId = itemLi.dataset.id;

  /* 
  const selectedItemsHTML = document.querySelectorAll('.selected');

  selectedItems = [];
  selectedItemsHTML.forEach((item) => selectedItems.push(item.dataset.id));
  console.log(selectedItems);
  */ // Minha solução

  // Verifica se existem itens selecinados, se sim
  // Pegar os mitens selecionados
  const alreadySelected = selectedItems.findIndex((item) => item == itemId);

  // Se já estiver selecionado, tirar da seleção
  if (alreadySelected >= 0) {
    // Tirar da seleção
    const filteredItems = selectedItems.filter((item) => item != itemId);

    selectedItems = filteredItems;
  } else {
    // Se não estiver selecionado
    // Adiionar a seleção
    selectedItems.push(itemId);
  }

  // Atualizar o campo escondido com os itens selecionados
  selectedItemsInput.value = selectedItems;
};

const itemsToCollect = document.querySelectorAll('.items-grid li');

for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem);
}
