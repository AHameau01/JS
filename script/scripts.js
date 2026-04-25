/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}


function afficherPropostion(Mots){
    let dives = document.querySelector(".zoneProposition")
    dives.innerText = Mots
}

function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}


function verifierNom(nombalise){
    if(nombalise.length < 2){
        throw new Error("le nom est trop court")
    }
}

function verifierEmail(emailbalise){
    let emailregEx = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if(!emailregEx.test(emailbalise)){
        throw new Error("Email non valide")
    }    
}

function gererFormulaire(score){
    try{
    let nom = document.getElementById("nom")
    let email = document.getElementById("email")
    let nomval = nom.value
    let emailval = email.value
    if(verifierNom(nomval) && verifierEmail(emailval)){
        let scoremail = `${score} / ${i}`
        afficherEmail(nomval,emailval,scoremail)
    }
    }
}
/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    initAddEventListenerPopup()
    // Initialisations
    let score = 0
    let i =0
    let listeproposition = listeMots

    afficherPropostion(listeproposition[i])
    let texteEcriture = document.getElementById("inputEcriture")
    let boutonValide= document.getElementById("btnValiderMot")
    boutonValide.addEventListener("click",() =>{
        console.log(texteEcriture.value)
        if(texteEcriture.value === listeproposition[i]){
            score++
        }
        i++
        afficherResultat(score,i)
        if(listeproposition[i] == undefined){
        afficherPropostion("jeu fini")
        boutonValide.disabled=true
        } else{
              afficherPropostion(listeproposition[i])
        }
        texteEcriture.value = ""
    })

    let changer = document.querySelectorAll(".optionSource input")
    for(let i1 =0 ;i1 < changer.length;i1++){
        changer[i1].addEventListener("change",(event) =>{
            console.log(event.target.value)
            if(event.target.value === "2"){
                listeproposition=listePhrases
            }
            else{
                listeproposition=listeMots
            }
            afficherPropostion(listeproposition[i])
        })
    }

    let formulaire = document.querySelector("form")
    formulaire.addEventListener("submit",(event) =>{
        event.preventDefault()
        let scoremail = `${score} / ${i}`
        gererFormulaire(scoremail)
    })



    afficherResultat(score, i)
}