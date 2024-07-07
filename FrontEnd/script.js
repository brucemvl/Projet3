const galerieProjets = document.querySelector(".gallery")
const filtres = document.querySelector(".filtres")
const apiUrl = "http://localhost:5678/api/works"
const apiCategories = "http://localhost:5678/api/categories"
const recup = await fetch(apiUrl)
const articles = await recup.json()
const categoryz = await fetch(apiCategories)
const categ = await categoryz.json()
const tous = document.querySelector(".tous")


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
      const category = filtre.dataset.category
      articles.forEach(article => {
        article.classList.add("fade-out")
        if( article.dataset.category !== category) {
          article.style.display = 'none'
        }
        else {
          article.style.display = 'block'
        }
      }) 
    })

    tous.addEventListener("click", ()=>{
      articles.forEach(article =>{
      article.style.display = "block"
      article.classList.add('fade-out')
        
      })
    })
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
const overlay = document.querySelector(".overlay")
const projetsModale = document.querySelector(".projetsmodale")
const contenu = document.querySelector(".contenumodale")

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

overlay.addEventListener("click", (e)=>{
  if(e.target === overlay){
    cacherModale()
  }
  
})

// PREMIERE PAGE DE LA MODALE (SUPPRESSION DE PROJETS)
function genererImgModale(){
  const projets = document.querySelectorAll('.arti');
  const projetsModale = document.querySelector(".projetsmodale")


  for(let i=0; i<articles.length; i++){
    const projet = document.createElement("article");
    const imageProjet = document.createElement("img");
    imageProjet.src = articles[i].imageUrl
    const id = articles[i].id
    const suppression = document.createElement("i")
    suppression.classList.add("fa-solid", "fa-trash-can")

    projetsModale.appendChild(projet)
    projet.appendChild(imageProjet)
    projet.appendChild(suppression)

    function supprimer(e){
      e.preventDefault()
      projet.style.display = "none"
            projets[i].style.display = "none"

      fetch("http://localhost:5678/api/works/" + id ,{
        method: "DELETE",
        headers: {"Authorization" : "Bearer " + userToken}
      })
    }
    suppression.addEventListener("click", supprimer)

}
}
genererImgModale()


function partieSuppression(){
  const titreModale = document.querySelector(".js-title")

  ajout.style.display = "none"
  titreModale.innerText = "Galerie photo"

  const precedent = document.querySelector(".fa-arrow-left")

  precedent.style.display = "none"
  btnAjoutModale.style.display = "block"
  btnAjoutModale.innerText = "Ajouter une photo"
  btnAjoutModale.addEventListener("click", ()=>{
    contenu.classList.add("partieAjout")
    partieAjout()

  })
  btnAjoutModale.disabled = false
  btnAjoutModale.style.opacity = "1"

      }
    
partieSuppression()


// 2eme PAGE DE LA MODALE (AJOUT DE PROJETS)
function partieAjout(){
  const projetsModale = document.querySelector(".projetsmodale")
  const precedent = document.querySelector(".fa-arrow-left")
  const titreModale = document.querySelector(".js-title")
  const iconeImage = document.querySelector(".iconeimage")
  const conteneurAjout = document.querySelector(".ajoutphoto")
  const champTitre = document.getElementById("title")
  const champCategorie = document.getElementById("cat")
  const inputImg = document.getElementById("images")
  const previewImg = document.querySelector(".previewimage")
  const inputFile = document.querySelector(".inputFile")
  const tailleMax = document.querySelector(".taillemax")
  const validerAjout = document.querySelector(".btnmoda")

  projetsModale.innerHTML = ""
  projetsModale.style.border = "none"
  projetsModale.style.display = "flex"
  titreModale.innerText = "Ajout photo"
  precedent.style.display = "block"
  projetsModale.appendChild(ajout)
  ajout.style.display = "flex"
  precedent.addEventListener("click", ()=>{
    projetsModale.style.display = "grid"
    contenu.classList.remove("partieAjout")
    partieSuppression()
    projetsModale.innerHTML = ""
    genererImgModale()

    

  })
  validerAjout.style.opacity = "0.6"
  validerAjout.disabled = true
  btnAjoutModale.style.display = "none"
  
  //menu categorie dynamique
  function selectCategorie(){
for(let i=0; i< categ.length; i++){
  const options = document.createElement("option")
  options.innerText = categ[i].name
  options.id = categ[i].id
  champCategorie.appendChild(options)
}
  }
  selectCategorie()
  

  // Previsualisation de l'image 
  inputImg.addEventListener("change", (e)=>{
    previewImg.src = URL.createObjectURL(e.target.files[0])
    iconeImage.style.display = "none"
    previewImg.style.display = "flex"
    inputFile.style.display = "none"
    tailleMax.style.display = "none"
    document.querySelector(".champsformulaire").classList.add("down")
    console.log(inputImg.files[0].name)
  })
 

  
//Bouton valider fonctionnel lorsque les champs sont remplis
  champTitre.addEventListener("change", ()=>{

    if (champTitre.value.length >= 1){
      console.log("yes")
      validerAjout.style.opacity = "1"
      validerAjout.disabled = false
    }

//Ajout de l'image
const choix = document.querySelector("#cat option:checked")
  
     document.querySelector(".formulaireAjout").addEventListener("submit", (e)=>{
      e.preventDefault()
      const propertyImg = new FormData()
      propertyImg.append("title", champTitre.value,)
      propertyImg.append("category", choix.id)
      propertyImg.append("image",  inputImg.files[0])
    
      fetch(apiUrl, {
        method: "POST",
        body: propertyImg,
        headers: {"Authorization" : "Bearer " + userToken,  "Accept": "application/json"},
      })
      .then(response =>{
        if(response.status != 201){
          alert("erreur lors de l'ajout de l'image")
        }
      })   
    
  })
})
}


