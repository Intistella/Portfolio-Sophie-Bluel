//********************************************** GET & FILTER PROJECTS*************************************************** */
//Générer les projets 
export async function getProjects(){
    await fetch ('http://localhost:5678/api/works')
    .then(response => response.json())
    .then((works) =>{
        displayProjects(works)
})
}
getProjects()

export function displayProjects(projects){
    // Récupération de l'élément du DOM qui accueillera les projets
    const divGallery = document.querySelector(".gallery")

    // Effacer le contenu de la div
    divGallery.innerHTML = ""

    for(let i=0; i<projects.length; i++){
    const article = projects[i]
   
    // Création d’une balise dédiée à un projet
    const projectElement = document.createElement("article")
   
    // Création des autres balises 
    const imageElement = document.createElement("img")
    imageElement.src = article.imageUrl
    
    const nameElement = document.createElement("p")
    nameElement.innerText = article.title
   
    // Rattachement des balises au DOM
    projectElement.appendChild(imageElement)
    projectElement.appendChild(nameElement)
    divGallery.appendChild(projectElement)
    }
}

const projects = await fetch ('http://localhost:5678/api/works').then(projects => projects.json())

//Créer le filtre Objets
const filterObjects = document.querySelector(".objects")
filterObjects.addEventListener("click", function(){
    const filteredElement = projects.filter(function(project){
        return project.category.name === "Objets"
    })
    document.querySelector(".gallery").innerHTML="" 
    displayProjects(filteredElement)
})

//Créer le filtre Appartements
const filterFlats = document.querySelector(".flats")
filterFlats.addEventListener("click", function(){
    const filteredElement = projects.filter(function(project){
        return project.category.name === "Appartements"
    })
    document.querySelector(".gallery").innerHTML=""
    displayProjects(filteredElement)   
})

//Créer le filtre Hôtels et restaurants
const filterHotels = document.querySelector(".hotels")
filterHotels.addEventListener("click", function(){
    const filteredElement = projects.filter(function(project){
        return project.category.name === "Hotels & restaurants"
    })
    document.querySelector(".gallery").innerHTML=""
    displayProjects(filteredElement)  
})

//Créer le filtre tous
const filterAll = document.querySelector(".all")
filterAll.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML=""
    displayProjects(projects)    
})

//**************************************LogedIn********************************************* */

const logoutLink = document.querySelector(".nav__logout")
const filterBtn = document.querySelector("div.filter")
const headerEdit = document.querySelector(".header__edit")

//Création de la fonction de connexion
function logedIn(){
    const token = localStorage.getItem("token")
    const loginLink = document.querySelector(".nav__login")
    if(token !== null){
        // Remplacement du lien Login par Loggout
        loginLink.style.display = "none"
        logoutLink.style.display = "block"
    
        // Récupération de l'élément du DOM qui accueillera la barre Edit
        const headerEditDiv = document.createElement("div")
        headerEditDiv.setAttribute("class", "header__edit__div")
        headerEdit.appendChild(headerEditDiv)
    
        // Création des balises dédiées à la barre Edit
        const editIcon = document.createElement("i")
        editIcon.classList = "fa-regular fa-pen-to-square"
        editIcon.setAttribute("id", "edit__icon")
        const editText = document.createElement("p")
        editText.setAttribute("class", "edit__text")
        editText.innerText = "Mode édition"
        headerEditDiv.appendChild(editIcon)
        headerEditDiv.appendChild(editText)   
    
        // Cacher les boutons filtres    
        filterBtn.style.display = "none"

        //Création du bouton modifier 
        const editSpan = document.querySelector(".edit__span")
        const editBtn = document.createElement("button")
        editBtn.setAttribute("class", "edit__btn")
        const editBtnIcon = document.createElement("i")
        editBtnIcon.classList = "fa-regular fa-pen-to-square"
        const editBtnText = document.createElement("p")
        editBtnText.setAttribute("class", "edit__btn__text")
        editBtnText.innerText = "modifier"
        editSpan.appendChild(editBtn)
        editBtn.appendChild(editBtnIcon)
        editBtn.appendChild(editBtnText)   
    }else{
        loginLink.style.display = "block"
        logoutLink.style.display = "none"
        filterBtn.style.display = "flex"
        headerEdit.style.display = "none"
    }
}
logedIn()

//****************************************LogOut*************************************** */ 
    
//Création de la fonction de déconnexion
export function logedOut(){
    logoutLink.addEventListener("click", function(){
        localStorage.clear()
        window.location.href = "../index.html"
        loginLink.style.display = "block"
        logoutLink.style.display = "none"
        filterBtn.style.display = "block"
        headerEdit.style.display = "none"
    })
}
logedOut()

//*****************************************Functions call************************************* */
import {openModal, openUploadForm, exitOnClick} from "./modal.js"
openModal()
openUploadForm()
exitOnClick()



