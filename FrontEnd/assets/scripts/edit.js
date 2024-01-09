export function logedIn(){
const token = localStorage.getItem("token")
const loginLink = document.querySelector(".nav__login")

if(token !== null){
    loginLink.style.display = "none"
    loginLink.createElement("a").innerText = "Logout"
}

}