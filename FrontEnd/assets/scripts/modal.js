//Création de la fonction pour la modale
export function Modal(){
    const editSpan = document.querySelector(".edit__span")   
    editSpan.addEventListener("click", async function(event){
        event.preventDefault

    // Affichage de la modale
        const modalBox = document.querySelector(".modal__box")
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.30)"
        modalBox.style.display = "block"

    // Création du bouton fermer
        const xMark = document.createElement("i")
        xMark.classList = "fa-solid fa-xmark"
        xMark.setAttribute("id", "modal__exit__icon")
        modalBox.appendChild(xMark)

    // Event listener pour la bouton fermer    
        xMark.addEventListener("click", function(event){
            event.preventDefault
            modalBox.style.display = "none"
            document.body.style.backgroundColor = "white"
        })

    // Création du titre de la modale
        const modalTitle = document.createElement("p")
        modalTitle.setAttribute("class", "modal__box__title")
        modalTitle.innerText = "Galerie photo"
        modalBox.appendChild(modalTitle)

    //Création de l'élément DOM pour les images de l'API
        const modalImgContainer = document.createElement("div")
        modalImgContainer.setAttribute("class", "modal__box__img__container") 
        modalBox.appendChild(modalImgContainer) 
        
    //Import des images de l'API et création du boutton supprimer   
        fetch ('http://localhost:5678/api/works')
        .then(response => response.json())
        .then((projects)=> {
            for(let i=0; i<projects.length; i++){
                const article = projects[i]

                // Création du Span contenant les éléments de la modale
                const modalImgSpan = document.createElement("span")
                modalImgSpan.setAttribute("id", article.id) 
                modalImgSpan.classList.add("modal__box__img__span")
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
                
                // Event listener pour le bouton supprimer
                modalDeleteButton.addEventListener("click", function(event) {
                    event.preventDefault()           
                    const idProject = event.target.id
                    DeleteProject(idProject)               
            
                })
            }                   
        })   
    })
    }
   
    // création de la fonction supprimer un projet
    function DeleteProject(idProject){
        const token = localStorage.getItem("token")
        fetch(`http://localhost:5678/api/works/${idProject}`,{
            method: "DELETE",
            headers: {
                Authorization: 'Bearer ${token}',
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
     .then(response => {
        if (response.status == 204) {
            console.log("Projet supprimé avec succès")
        }else{
            alert("Projet non supprimé")
        }
    })
    .catch(error => {
        console.log(error)
      })
    } 
     