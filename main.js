/* Exercice 
 * ● Modifiez l'aspect du champ qui est en erreur
 * ● Affichez le message d'erreur à côté du champ
 */

// 1) Créer une réfèrence envers l'élément form 
const MYFORM = document.getElementById('form');
// 2) Ajouter un eventListener pour l'événement "submit"
MYFORM.addEventListener('submit', test);

// 3) Création class Eleve
class Eleve {
    constructor (formData) {
    this.nom = formData.nom;
    this.prenom = formData.prenom;
    this.date_naissance = formData.date_naissance;
    this.email = formData.email;
    }
}
// 4) Création fonctions de validation avec REGEX
// fonction qui contrôle la longueur d'un string
function validateStringLength(str) {
    const re = /^[a-zA-Z]{2,10}$/
    return re.test(str);
}
// fonction qui contrôle si email est valide
function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
    return re.test(String(email).toLowerCase());
}
function validateDate(date) {
    const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/; // possible 22/05/2020 5/5/2020
    return re.test(String(date));
}

// 5) Création des fonctions affichage erreur
// affichage bordure coloré
function affichageClassColor (id, class_name) {
    const SELECT = document.querySelector(id);
    SELECT.className = class_name;
}
// affichage message d'erreur
function affichageMessageError (id, idError, class_name, text) {
    //RAZ du message d'erreur
    const MESSAGE = document.querySelector(idError);

    if(MESSAGE != null) {
        MESSAGE.remove();
    }
    
    const PARENT = document.querySelector(id);
    const TEXTELEMENT = document.createElement("p");    
    TEXTELEMENT.className = class_name;
    TEXTELEMENT.textContent = text; 
    PARENT.appendChild(TEXTELEMENT);
}
//delete bordure coloré
function deleteClassColor (id) {
    const SELECT = document.querySelector(id);
    SELECT.className = "";
}

//supprimer element
function deleteMessageError (id) {
    const SELECT = document.querySelector(id);
    if(SELECT != null) {
        SELECT.remove();
    }
    
}

const ELEVES = [];
// 6) Création fonction 'test' pour l'événement 'submit'
function test (event) {
    // a) empêcher à envoyer action (ne va pas rafraichir la page)
    event.preventDefault();

    //b) Récupération des valeurs (value)
    const FORMLABELS = ["nom", "prenom", "date_naissance", "email"];
    const FORMDATA = {};
    const FORMELEMENTS = event.target.elements; //va stocker les éléments de l'objet ciblé par le submit event (input, input, input, input, button)
    //on boucle sur le nombre des éléments (ici -1 parce qu'on veut uniquement les inputs)
    for(let i = 0; i < FORMELEMENTS.length - 1; i++) {
        //remplir l'objet FORMDATA (comme un tableau associatif)
        FORMDATA[FORMLABELS[i]] = FORMELEMENTS[i].value;
    }

    // déclaration d'une variable qui stocke le résultat de la valdiation
    let error = false;
    // c) Contrôle des valeurs (REGEX)
    if (!validateStringLength(FORMDATA.nom)) {
        // a) quand il y a une erreur => error devient true
        error = true;
        // b) bordure rouge
        affichageClassColor("#nom", "red");
        // c) ajoute message d'erreur
        affichageMessageError(".box1", ".box1 p", "alert", "Your name must be between 2 and 10 characters");               
    } else {
        deleteMessageError(".box1 p");
        deleteClassColor("#nom");
    }

    if (!validateStringLength(FORMDATA.prenom)) {
        // a) quand il y a une erreur => error devient true
        error = true;
        // b) bordure rouge
        affichageClassColor("#prenom", "red");
        // c) ajoute message d'erreur
        affichageMessageError(".box2", ".box2 p", "alert", "Your first name must be between 2 and 10 characters");      
    } else {
        deleteMessageError(".box2 p");
        deleteClassColor("#prenom");
    }

    if (!validateDate(FORMDATA.date_naissance)) {
        // a) quand il y a une erreur => error devient true
        error = true;
        // b) bordure rouge
        affichageClassColor("#naissance", "red");
        // c) ajoute message d'erreur
        affichageMessageError(".box3", ".box3 p", "alert", "The date must be entered DD / MM / YYYY");                 
    } else {
        deleteMessageError(".box3 p");
        deleteClassColor("#naissance");        
    }

    if (!validateEmail(FORMDATA.email)) {
        // a) quand il y a une erreur => error devient true
        error = true;
        // b) bordure rouge
        affichageClassColor("#email", "red");
        // c) ajoute message d'erreur
        affichageMessageError(".box4", ".box4 p", "alert", "Invalid email address");              
    } else {
        deleteMessageError(".box4 p");
        deleteClassColor("#email");
    }
    
    // check si tous les inputs sont corrects
    if(!error) {
        // d) Création d'un tableau élèves pour stocker les éléves
        ELEVES.push(new Eleve(FORMDATA));      
        // e) ajouter les informations dans le "table"
        // création d'un élément tr
        const TR = document.createElement('tr');
        //boucler sur les clés dans l'objet FORMDATA pour pouvoir récupérer les valeurs rentrée par l'utilisateur
        for (let key in FORMDATA) {
            //création des td
            const TD = document.createElement('td');
            //ajouter les values en forme texte
            TD.textContent = FORMDATA[key];
            //ajouter les td dans les tr
            TR.appendChild(TD);
        }
        
        //finalement ajouter le Tr dans l'élément avec ID liste (dans tbody)
        const ELT = document.querySelector('tbody');
        ELT.appendChild(TR);
    }
 }

