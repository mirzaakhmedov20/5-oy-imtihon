import { initializeDarkMode } from "./function.js";

// const
const cards = document.querySelector(".cards");
const newCards = document.querySelector(".newCards");
const input = document.querySelector("#search");
const searchIcon = document.querySelector(".searchImg");
const select = document.querySelector("#select");
const countryPage = document.getElementById("country-page");
const bigFlag = document.getElementById("big-flag");
const cn = document.getElementById("cn");
const col1Span = document.getElementsByClassName("col-1-span");
const col2Span = document.getElementsByClassName("col-2-span");
const borderCountries = document.getElementById("border-countries");
const borders = document.getElementsByClassName("border");

initializeDarkMode();

const BASE_URL = "https://frontend-mentor-apis-6efy.onrender.com";

function createCard(country) {
  return `
  <div class="card"><img src="${country.flags.svg}" alt="">
  <div class="text">
      <h3 data-id="${country.name.slug}">${country.name.common}</h3>
      <p>Population: <span>${country.population.toLocaleString(('en-uz'))}</span></p>
      <p>Region: <span>${country.region[0]}</span></p>
      <p>Capital: <span>${country.capital[0]}</span></p>
  </div>
</div>
    `;
}
function fetchData(url,successCallback) {
    fetch(url)
    .then(response =>{
        if (!response.ok){
            throw new Error(`${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        successCallback(data);
    })
    .catch(err => {
        console.error(err);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    fetchData('https://frontend-mentor-apis-6efy.onrender.com/countries', data =>{
        if (Array.isArray(data.data)) {
           data.data.forEach(country => {
            let cardHtml = createCard(country);
            let parser = new DOMParser();
            let doc = parser.parseFromString(cardHtml, 'text/html');
            let card = doc.body.firstChild;
            cards.appendChild(card);
            newCards.style.display = 'none';
            if (card instanceof HTMLElement) {
                card.addEventListener('click', () => handleCardClick(card));
            }else{
                console.error(card);            }
           }); 
        }else {
            console.error( data);
        }
        function displayCountry(country) {
            // bosilgan davlatni chiqarish
            home.style.overflowY = "hidden";
            home.style.display = "none";
            countryPage.style.transform = "translateX(0)";
            countryPage.scrollTop = 0;
    
            let currencyString = "";
            country.currencies.forEach((currency) => {
              currencyString += currency.name + ", ";
            });
            currencyString = currencyString.substr(0, currencyString.length - 2);
            let languageString = "";
            country.languages.forEach((language) => {
              languageString += language.name + ", ";
            });
            languageString = languageString.substr(0, languageString.length - 2);
    
            // parametrlarni o'rnatish
            bigFlag.src = country.flag;
            cn.innerText = country.name;
            col1Span[0].innerHTML = `<b>Native Name: </b>${country.nativeName}`;
            col1Span[1].innerHTML = `<b>Population: </b>${country.population}`;
            col1Span[2].innerHTML = `<b>Region: </b>${country.region}`;
            col1Span[3].innerHTML = `<b>Sub Region: </b>${country.subregion}`;
            col1Span[4].innerHTML = `<b>Capital: </b>${country.capital}`;
    
            col2Span[0].innerHTML = `<b>Top Level Domain: </b>${country.topLevelDomain}`;
            col2Span[1].innerHTML = `<b>Currencies: </b>${currencyString}`;
            col2Span[2].innerHTML = `<b>Languages: </b>${languageString}`;
    
            // chegaradosh davlatlarni o'rnatish
            let borderCountriesString = [];
            if (country.borders) {
              country.borders.forEach((border) => {
                borderCountriesString.push(
                  countries.find((item) => item.alpha3Code === border).name
                );
              });
            }
            let border = "";
            borderCountriesString.forEach(
              (item) => (border += `<span class="border">${item}</span>`)
            );
            borderCountries.innerHTML = `<b style="min-width: 15ch">Border Countries: </b><div>${border}</div>`;
            for (let j = 0; j < borders.length; j++) {
              borders[j].addEventListener("click", () => {
                let country = countries.find((e) => e.name == borders[j].innerText);
                displayCountry(country);
              });
            }
          }
    })
})