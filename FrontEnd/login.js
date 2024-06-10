let mail = document.getElementById("email")
let motDePasse = document.getElementById("password")
let mailUtilisateur = mail.value
let motDePasseUtilisateur = motDePasse.value
let valider = document.getElementById("valider")
let formulaireConnexion = document.getElementById("formulaireConnexion")

let apiLoginUrl = "http://localhost:5678/api/users/login"

/*fetch(apiLoginUrl, {
    method: "POST",
    body: `"{"${mailUtilisateur}": "${motDePasseUtilisateur}"}"`,
    headers: "accept: application.json"
})*/



    valider.addEventListener("click", (event)=>{
        
        if(mailUtilisateur.length < 1 || motDePasseUtilisateur.length < 1){
            event.preventDefault();
            console.log("vide")

        }
        else{}
    })


