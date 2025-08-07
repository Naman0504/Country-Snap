const contryContainer = document.querySelector(".country-container");


fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    data.map((country) => {
      const countyCard = document.createElement("a");
      countyCard.classList.add("country");

      countyCard.innerHTML = `
        
            <img class="country-image" src=${country.flags.svg} alt="" />
        
          <div class="country-details">
            <h3 class="country-title">${country.name.common}</h3>
            <p><b>Population :</b>${country.population}</p>
            <p><b>Region :</b>${country.region}</p>
            <p><b>Capital :</b>${country.capital}</p>
          </div>
        `;

      contryContainer.append(countyCard);
    });
  })
  .catch((error) => console.log("Error:", error));
