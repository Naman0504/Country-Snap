const contryContainer = document.querySelector(".country-container");
const searchBox = document.querySelector(".search-box");

let allCountries = [];

fetch(
  "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
)
  .then((response) => response.json())
  .then((data) => {
    allCountries = data;
    showCountries(allCountries);
    console.log(data);
  })
  .catch((error) => console.log("Error:", error));

function showCountries(countries) {
  contryContainer.innerHTML = "";
  countries.map((country) => {
    const countyCard = document.createElement("a");
    countyCard.classList.add("country");
    countyCard.href = `/country.html?name=${country.name.common}`;

    const population = country.population
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    countyCard.innerHTML = `
        
            <img class="country-image" src=${country.flags.svg} alt="" />
        
          <div class="country-details">
            <h3 class="country-title">${country.name.common}</h3>
            <p><b>Population :</b>${population}</p>
            <p><b>Region :</b>${country.region}</p>
            <p><b>Capital :</b>${country.capital}</p>
          </div>
        `;

    contryContainer.append(countyCard);
  });
}

searchBox.addEventListener("input", (e) => {
  // console.log(e.target.value.toLowerCase());
  const query = e.target.value.toLowerCase();

  const filteredCounrties = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(query ? query : "")
  );
  // return e.target.value;
  showCountries(filteredCounrties);
});
