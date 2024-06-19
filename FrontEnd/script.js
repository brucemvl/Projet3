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


// PARTIE ADMINISTRATEUR

const userToken = window.localStorage.getItem("token")
console.log(userToken)

const menu = document.querySelector(".menu")
const btnLogin = document.querySelector(".btnLogin")
const btnLogout = document.querySelector(".btnLogout")
const modeEdition = document.querySelector(".modeEdition")
const modifier = document.querySelector(".modifier")

const reponse = await fetch("http://localhost:5678/api/works");
const articles = await reponse.json();

function homepageEdit(){
  if(userToken !== null){
    initAddEventListenerModale()
filtres.style.display = "none"
btnLogin.innerText = "logout"

btnLogin.addEventListener("click", ()=>{
  window.localStorage.removeItem("token")
  window.location.href = "index.html"
})

modifier.addEventListener("click", ()=>{
  afficherModale()
  })
  utilisationModale(articles)


  }
  else {
    btnLogin.innerText = "login"
    modeEdition.style.display = "none"
    modifier.style.display = "none"
    console.log("no token")
  }
}
homepageEdit()




// GESTION DE LA MODALE


function afficherModale() {
  let modale = document.querySelector(".fenetremodale")
  
  modale.classList.add("active")
}

function cacherModale() {
  let modale = document.querySelector(".fenetremodale")

  modale.classList.remove("active")
}

function initAddEventListenerModale() {
  let modale = document.querySelector(".fenetremodale")
  let fermerModale = document.getElementById("close")

  modifier.addEventListener("click", () => {
      afficherModale()
  })

  fermerModale.addEventListener("click", ()=>{
    cacherModale()
  })

  modale.addEventListener("click", (event) => {

    if (event.target === modale) {
        cacherModale()
    }
})
  
}

function partieSuppression(){
  const projetsModale = document.querySelector(".projetsmodale")
  const titreModale = document.querySelector(".title")

  titreModale.innerText = "Galerie photo"

  for(let i=0; i<articles.length; i++){

  const precedent = document.querySelector(".fa-arrow-left")
  const projet = document.createElement("article");
  const imageProjet = document.createElement("img");
  imageProjet.src = articles[i].imageUrl;
  const id = articles[i].id
  const suppression = document.createElement("i")
  suppression.classList.add("fa-solid", "fa-trash-can")

  projetsModale.appendChild(projet)
  projet.appendChild(imageProjet)
  projet.appendChild(suppression)

  suppression.addEventListener("click", ()=>{
      
      fetch("http://localhost:5678/api/works/" + id ,{
        method: "DELETE",
        headers: {"Authorization" : "Bearer " + userToken}
      })
    
    })

  precedent.style.display = "none"
}

}

function partieAjout(){
  const projetsModale = document.querySelector(".projetsmodale")
  const precedent = document.querySelector(".fa-arrow-left")
  const titreModale = document.querySelector(".title")


  projetsModale.innerHTML = ""
  titreModale.innerText = "Ajout photo"
  precedent.style.display = "block"
  precedent.addEventListener("click", partieSuppression)
}

function utilisationModale(articles){
  partieSuppression(articles)
  const btnAjoutModale = document.querySelector(".btnmodale")
  
  btnAjoutModale.addEventListener("click", partieAjout)

}





