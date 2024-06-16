const travaux = document.querySelector(".gallery")
const filtres = document.querySelector(".filtres")
const apiUrl = "http://localhost:5678/api/works"
const apiCategories = "http://localhost:5678/api/categories"

fetch(apiUrl)
  .then((response) => response.json())
  .then(function (data) {
    genererImg(data);
  })
  .catch(function (error) {
    console.log(error)
  })

fetch(apiCategories)
  .then((response) => response.json())
  .then(function (data) {
    generateFilters(data)
  })
  .catch(function (error) {
    console.log(error)
  })


function genererImg(articles) {
  for (let i = 0; i < articles.length; i++) {

    const article = document.createElement("article")
    article.classList.add("arti")
    article.dataset.category = articles[i].category.name
    article.setAttribute('id', articles[i].category.id)

    const imgArticle = document.createElement("img")
    imgArticle.src = articles[i].imageUrl

    const nomArticle = document.createElement("p")
    nomArticle.innerText = articles[i].title

    travaux.appendChild(article)
    article.appendChild(imgArticle)
    article.appendChild(nomArticle)
  }
}

function generateFilters(categories) {
  categories.forEach(category => {
    const menuFiltreItem = document.createElement("li")
    menuFiltreItem.innerText = category.name
    menuFiltreItem.dataset.categoryId = category.id
    menuFiltreItem.dataset.category = category.name

    filtres.appendChild(menuFiltreItem)
    filtrage(menuFiltreItem)
  })
}

function filtrage(filtre) {
    const articles = document.querySelectorAll('.arti');

    filtre.addEventListener("click", function () {
      const category = filtre.dataset.category;

      articles.forEach(article => {
        if( article.dataset.category !== category) {
          article.style.display = 'none';
          article.classList.add('fade-out')
          setTimeout(() => {
            article.style.display = "none";
            article.classList.remove("fade-out");
          }, 500);
        } else {
          article.style.display = 'block';
          setTimeout(() => {
            article.classList.remove("fade-out");
          }, 0);
        }
      });
    });
}
// filtre tout qui fait display block avec le remove fade-out sur tout les articles


// partie administrateur

const userToken = window.localStorage.getItem("token")
console.log(userToken)

const menu = document.querySelector(".menu")
const btnLogin = document.querySelector(".btnLogin")
const btnLogout = document.querySelector(".btnLogout")
const modeEdition = document.querySelector(".modeEdition")
const modifier = document.querySelector(".modifier")

function afficherModale() {
  let popupBackground = document.querySelector(".fenetremodale")
  // La popup est masquée par défaut (display:none), ajouter la classe "active"
  // va changer son display et la rendre visible. 
  popupBackground.classList.add("active")
  body.style.blur()
}

/**
* Cette fonction cache la popup pour partager son score. 
*/
function cacherModale() {
  let popupBackground = document.querySelector(".fenetremodale")

  // La popup est masquée par défaut (display:none), supprimer la classe "active"
  // va rétablir cet affichage par défaut. 
  popupBackground.classList.remove("active")
}


/**
* Cette fonction initialise les écouteurs d'événements qui concernent 
* l'affichage de la popup. 
*/
function initAddEventListenerModale() {
  let fermerModale = document.getElementById("close")

  // On écoute le click sur le bouton "partager"
  modifier.addEventListener("click", () => {
    console.log("jai lik")
      // Quand on a cliqué sur le bouton partagé, on affiche la popup
      afficherModale()
  })

  // On écoute le click sur la div "popupBackground"
  fermerModale.addEventListener("click", ()=>{
    cacherModale()
  })
}



function homepageEdit(){
  if(userToken !== null){
    initAddEventListenerModale()
filtres.style.display = "none"
btnLogin.style.display = "none"

btnLogout.addEventListener("click", ()=>{
  localStorage.clear()
  window.location.href = "index.html"
})

modifier.addEventListener("click", ()=>{
  afficherModale()
  })

  }
  else {
    btnLogout.style.display = "none"
    modeEdition.style.display = "none"
    modifier.style.display = "none"
  }
}
homepageEdit()

