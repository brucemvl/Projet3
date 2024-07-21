const galerieProjets = document.querySelector(".gallery")
const filtres = document.querySelector(".filtres")
const API = {
  works : "http://localhost:5678/api/works",
  categories : "http://localhost:5678/api/categories"
}
const recup = await fetch(API.works)
const articles = await recup.json()
const categorys = await fetch(API.categories)
const categ = await categorys.json()
const tous = document.querySelector(".tous")

const DOM = {
  btnLogin: document.querySelector(".btnLogin"),
  btnLogout: document.querySelector(".btnLogout"),
  modeEdition: document.querySelector(".modeEdition"),
  modifier: document.querySelector(".modifier"),
  modale: document.querySelector(".fenetremodale"),
  overlay: document.querySelector(".overlay"),
  fermerModale: document.getElementById("close"),
  projetsModale: document.querySelector(".projetsmodale"),
  contenu: document.querySelector(".contenumodale"),
  ajout: document.querySelector(".ajout"),
  btnAjoutModale: document.querySelector(".btnmodale"),
  sup: document.querySelector(".sup")
}

fetch(API.categories)
  .then((response) => response.json())
  .then(function (data) {
    genererFiltres(data)
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

// GENERER LES FILTRES

function genererFiltres(categories) {
  categories.forEach(category => {
    const menuFiltreItem = document.createElement("li")
    menuFiltreItem.innerText = category.name
    menuFiltreItem.dataset.categoryId = category.id
    menuFiltreItem.dataset.category = category.name

    filtres.appendChild(menuFiltreItem)
    filtrage(menuFiltreItem)
  })

}

// FONCTION DE FILTRAGE DES PROJETS PAR CATEGORIE
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


// PARTIE ADMINISTRATEUR

const userToken = window.localStorage.getItem("token")
console.log(userToken)


  if(userToken !== null){
filtres.style.display = "none"
DOM.btnLogin.innerText = "logout"

DOM.btnLogin.addEventListener("click", ()=>{
  window.localStorage.removeItem("token")
  window.location.href = "index.html"
})

  }
  else {
    DOM.btnLogin.innerText = "login"
    DOM.modeEdition.style.display = "none"
    DOM.modifier.style.display = "none"
    console.log("no token")
  }


// GESTION DE LA MODALE

DOM.ajout.style.display = "none"

function afficherModale() {
  DOM.modale.style.display = "flex" 
}

function cacherModale() {
  DOM.modale.style.display = "none"
}

DOM.modifier.addEventListener("click", () => {
      afficherModale()
  })

DOM.fermerModale.addEventListener("click", ()=>{
    cacherModale()
  })

DOM.overlay.addEventListener("click", (e)=>{
  if(e.target === DOM.overlay){
    cacherModale()
  }
  
})

// PREMIERE PAGE DE LA MODALE (SUPPRESSION DE PROJETS)
DOM.sup.style.display = "grid"
    const projets = document.querySelectorAll('.arti');

function genererImgModale(){


  for(let i=0; i<articles.length; i++){
    const projet = document.createElement("article")
    const imageProjet = document.createElement("img")
    
    imageProjet.src = articles[i].imageUrl
    const id = articles[i].id
    const suppression = document.createElement("i")
    suppression.classList.add("fa-solid", "fa-trash-can")

    DOM.sup.appendChild(projet)
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

  DOM.ajout.style.display = "none"
  titreModale.innerText = "Galerie photo"

  const precedent = document.querySelector(".fa-arrow-left")

  precedent.style.display = "none"
  DOM.btnAjoutModale.style.display = "block"
  DOM.btnAjoutModale.innerText = "Ajouter une photo"
  DOM.btnAjoutModale.addEventListener("click", ()=>{
    DOM.sup.style.display = "none"
  DOM.contenu.classList.add("partieAjout")
    partieAjout()

  })
  DOM.btnAjoutModale.disabled = false
  DOM.btnAjoutModale.style.opacity = "1"

      }
    
partieSuppression()


// 2eme PAGE DE LA MODALE (AJOUT DE PROJETS)
function partieAjout(){
  const precedent = document.querySelector(".fa-arrow-left")
  const titreModale = document.querySelector(".js-title")
  const iconeImage = document.querySelector(".iconeimage")
  const champTitre = document.getElementById("title")
  const champCategorie = document.getElementById("cat")
  const inputImg = document.getElementById("images")
  const previewImg = document.querySelector(".previewimage")
  const inputFile = document.querySelector(".inputFile")
  const tailleMax = document.querySelector(".taillemax")
  const validerAjout = document.querySelector(".btnmoda")

  DOM.projetsModale.style.border = "none"
  titreModale.innerText = "Ajout photo"
  precedent.style.display = "block"
  DOM.projetsModale.appendChild(DOM.ajout)
  DOM.ajout.style.display = "flex"
  precedent.addEventListener("click", ()=>{
  DOM.sup.style.display = "grid"
  DOM.contenu.classList.remove("partieAjout")
    partieSuppression()
    
 
  })
  champCategorie.innerHTML = ""
  selectCategorie()

  validerAjout.style.opacity = "0.6"
  validerAjout.disabled = true
  DOM.btnAjoutModale.style.display = "none"
  
  //menu categorie dynamique
  function selectCategorie(){
for(let i=0; i< categ.length; i++){
  const options = document.createElement("option")
  options.innerText = categ[i].name
  options.id = categ[i].id
  champCategorie.appendChild(options)
}
  }
  
  
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

function ajouterProjet(e){
  e.preventDefault()
  const propertyImg = new FormData()
  propertyImg.append("title", champTitre.value,)
  propertyImg.append("category", choix.id)
  propertyImg.append("image",  inputImg.files[0])


    function ajoutProjetModale(){
      const newProjet = document.createElement("article")
      const newImg = document.createElement("img")
      newImg.src = URL.createObjectURL(inputImg.files[0])
      const suppression = document.createElement("i")
      suppression.classList.add("fa-solid", "fa-trash-can")
      
      DOM.sup.appendChild(newProjet)
      newProjet.appendChild(newImg)
      newProjet.appendChild(suppression)
    }

    function ajoutProjetGalerie(){
      const newarticle = document.createElement("article")
  const imageAjoutee = document.createElement("img")
  imageAjoutee.src = URL.createObjectURL(inputImg.files[0])
  const newtitle = document.createElement("p")
  newtitle.innerText = champTitre.value

      galerieProjets.appendChild(newarticle)
      newarticle.appendChild(imageAjoutee)
      newarticle.appendChild(newtitle)
    }

  fetch(API.works, {
    method: "POST",
    body: propertyImg,
    headers: {"Authorization" : "Bearer " + userToken,  "Accept": "application/json"},
  })
  .then(response =>{
    if(response.status != 201){
      alert("erreur lors de l'ajout de l'image")
    }
    else {
      
      ajoutProjetGalerie()
      ajoutProjetModale() 
      
    }
  })   
}
     document.querySelector(".formulaireAjout").addEventListener("submit", ajouterProjet)
})
}