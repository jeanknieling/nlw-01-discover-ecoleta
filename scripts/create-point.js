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

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  )
    .then((res) => res.json())
    .then((cities) => {
      cities.forEach((city) => {
        citiesSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
      });

      citiesSelect.removeAttribute('disabled');
      stateInput.value = cities[0].microrregiao.mesorregiao.UF.nome;
    })
    .catch((err) => console.log(err));
};

document.querySelector('select[name=uf]').addEventListener('change', getCities);
