const select = document.querySelector("#country");
const code = document.querySelector(".code");
const capital = document.querySelector(".capital");
const currency = document.querySelector(".currency");
const language = document.querySelector(".language");
const population = document.querySelector(".population");
const flag = document.querySelector(".flag");

const getAll = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  const countryNames = data.map((country) => {
    const { common } = country.name;
    return `<option class='country' value=${common}>${common}</option>`;
  });
  select.innerHTML = countryNames.join("");
  select.addEventListener("change", (e) => {
    const country = e.target.value;
    const url = `https://restcountries.com/v3.1/name/${country}`;
    const getData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      const result = data[0];
      const {
        capital: cap,
        name,
        currencies,
        flags,
        languages,
        population: pop,
        area,
      } = result;
      code.innerHTML = area;
      capital.innerHTML = cap ? cap[0] : "No capital to display";
      currency.innerHTML = Object.values(currencies)[0].name;
      const lang = Object.values(languages).map((language) => {
        return language;
      });
      language.innerHTML = lang.join(", ");
      population.innerHTML = pop;
      flag.innerHTML = `<img src=${flags.png} alt="" />`;
    };
    getData();
  });
};
getAll();
