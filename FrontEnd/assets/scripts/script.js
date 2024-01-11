//Récupération des projets de l'API
const projects = await fetch ('http://localhost:5678/api/works').then(projects => projects.json())

//Générer les projets 
function generateProjects (projects){
    for(let i=0; i<projects.length; i++){
        const article = projects[i]
        
        // Récupération de l'élément du DOM qui accueillera les projets
        const divGallery = document.querySelector(".gallery")
       
        // Création d’une balise dédiée à un projet
        const projectElement = document.createElement("article")
       
        // Création des autres balises 
        const imageElement = document.createElement("img")
        imageElement.src = article.imageUrl
        const nameElement = document.createElement("p")
        nameElement.innerText = article.title
       
        // Rattachement des balises au DOM0
        divGallery.appendChild(projectElement)
        projectElement.appendChild(imageElement)
        projectElement.appendChild(nameElement)
}
}

// Suppression des éléments HTML
document.querySelector(".gallery").innerHTML = ""

// Appel de la fonction qui génère les projets à partir de l'API
generateProjects(projects)

//Créer le filtre Objets
const filterObjects = document.querySelector(".objects")
filterObjects.addEventListener("click", function(){
    const filteredElement = projects.filter(function(project){
        return project.category.name === "Objets"
    })
    document.querySelector(".gallery").innerHTML=""
    generateProjects(filteredElement)    
})

//Créer le filtre Appartements
const filterFlats = document.querySelector(".flats")
filterFlats.addEventListener("click", function(){
    const filteredElement = projects.filter(function(project){
        return project.category.name === "Appartements"
    })
    document.querySelector(".gallery").innerHTML=""
    generateProjects(filteredElement)    
})

//Créer le filtre Hôtels et restaurants
const filterHotels = document.querySelector(".hotels")
filterHotels.addEventListener("click", function(){
    const filteredElement = projects.filter(function(project){
        return project.category.name === "Hotels & restaurants"
    })
    document.querySelector(".gallery").innerHTML=""
    generateProjects(filteredElement)    
})

//Créer le filtre tous
const filterAll = document.querySelector(".all")
filterAll.addEventListener("click", function(){
    document.querySelector(".gallery").innerHTML=""
    generateProjects(projects)    
})

 //Import de fonction logedIn 
import { logedIn } from "./edit.js"
    logedIn()

 //Import de fonction logedOut 
 import { LogedOut } from "./edit.js"
    LogedOut()


