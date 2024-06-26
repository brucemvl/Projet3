let mail = document.getElementById("email")
let motDePasse = document.getElementById("password")
let msgErreurMail = document.querySelector(".emailerreur")
let msgErreurMdp = document.querySelector(".mdperreur")
let formulaire = document.getElementById("formulaireConnexion")

function erreur(msg){
    let msgErreur = document.createElement("p")
    msg.appendChild(msgErreur)
    
    msgErreur.innerText = "Erreur dans l’identifiant ou le mot de passe"
    
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
    .then( response => {
        if( response.status === 200) {
            return response.json()
        } else if( response.status === 401 ) {
          erreur(msgErreurMdp)
            
        } else if (response.status === 404 ) {
            return alert("Utilisateur introuvable")
        }
    })
    .then(data => {
        const token = data.token
        window.localStorage.setItem("token", token)
        window.location.href = 'index.html';
        console.log(token)
    })
    .catch(error => {
        console.error(error);
    });

  erreur(mail, msgErreurMail)
  msgErreurMdp.innerHTML = ""
  erreur(motDePasse, msgErreurMdp)
  validerMail(mail.value)
})
