



export function logedIn(){
const token = localStorage.getItem("token")
const loginLink = document.querySelector(".nav__login")
if(token !== null){
// Remplacement du lien Login par Loggout
    loginLink.style.display = "none"
    const logoutLink = document.querySelector(".nav__logout")
    logoutLink.style.display = "block"

// Récupération de l'élément du DOM qui accueillera la barre Edit
    const headerEdit = document.querySelector(".header__edit")
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
    const filterBtn = document.querySelector(".filter")     
    filterBtn.style.display = "none"

//Création du bouton modifier 
    const editBtn = document.querySelector(".edit__btn")
    const editBtnIcon = document.createElement("i")
    editBtnIcon.classList = "fa-regular fa-pen-to-square"
    const editBtnText = document.createElement("p")
    editBtnText.setAttribute("class", "edit__btn__text")
    editBtnText.innerText = "modifier"
    editBtn.appendChild(editBtnIcon)
    editBtn.appendChild(editBtnText)
}else{
    loginLink.style.display = "block"
    logoutLink.style.display = "none"
    filterBtn.style.display = "block"
    headerEdit.style.display = "none"
}
}

export function LogedOut(){
    const logoutLink = document.querySelector(".nav__logout")
    logoutLink.addEventListener("click", function(){
        localStorage.removeItem("token")
        window.location.href = "../index.html"
        loginLink.style.display = "block"
        logoutLink.style.display = "none"
        filterBtn.style.display = "block"
        headerEdit.style.display = "none"
    })
}



