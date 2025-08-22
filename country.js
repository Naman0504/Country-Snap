const params = new URLSearchParams(document.location.search).get("name");
// console.log(params);

const countryImg = document.querySelector(".country-detail-box-image img");
const countryName = document.querySelector(".countryname");


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

});
