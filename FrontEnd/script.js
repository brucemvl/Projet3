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
  
  let fermerModale = document.getElementById("close")

  modifier.addEventListener("click", () => {
      afficherModale()
  })

  fermerModale.addEventListener("click", ()=>{
    cacherModale()
  })
  
}

function genererImgModale(articles){
for(let i=0; i<articles.length; i++){
  const projetsModale = document.querySelector(".projetsmodale")
  const projet = document.createElement("article");
    const imageProjet = document.createElement("img");
    imageProjet.src = articles[i].imageUrl;

    const suppression = document.createElement("i")
    suppression.classList.add("fa-solid", "fa-trash-can")

    projetsModale.appendChild(projet)
    projet.appendChild(imageProjet)
    projet.appendChild(suppression)

    suppression.addEventListener("click", ()=>{
      const id = i+1
      fetch("http://localhost:5678/api/works/" + id ,{
        method: "DELETE",
        headers: {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxODU4NTE5MSwiZXhwIjoxNzE4NjcxNTkxfQ.Wk5r7vjo0QnV73uvA4jRqm7BQ7Rnmz1HMy9JDEkAv5E"}
      })
    })
    
}

}

genererImgModale(articles)



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

