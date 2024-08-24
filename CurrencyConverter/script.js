const options = {
  method: "GET",
};

let countriesList = "";

fetchCountries = async () => {
  const countriesUrl = "https://flagcdn.com/en/codes.json";

  const response = await fetch(countriesUrl, options);
  return await response.json();
};

let countryFrom = document.getElementById("From");
let countryTo = document.getElementById("To");
let selectedFromCountry = "";
let selectedToCountry = "";

// Add Countries to the From And To:
addCountries = (countriesList) => {
  Object.entries(countriesList).forEach(([code, countryName]) => {
    option = document.createElement("option");
    option.textContent = countryName;
    countryFrom.appendChild(option);

    option = document.createElement("option");
    option.textContent = countryName;
    countryTo.appendChild(option);
  });
};

// Get Currency conversion:
convertCurrency = ()=>{
    const url =  `https://api.currencyapi.com/v3/latest?apikey=cur_live_oXE0YKImD5CUDbukTXcsNG5PajV1opN6AMQXukoG`
}

populateFlag = async (countryName, target) => {
    let countryCode = ""
  Object.entries(countriesList).forEach(([code, cName]) => {
    if(cName==countryName) countryCode=code
  });
  const flagUrl = `https://flagcdn.com/${countryCode}.svg`;
  const response = await fetch(flagUrl, options);
  document.querySelector(`.${target}-image`).src = response.url
};

countryFrom.addEventListener("change", () => {
  selectedFromCountry = countryFrom.value;
  populateFlag(selectedFromCountry, "from");
});

countryTo.addEventListener("change", () => {
  selectedToCountry = countryTo.value;
  populateFlag(selectedToCountry, "to");
});

window.onload = async () => {
  countriesList = await fetchCountries();
  addCountries(countriesList);
};
