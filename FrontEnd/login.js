let mail = document.getElementById("email")
let motDePasse = document.getElementById("password")
let msgErreurMail = document.querySelector(".emailerreur")
let msgErreurMdp = document.querySelector(".mdperreur")


let formulaire = document.getElementById("formulaireConnexion")



function erreur(champ, msg){
    if(champ.value.length < 1){
    let msgErreur = document.createElement("p")
    msg.appendChild(msgErreur)
    
    msgErreur.innerText = "Veuillez remplir ce champ"
    }
}

function validerMail(adressemail) {
    let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    let resultat = regex.test(adressemail)
    
    if (resultat === true){
    return true}
    else {
        msgErreurMail.innerHTML = "email non valide"
    }
    }



formulaire.addEventListener("submit", function(event){
    
    event.preventDefault()
    let utilisateur = {
        email : mail.value,
        password : motDePasse.value
    }
    const chargeUtile = JSON.stringify(utilisateur)

    let apiLoginUrl = "http://localhost:5678/api/users/login"

    fetch(apiLoginUrl , {
        method: "POST",
        body: chargeUtile,
       headers: {"Content-Type":"application/json"}
    })
    /*.then(function(response) {
        if (response.status === 401){
            console.log("erreeeeeur")
        }
        else {
            (response => response.json())
        }
    })*/
   
    
    .then((response)=> response.json())
    .then(data => console.log(data))

    
  erreur(mail, msgErreurMail)
  msgErreurMdp.innerHTML = ""
  erreur(motDePasse, msgErreurMdp)

  validerMail(mail.value)
   

})
