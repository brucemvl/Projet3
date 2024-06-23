const galerieProjets = document.querySelector(".gallery")
const filtres = document.querySelector(".filtres")
const apiUrl = "http://localhost:5678/api/works"
const apiCategories = "http://localhost:5678/api/categories"
const recup = await fetch(apiUrl)
const articles = await recup.json()

console.log(articles)
/*
fetch(apiUrl)
  .then((response) => response.json())
  .then(function (data) {
    genererImg(data);
  })
  .catch(function (error) {
    console.log(error)
  })
*/
fetch(apiCategories)
  .then((response) => response.json())
  .then(function (data) {
    generateFilters(data)
  })
  .catch(function (error) {
    console.log(error)
  })


function genererImg() {
  for (let i = 0; i < articles.length; i++) {

    const article = document.createElement("article")
    article.classList.add("arti")
    article.dataset.category = articles[i].category.name
    article.setAttribute('id', articles[i].category.id)

    const imgArticle = document.createElement("img")
    imgArticle.src = articles[i].imageUrl

    const nomArticle = document.createElement("p")
    nomArticle.innerText = articles[i].title

    galerieProjets.appendChild(article)
    article.appendChild(imgArticle)
    article.appendChild(nomArticle)
  }
}

genererImg()

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


  if(userToken !== null){
filtres.style.display = "none"
btnLogin.innerText = "logout"

btnLogin.addEventListener("click", ()=>{
  window.localStorage.removeItem("token")
  window.location.href = "index.html"
})

  }
  else {
    btnLogin.innerText = "login"
    modeEdition.style.display = "none"
    modifier.style.display = "none"
    console.log("no token")
  }




// GESTION DE LA MODALE
const modale = document.querySelector(".fenetremodale")
let fermerModale = document.getElementById("close")


const ajout = document.querySelector(".ajout")
ajout.style.display = "none"
const btnAjoutModale = document.querySelector(".btnmodale")

  


function afficherModale() {
  
  modale.style.display = "flex"
  
}

function cacherModale() {

  modale.style.display = "none"
}


  modifier.addEventListener("click", () => {
      afficherModale()
  })

  fermerModale.addEventListener("click", ()=>{
    cacherModale()
  })

modale.addEventListener("click", (e)=>{
  console.log(e.target)
  if(e.target === modale){
    cacherModale()
  }
  
})


function partieSuppression(){
  const projetsModale = document.querySelector(".projetsmodale")
  const titreModale = document.querySelector(".title")

ajout.style.display = "none"
  titreModale.innerText = "Galerie photo"

  const precedent = document.querySelector(".fa-arrow-left")

  precedent.style.display = "none"
  btnAjoutModale.innerText = "Ajouter une photo"
  btnAjoutModale.addEventListener("click", partieAjout)



  for(let i=0; i<articles.length; i++){

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

}

}

partieSuppression()

function partieAjout(){
  const projetsModale = document.querySelector(".projetsmodale")
  const precedent = document.querySelector(".fa-arrow-left")
  const titreModale = document.querySelector(".title")


  projetsModale.innerHTML = ""
  titreModale.innerText = "Ajout photo"
  precedent.style.display = "block"
  btnAjoutModale.innerText = "Valider"
projetsModale.appendChild(ajout)
ajout.style.display = "flex"
  precedent.addEventListener("click", partieSuppression)

  const champTitre = document.getElementById("title")
  const champCategorie = document.getElementById("cat")
  
  btnAjoutModale.style.opacity = "0.5"
  btnAjoutModale.disabled = true


  champTitre.addEventListener("change", ()=>{

    if (champTitre.value.length >= 1){
      console.log("yes")
      btnAjoutModale.style.opacity = "1"
      btnAjoutModale.disabled = false
      
    }
  })
  
}
