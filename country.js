const params = new URLSearchParams(document.location.search).get("name");
// console.log(params);

const countryImg = document.querySelector(".country-detail-box-image img");
const countryName = document.querySelector(".countryname");
const nativeName = document.querySelector(".nativeName span ");
const population = document.querySelector(".Population span");
const currencies = document.querySelector(".currencies span");
const capital = document.querySelector(".capital span");
const region = document.querySelector(".region span");
const subregion = document.querySelector(".subRegion span");
const language = document.querySelector(".language span");
const domain = document.querySelector(".domain span");



let countryData = []; 

async function getCountry(params) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${params}?fullText=true`);
    const data = await res.json();
    countryData = data; 
    console.log("Fetched inside:", countryData);

  } catch (error) {
    console.error("Error fetching country:", error);
  }
}

getCountry(params);


getCountry(params).then(() => {
  if (countryData.length > 0) {
    countryImg.src = countryData[0].flags.svg;
    countryImg.alt = `Flag of ${countryData[0].name.common}`;
  }

  countryName.innerText = countryData[0].name.common
  population.innerText = countryData[0].population
  capital.innerText = countryData[0].capital[0]
  region.innerText = countryData[0].region
  subregion.innerText = countryData[0].subregion
  language.innerText = Object.values(countryData[0].languages).join(', ')
  domain.innerText =  countryData[0].tld.join(', ')
  currencies.innerText = Object.values(countryData[0].currencies).map((currency)=> currency.name).join(', ')

  if(countryData[0].name.nativeName){
   nativeName.innerText=  Object.values(countryData[0].name.nativeName)[0].common
  }
  else{
   nativeName.innerText= countryData[0].name.common
  }

});
