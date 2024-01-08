//Déclaration des variables
const email = document.getElementById("email")
const password = document.getElementById("password")
const loginForm = document.querySelector(".login__form")
const loginError = document.querySelector(".login__error")

loginForm.addEventListener("submit", async function(event){
    event.preventDefault()
    const loginData = {
            email : event.target.querySelector("[name = email]").value,  
            password : event.target.querySelector("[name = password]").value
        }
        console.log(loginData)
    try{
        const response = await fetch('http://localhost:5678/api/users/login',{
            method : "POST",
            Headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(loginData)
        
        }).then (response => response.json())
        if(response.ok) {
            const data = await response.json()
            window.localStorage.setItem("loginData", JSON.stringify(data))
            window.location.href = '../index.html'  
            return true
        }else{
            const loginError = document.querySelector(".loginError")
            const errorMessage = document.createElement('p')
            errorMessage.innerText = "Erreur dans l\’identifiant ou le mot de passe"
            errorMessage.style.color = "red"
            errorMessage.style.alignContent = "center"
            loginError.appendChild(errorMessage)
            setTimeout(function(){
                errorMessage.style.display = "none"
            },5000)
    }   
    }
    catch (error) {
        console.log("ça ne fonctionne pas")
    }
    })