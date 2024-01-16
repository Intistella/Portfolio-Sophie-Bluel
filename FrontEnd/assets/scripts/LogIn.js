import { LogedOut } from "./edit.js"
    LogedOut()

//Déclaration des variables
const loginForm = document.querySelector(".login__form")

loginForm.addEventListener("submit", async function(event){
    event.preventDefault()
    event.stopImmediatePropagation

    const email = event.target.querySelector("[name = email]").value
    const password = event.target.querySelector("[name = password]").value
    
        console.log(email,password)
    try{
        const response = await fetch("http://localhost:5678/api/users/login",{
            method : "POST",
            headers : {"content-type" : "application/json",
                        "Access-Control-Allow-Origin" : "*",},
            body : JSON.stringify({email,password})
        
        }).then((response) =>{
            if (!response.ok) {
                throw new Error("Erreur")
            }
            return response.json()
        })
        .then((data) => {
            if (data.token){
                window.localStorage.setItem("token", data.token)
                window.location.href = '../index.html'
            }
        })
    }
    catch (error) {
        console.log("ça ne fonctionne pas")
        const loginError = document.querySelector(".login__error")
        loginError.innerText = "Erreur dans l\’identifiant ou le mot de passe"
        loginError.style.color = "red"
        loginError.style.backgroundColor = "#DCEDFF"
        loginError.style.padding = "10px"
    }
})
