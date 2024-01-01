//Récupération des projets de l'API
const reponse = await fetch ('http://localhost:5678/api/works')
const projects = await reponse.json()

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
       
        // Rattachement des balises au DOM
        divGallery.appendChild(projectElement)
        projectElement.appendChild(imageElement)
        projectElement.appendChild(nameElement)
}
}

document.querySelector(".gallery").innerHTML = ""
generateProjects(projects)