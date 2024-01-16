
//Déclaration des variables
const logoutLink = document.querySelector(".nav__logout")
const filterBtn = document.querySelector("div.filter")
const headerEdit = document.querySelector(".header__edit")

//Création de la fonction de connexion
export function logedIn(){
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
    
//Création de la fonction de déconnexion
    export function LogedOut(){
        logoutLink.addEventListener("click", function(){
            localStorage.clear()
            window.location.href = "../index.html"
            loginLink.style.display = "block"
            logoutLink.style.display = "none"
            filterBtn.style.display = "block"
            headerEdit.style.display = "none"
        })
    }

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
        
    //Import des images de l'API    
        fetch ('http://localhost:5678/api/works')
        .then(response => response.json())
        .then((projects)=> {
            for(let i=0; i<projects.length; i++){
                const article = projects[i]
                const modalImg = document.createElement("img")
                modalImg.setAttribute("class", "modal__box__img")
                modalImg.src = article.imageUrl
                modalImgContainer.appendChild(modalImg)
                
            }
        })
       const modalImgIcons = document.createElement("div")
       modalImgIcons.setAttribute("class", "modal__box__img__icons")
       modalImgContainer.appendChild(modalImgIcons) 
       const modalDeleteButton = document.createElement("button")
       modalDeleteButton.setAttribute("class", article.id) 
       modalDeleteButton.classList.add("modal__box__delete__btn")
       modalImgIcons.appendChild(modalDeleteButton)
       const modalDeleteIcon = document.createElement("i")
       modalDeleteIcon.classList = "fa-solid fa-trash-can"
       modalDeleteIcon.setAttribute("id", "modal__delete__icon")
       modalImgIcons.appendChild(modalDeleteIcon)
    })
    }
   
   
