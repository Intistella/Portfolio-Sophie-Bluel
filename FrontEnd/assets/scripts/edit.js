
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

   

   
