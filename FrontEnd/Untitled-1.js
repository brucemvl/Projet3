
const travaux = document.querySelector(".gallery");
let categories = [];
let articles = [];
travaux.innerHTML = "";

fetch(apiWorks)
  .then((response) => response.json())
  .then((data) => {
    articles = data;
    genererImg(articles);
})

// const categories = articles.category

function createCategories() {
  // récupère les catégorie via l'api et le ajoute dans le dom
  // category = data
  // dataset.category = category.name[i]
  // categories =
}

function genererImg(articles) {
  for (let i = 0; i < articles.length; i++) {
    const article = document.createElement("article");

    const imgArticle = document.createElement("img");
    imgArticle.src = articles[i].imageUrl;

    const nomArticle = document.createElement("p");
    nomArticle.innerText = articles[i].title;

    travaux.appendChild(article);
    article.appendChild(imgArticle);
    article.appendChild(nomArticle);
  }
}

categories.forEach((category) => {
    category.addEventListener("click", filtrage(category))
})

function filtrage(filtre) {
  const objets = articles.filter(function (projet) {
    return projet.category.name === filtre;
  });
  travaux.innerHTML = "";
  genererImg(objets);
}

// FILTRE DES OBJETS
const btnFiltreObjets = document.querySelector(".filtreobjets");
btnFiltreObjets.addEventListener("click", filtrage(articles))

function filtrage(articles){
    const objets = articles.filter(function (projet) {
      return projet.category.name === "Objets";
    });
    travaux.innerHTML = "";
    genererImg(objets);
}

// filtre appartements
const btnFiltreAppt = document.querySelector(".filtreappt");

btnFiltreAppt.addEventListener("click", function () {
  const appt = articles.filter(function (projet) {
    return projet.category.name === "Appartements";
  });
  travaux.innerHTML = "";
  genererImg(appt);
});

// filtre hotels et resturants

const btnFiltreHotel = document.querySelector(".filtrehotels");

btnFiltreHotel.addEventListener("click", function () {
  const hotels = articles.filter(function (projet) {
    return projet.category.name === "Hotels & restaurants";
  });

  travaux.innerHTML = "";
  genererImg(hotels);
});

// filtre tous

const btnFiltreTous = document.querySelector(".tous");

btnFiltreTous.addEventListener("click", function () {
  travaux.innerHTML = "";
  genererImg(articles);
});