const contryContainer = document.querySelector(".country-container");
const searchBox = document.querySelector(".search-box");
const Select = document.querySelector(".filter-by-region");

let allCountries = [];
let regions;

fetch(
  "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
)
  .then((response) => response.json())
  .then((data) => {
    allCountries = data;
    showCountries(allCountries);
    // getDistinctRegion(allCountries);
    console.log("R", regions);
    regions = getDistinctRegion(allCountries);

    Select.innerHTML = `<option hidden="">Filter by Region</option>`;

    regions.forEach((region) => {
      const option = document.createElement("option");
      option.value = region;
      option.textContent = region;
      Select.appendChild(option);
    });
  
    // showRegion()
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

function getDistinctRegion(countries) {
  const regions = countries.map((c) => c.region);
  return [...new Set(regions)];
  console.log("-------", regions);
}




Select.addEventListener("change", (e) => {
  // console.log(e.target.value.toLowerCase());
  const query = e.target.value.toLowerCase();

  const filteredCounrties = allCountries.filter((country) =>
    country.region.toLowerCase().includes(query)
  );
  showCountries(filteredCounrties);
});