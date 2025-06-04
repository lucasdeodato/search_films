const listFilms = document.getElementById("list-films");
const load = document.getElementById("load");
let searchFilms = "abcdefghijklmnopqrstuvwxyz".split("");
window.onload = async (e) => {
  const data = await fetch(
    `https://imdb.iamidiotareyoutoo.com/justwatch?q=${
      searchFilms[Math.floor(Math.random() * 26)]
    }&L=pt_BR`
  );
  const films = await data.json();
  showFilms(films.description);
  loadingAll();
};

function showFilms(films) {
  window.scroll(0,0)
  listFilms.innerHTML = "";
    try {
    films.forEach((film) => {
      const article = document.createElement("article");
      article.classList.add("film");
      if (film.offers.length != 0) {
        article.innerHTML = `
        <div class="img-film">
          <img src='${film.photo_url[0]}' alt='${film.title}'>
        </div>
        <div class="desc-film">
          <div>
            <h2>${film.title}</h2>
            <div class="desc">
              <p class="year">
                Ano: <span>${film.year}</span>
              </p>
              <p class="runtime">
                Tempo: <span>${film.runtime}min</span>
              </p>
            </div>
          </div>
          <div class="see">
            <p class="plataform">
              ${film.offers[0].name}
            </p>
            <a href="${film.offers[0].url}" target="_blank">
              <i class="fas fa-play"></i>
              Assistir
            </a>
          </div>
        </div>
      `;
      } else {
        article.innerHTML = `
        <div class="img-film">
          <img src='${film.photo_url[0]}' alt='${film.title}'>
        </div>
        <div class="desc-film">
          <div>
            <h2>${film.title}</h2>
            <div class="desc">
              <p class="year">
                Ano: <span>${film.year}</span>
              </p>
              <p class="runtime">
                Tempo: <span>${film.runtime}min</span>
              </p>
            </div>
          </div>
          <div class="see">
            <p class="plataform">
              Sem plataforma
            </p>
            <a href="" style="pointer-events: none; background-color: #999;">
              <i class="fas fa-play"></i>
              Assistir
            </a>
          </div>
        </div>
      `;
      }
      listFilms.appendChild(article);
    });
  } catch (err) {
    console.error(err);
  }
}

function loadingAll() {
  load.classList.toggle("active");
}

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchResult = document.getElementById("search-result");
const searchLoad = document.getElementById("search-load");
const search = document.getElementById("search-films");
const searchCloseBtn = document.getElementById("search-close-btn");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  loadingSearch();
  if(searchInput.value.trim() == ""){
    alert("Preencha o campo solicitado")
    searchLoad.classList.remove("active")
    return
  }
  const data = await fetch(
    `https://imdb.iamidiotareyoutoo.com/justwatch?q=${searchInput.value}&L=pt_BR`
  );
  const films = await data.json();
  if(films.description.length == 0){
    loadingSearch();
    toggleSearch();
    listFilms.innerHTML = "<h4>Nenhum filme encontrado!</h4>"
    searchInput.value = "";
    return
  }
  showFilms(films.description);
  loadingSearch();
  toggleSearch();
  searchInput.value = "";
  document.querySelector("h1").textContent = "Resultado:";
});

function toggleSearch() {
  search.classList.toggle("active");
}

function loadingSearch() {
  searchLoad.classList.toggle("active");
}

searchBtn.addEventListener("click", toggleSearch);
searchCloseBtn.addEventListener("click", toggleSearch);
