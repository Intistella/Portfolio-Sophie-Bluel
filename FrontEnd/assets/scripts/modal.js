
//*************************************************** MODAL BOX **********************************************************

const projects = await fetch ('http://localhost:5678/api/works').then(projects => projects.json())
const modalBox = document.querySelector(".modal__box")
const modalImgContainer = document.querySelector(".modal__box__img__container")

// Création de la fonction Modal
export function modal (){
    const editSpan = document.querySelector(".edit__span")   
    editSpan.addEventListener("click", async function(event){
        event.preventDefault
    // Affichage de la modale 
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.30)"
        modalBox.style.display = "block"       
    }) 
    modalExit()
    importProjects()    
}

// Création de la fontion de fermeture de la modale
export function modalExit(){
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

export function importProjects(){
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
            .catch (error => {
                alert(error)
            }) 
}
//******************************************************************* UPLOAD FORM************************************************ */

//Ouverture du formulaure d'upload 
export function uploadProjects(){
    const addProjectbtn = document.querySelector(".modal__box__add__btn")
    addProjectbtn.addEventListener("click", function(event){
        event.preventDefault()
        uploadForm.style.display = "block"   
    })  
}

// fonction pour fermer le formulaire d'import photo
export function uploadFormExit(){
    const formXmark = document.querySelector(".upload__form__exit__icon")
    formXmark.addEventListener("click", function(event){
        event.preventDefault()
        uploadForm.style.display = "none"
        modalBox.style.display = "none"
        document.body.style.backgroundColor = "#fff" 
        location.reload()
    })
}

// Fermeture des pop-up au click 
document.addEventListener("click", function(event){
    if(event.target === modalBox || event.target === uploadForm)  
    return uploadFormExit()
})

//Fonction pour revenir sur la modale box
export function previousUploadForm(){
    const previousBtn = document.querySelector(".upload__form__previous__icon")
    previousBtn.addEventListener("click", function(event){
        event.preventDefault()
        uploadForm.style.display = "none" 
   
    })
}

// Fonctions pour la création du preview
const uploadForm = document.querySelector(".upload__form")
const previewImg = document.createElement('img')
const previewImgDiv = document.querySelector(".upload__form__box__preview")

export function changeInput (){
    const inputImg = document.getElementById("upload")

    // Event listener au click de l'input file 
    inputImg.addEventListener("change", function(event) {
        const selectedFile = event.target.files[0]
        const allowedExtensions = [".jpg", ".jpeg",".png" ]  
        const allowedSize = 4 * 1024 * 1024
        if (selectedFile !== undefined && allowedExtensions.indexOf(selectedFile) && selectedFile.size <= allowedSize){
            projectPreview(selectedFile)
            return
        }else if(selectedFile.size > allowedSize){
            alert("Votre fichier est trop volumineux.") 
            return
        }else if(!selectedFile.name.includes(allowedExtensions)){
            alert("Seuls les formats JPG, JPEG et PNG sont autorisés.")
            return
        }
    })
}   
function projectPreview(){
    
      // Event listener au click de l'input file
        const elementToHide = document.querySelector(".upload__form__box")
        elementToHide.style.display = "none"
        previewImgDiv.style.display = "block"

        // Création du preview
        previewImg.classList.add("upload__form__preview__img")
        let upload = document.getElementById("upload").files[0]

        // Création et attribution de l'URL du fichier à l'image
        const urlArticle = URL.createObjectURL(upload)
        previewImg.src = urlArticle
        previewImgDiv.appendChild(previewImg)    
}

// Fonction de envoi du formulaire
let upload = document.getElementById("upload").files[0] 
let title = document.getElementById("title").value
let category = document.querySelector("select")

function submitForm(){

       // Compilation du formulaire et envoi vers l'API
       let formData = new FormData()
       formData.append("image", upload)
       formData.append("title", title)
       formData.append("category", category)
       const token = localStorage.getItem("token")
       fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: new Headers({
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "content-Type": "multipart/formData"
            }),
            body: formData
       })
       .then((response) =>{
            if(response.ok){
                return response.json()
            }else{
                throw new Error ("Erreur lors du transfert")
            }
       })
       .then ((data) => {
        uploadFormExit()
        document.querySelector(".upload__form__content").reset()
        elementToHide.style.display = "block"
        previewImgDiv.style.display = "none"
        modal(data)
        importProjects(data)
        generateProjects(data) 
        
        })
       .catch ((error) => {
        console.error(error)
       })
}
import {generateProjects} from "./script.js"

// fonction pour la validation du formulaire
let uploadFormSubmitBtn = document.querySelector(".upload__form__submit__btn")
export function validateForm(){
    uploadFormSubmitBtn.addEventListener("click",function(event){
        event.preventDefault()
            submitForm()  
    })
}
   
   
