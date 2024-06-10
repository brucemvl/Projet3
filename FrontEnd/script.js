let articles = []
let categories = []
const travaux = document.querySelector(".gallery")
const apiUrl = "http://localhost:5678/api/works"

fetch(apiUrl)
  .then((response) => response.json())
  .then(function(data) {
    articles = data;
    genererImg(articles);
})
.catch(function(error){
  console.log(error)
})





function genererImg(articles){

  for(let i=0; i<articles.length; i++){

    const article = document.createElement("article")
    article.classList.add("arti")

    const imgArticle = document.createElement("img")
    imgArticle.src = articles[i].imageUrl

    const nomArticle = document.createElement("p")
    nomArticle.innerText = articles[i].title


    travaux.appendChild(article)
    article.appendChild(imgArticle)
    article.appendChild(nomArticle)
  }

}


/*for (let i=0; i=categories.length; i++){
categories = document.querySelectorAll("section ul")
categories.forEach((category)=>{
  category.addEventListener("click", filtrage(category){
category = categories[i].textContent
  })
})
}

function categoryz(articles){
  for(let i=0; i<articles.length;i++){
    return articles[i].category.name
  }
}

function filtrage(filtre) {
  let projets = articles.filter(function (projet) {
    return projet.category.name === filtre
  });
  travaux.innerHTML = "";
  genererImg(projets);
  
}

let obj = "Objets"*/




function filtrage(){
  let btnFiltre = document.querySelectorAll(".filtres li")
for(let i=0; i<btnFiltre.length; i++){
  let categ =btnFiltre[i].textContent


  

  btnFiltre[i].addEventListener("click", function(){
    const projetsFiltres = articles.filter(function(projet){
      return projet.category.name === categ
    })
    const projetsNonFiltres = articles.filter(function(projet){
      return projet.category.name !== categ
      
    })
   
    travaux.innerHTML = ""
    genererImg(projetsFiltres)

  
  
  })
}
  }

  filtrage()




  
/*

  // filtre appartements
  const btnFiltreAppt = document.querySelector(".filtreappt")

  btnFiltreAppt.addEventListener("click", function(){

    const appt = articles.filter(function(projet){

      return projet.category.name === "Appartements"

    })
    travaux.innerHTML = ""
    genererImg(appt)

  })

  // filtre hotels et resturants

  const btnFiltreHotel = document.querySelector(".filtrehotels")

  btnFiltreHotel.addEventListener("click", function(){
    const hotels = articles.filter(function(projet){
      return projet.category.name === "Hotels & restaurants"
    })

    travaux.innerHTML = ""
    genererImg(hotels)
  })*/

  //filtre tous

  const btnFiltreTous = document.querySelector(".tous")
  
  btnFiltreTous.addEventListener("click", function(){
    travaux.innerHTML = ""
    genererImg(articles)
  })