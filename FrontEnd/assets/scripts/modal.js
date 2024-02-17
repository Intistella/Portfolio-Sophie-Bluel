import{getProjects} from "./script.js"
//*************************************************** MODAL BOX **********************************************************
const projects = await fetch ('http://localhost:5678/api/works').then(projects => projects.json())
const modalBox = document.querySelector(".modal__box")
const modalImgContainer = document.querySelector(".modal__box__img__container")
const exitModals = document.querySelector(".exit__modals")

// Création de la fonction Modal
export function openModal (){
    const editSpan = document.querySelector(".edit__span")   
    editSpan.addEventListener("click", async function(event){
        event.preventDefault
    // Affichage de la modale 
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.30)"
        modalBox.style.display = "block"    
        exitModals.style.display = "block"    
    })    
    
    importProjects() 
    modalExit()
}

// Création de la fontion de fermeture de la modale
const xMark = document.querySelector(".modal__box__exit__icon")
xMark.addEventListener("click", modalExit)
function modalExit(){   
    modalBox.style.display = "none"
    document.body.style.backgroundColor = "#fff" 
    exitModals.style.display = "none"     
}

// Gestion des projets (Import et suppression))  
function importProjects(){
    document.querySelector(".modal__box__img__container").innerHTML = ""
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
            modalDeleteButton.addEventListener("click", function(event){
            event.preventDefault()
            modalImgSpan.parentNode.removeChild(modalImgSpan)
            deleteProjects(article.id)
        })
    }
}

function deleteProjects(article){        
        const token = localStorage.getItem("token")  
        fetch("http://localhost:5678/api/works/"+ article,{
            method: "DELETE",
            headers: new Headers({
                "Authorization": `Bearer ${token}`
            })
        })    
        .then(response => {
            if (response.status == 204) {
                alert("Projet supprimé avec succès")
            }else{
                alert("Projet non supprimé")
            }
            }) 
        .then(() => {
            getProjects(projects)
            modalExit()   
        }) 
        .catch (error => {
            alert(error)
        }) 
}
//******************************************************************* UPLOAD FORM************************************************ */

// Fonction pour ouvrir l'upload form
const uploadForm = document.querySelector(".upload__form")
export function openUploadForm(){
    const addProjectbtn = document.querySelector(".modal__box__add__btn")
    addProjectbtn.addEventListener("click", function(event){
        event.preventDefault()
        uploadForm.style.display = "block"   
        exitModals.style.display = "block"
    }) 
    uploadFormExit()
    previousUploadForm()
    checkForm()
    checkInput() 
    changeBtn()
}

//Fonction pour fermer l'upload form
const formXmark = document.querySelector(".upload__form__exit__icon")
formXmark.addEventListener("click", uploadFormExit)
function uploadFormExit(){
    uploadForm.style.display = "none"
    modalExit()
    exitModals.style.display = "none" 
    resetUploadForm()  
}

// Fonction pour sortir des modales avec un click sur le background
export function exitOnClick(){  
    document.addEventListener("click", function(event){
        const clickedElement = event.target
        if(clickedElement == exitModals){
            uploadFormExit()
            modalExit()
            exitModals.style.display = "none" 
            document.body.style.backgroundColor = "#fff" 
        }
    })
}

// Fonction pour revenir sur la modale box
function previousUploadForm(){
    const previousBtn = document.querySelector(".upload__form__previous__icon")
    previousBtn.addEventListener("click", function(){
        uploadForm.style.display = "none"
        resetUploadForm()
    })
}

// Reset Form   
function resetUploadForm() {
    const title = document.getElementById("title")
    const category = document.getElementById("category")
    const previewImgDiv = document.querySelector(".upload__form__box__preview") 
    elementToHide.style.display = "flex"
    previewImgDiv.style.display = "none"  
    title.value = ""
    category.value = "" 
}

// Vérification de l'input
function checkInput(){
    const upload = document.getElementById("upload")
    upload.addEventListener("input", function(event){
        event.preventDefault()
        const selectedFile = event.target.files[0]
        const allowedExtensions = [".jpg", ".jpeg",".png" ]  
        const allowedSize = 4 * 1024 * 1024
        if (selectedFile !== undefined && allowedExtensions.indexOf(selectedFile) && selectedFile.size <= allowedSize){
            changeInput(selectedFile)
            return
        }else if(selectedFile && selectedFile.size > allowedSize ){
            alert("Votre fichier est trop volumineux.") 
            return
        }else if(!selectedFile.name.includes(allowedExtensions)){
            alert("Seuls les formats JPG, JPEG et PNG sont autorisés.")
            return
        }
    })
}

// Vérification des éléments du formulaire
const uploadFormSubmitBtn = document.querySelector(".upload__form__submit__btn")
function checkForm(){
    const image = document.getElementById("upload")
    const title = document.getElementById("title")
    const category = document.getElementById("category")
    uploadFormSubmitBtn.addEventListener("click", function(event){
        event.preventDefault()    
        if(image.value !== "" && title.value !== "" && category.value !== ""){
            postProject()
        }if(image.value == ""){
            alert("Veuillez sélectionner une image")
        }else if(title.value == ""){
            alert("Veuillez saisir un titre")
        }else if(category.value == ""){
            alert("Veuillez sélectionner une catégorie")
        }
    })
}

// Foncttion pour le changement de la couleur du bouton valider
const image = document.getElementById("upload")
const title = document.getElementById("title")
const category = document.getElementById("category")
title.addEventListener("input", changeBtn)
category.addEventListener("change", changeBtn)
function changeBtn(){
    const selectedImage = image.files[0]
    const selectedTitle = title.value !==""
    const selectedCategory = category.value !==""
    if(selectedImage && selectedTitle && selectedCategory){
        uploadFormSubmitBtn.classList.add("validation__btn")
        return true
  }else{
        uploadFormSubmitBtn.setAttribute("class", "upload__form__submit__btn")
        return false
    }
}  

// Fonctions pour le changement de l'input
const elementToHide = document.querySelector(".upload__form__box") 
function changeInput(){  
    const upload = document.getElementById("upload")
    const previewImg = document.querySelector(".upload__form__preview__img")
    const previewImgDiv = document.querySelector(".upload__form__box__preview") 

    // Event listener au click de l'input file 
        upload.addEventListener("change", function() {
        const selectedFile = upload.files[0]  
        const reader = new FileReader()
        reader.addEventListener("load", () =>{
            previewImg.setAttribute("src", reader.result)
            previewImgDiv.style.display = "flex"
            elementToHide.style.display = "none"
        })
        reader.readAsDataURL(selectedFile)
        return 
    })
}     

// Fonction pour ajouter un projet
function postProject(){
    let selectedImage = document.getElementById("upload").files[0]
    changeInput(selectedImage)
    let selectedTitle = document.getElementById("title").value
    let selectedCategory = document.getElementById("category").value
    // Compilation du formulaire 
    let formData = new FormData()
    formData.append("image", selectedImage)
    formData.append("title", selectedTitle)
    formData.append("category", selectedCategory)
    const token = localStorage.getItem("token")
    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        }),
        body: formData
    })
    .then((response) =>{
        if(response.ok){
            return response.json()    
        }
        else{  
            throw new Error("Erreur de transfert")
        }
    })
    .then (() => { 
        getProjects(projects)  
        importProjects() 
        resetUploadForm()
        uploadFormExit()
        alert("Projet ajouté avec succès")
    })
    .catch ((error) => {
        console.error(error)
    })    
}


