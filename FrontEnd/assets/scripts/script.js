//********************************************** GENERATE & FILTER PROJECTS*************************************************** */

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
 import { logedOut } from "./edit.js"
    logedOut()

//*************************************************** MODAL BOX **********************************************************

const modalBox = document.querySelector(".modal__box")
const modalImgContainer = document.querySelector(".modal__box__img__container")
// Création de la fonction Modal
function modal (){
    const editSpan = document.querySelector(".edit__span")   
    editSpan.addEventListener("click", async function(event){
        event.preventDefault
    // Affichage de la modale 
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.30)"
        modalBox.style.display = "block"       
    })    
}

// Création de la fontion de fermeture de la modale
function modalExit(){
    const xMark = document.querySelector(".modal__box__exit__icon")
    // Event listener pour la bouton fermer    
        xMark.addEventListener("click", function(event){
        event.preventDefault
        modalBox.style.display = "none"
        document.body.style.backgroundColor = "#fff" 
        location.reload()
     })
}

// Gestion des projets (Import et suppression))      
for(let i=0; i<projects.length; i++){
    const article = projects[i]   
    // Création du Span contenant les éléments de la modale 
        const modalImgSpan = document.createElement("span")
        modalImgSpan.classList.add("modal__box__img__span")
        modalImgSpan.setAttribute("id", article.id) 
        modalImgContainer.appendChild(modalImgSpan)
   
    //Création des balises images  
        const modalImg = document.createElement("img")
        modalImg.setAttribute("class", "modal__box__img")
        modalImg.src = article.imageUrl
        modalImgSpan.appendChild(modalImg)     
    
    // Création du bouton supprimer
        const modalDeleteButton = document.createElement("button") 
        modalDeleteButton.setAttribute("id", article.id)
        modalDeleteButton.classList.add("modal__box__delete__btn")
        modalImgSpan.appendChild(modalDeleteButton)
        const modalDeleteIcon = document.createElement("i") 
        modalDeleteIcon.classList = "fa-solid fa-trash-can fa-2xs"
        modalDeleteIcon.setAttribute("id", "modal__box__img__delete__icon")
        modalDeleteButton.appendChild(modalDeleteIcon)

    // Event listener pour le bouton de suppression
        modalDeleteButton.addEventListener("click", function(event) {
            event.preventDefault()  
            modalImgSpan.parentNode.removeChild(modalImgSpan)
            const token = localStorage.getItem("token")  
            fetch(`http://localhost:5678/api/works/${article.id}`,{
            method: "DELETE",
            headers: new Headers({
                Authorization: `Bearer ${token}`,
                Accept: "application/json"  
        })
})
    .then(response => {
        if (response.status == 204) {
            alert("Projet " + article.id + " supprimé avec succès")
        }else{
            alert("Projet " + article.id + " non supprimé")
        }
        }) 
        .catch (error => {
            alert(error)
        }) 
    
    }) 
} 

//******************************************************************* UPLOAD FORM************************************************ */

const uploadForm = document.querySelector(".upload__form")
const uploadFormAddBtn = document.getElementById("upload__form__add__btn")
const previewImg = document.createElement('img')
const uploadFormImgIcon = document.querySelector(".upload__form__img__icon")
const uploadFormtext = document.querySelector(".upload__form__text")
const uploadFormSubmitBtn = document.querySelector(".upload__form__submit__btn")
//Ouverture du formulaure d'upload 
function uploadProjects(){
    const addProjectbtn = document.querySelector(".modal__box__add__btn")
    addProjectbtn.addEventListener("click", function(event){
        event.preventDefault()
        openUploadForm()
    })  
}

function openUploadForm(){
    uploadForm.style.display = "block"      
}

// fonction pour fermer le formulaire d'import photo
function closeUploadForm(){
    const formXmark = document.querySelector(".upload__form__exit__icon")
    formXmark.addEventListener("click", function(event){
        event.preventDefault()
        uploadForm.style.display = "none"
    })
}

// Fermeture des pop-up au click 
document.onclick = (function(event){
    if(event.target === modalBox || event.target === uploadForm){
        modalBox.style.display = "none"
        uploadForm.style.display = "none"
        document.body.style.backgroundColor = "#fff" 
 }
})

//Fonction pour revenir sur la modale box
function previousUploadForm(){
    const previousBtn = document.querySelector(".upload__form__previous__icon")
    previousBtn.addEventListener("click", function(event){
        event.preventDefault()
        uploadForm.style.display = "none"
    })
}

// Fonction pour uploader une photo
function projectPreview(){
    const previewImgDiv = document.querySelector(".upload__form__box__preview")
    const inputImg = document.getElementById("upload")
      // Event listener au click de l'input file
    inputImg.addEventListener("change", function(){
        uploadFormImgIcon.style.display = "none"
        uploadFormAddBtn.style.display = "none"
        uploadFormtext.style.display = "none"
        previewImgDiv.innerHTML = ""

        // Création du preview
        previewImg.classList.add("upload__form__preview__img")
        let upload = document.getElementById("upload").files[0]

        // Création et attribution de l'URL du fichier à l'image
        const urlArticle = URL.createObjectURL(upload)
        previewImg.src = urlArticle
        previewImgDiv.appendChild(previewImg)
    })   
}

// Fonction de validation du formulaire
function validateForm() {
    let upload = document.getElementById("upload").files[0] 
    const title = document.getElementById("title").value
    const category = document.getElementById("category").value
    console.log(upload)

    // Condition de validation du formulaire
    if(upload == undefined){
        alert("Veuillez sélectionner une image") 
    }
    if(title == ""){
        alert("Veuillez renseigner un titre")  
    }
    if(category == ""){
        alert("Veuillez sélectionner une catégorie") 
    }

    // Compilation du formulaire et envoi vers l'API
    let formData = new FormData()
    formData.append("image", upload)
    formData.append("title", title)
    formData.append("category", category)
    const token = localStorage.getItem("token")
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",  
            "content-Type" : "multipart/formData"
        },
        body: formData
    })
    .then((response) => {
        if(response.ok){
            return response.json()
        }
        else{
            throw new Error("Erreur de transfert")
        }
    })
    .then((data) => {
        closeUploadForm()
        document.querySelector(".upload__form").clear()
        previewImg.clear()
        uploadFormImgIcon.style.display = "block"
        generateProjects()
    })
    .catch((error) => {
        console.error(error)
    })
}

// Event listener pour envoyer le formulaire
uploadFormSubmitBtn.addEventListener("click", function(event){
    event.preventDefault()
    validateForm()
})

modal()
modalExit()
uploadProjects()
closeUploadForm()
previousUploadForm()
projectPreview()
 
