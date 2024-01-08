//Déclaration des variables
const emailError = document.querySelector(".emailerror")
const passwordError = document.querySelector(".passworderror")
const loginForm = document.querySelector(".login__form")


loginForm.addEventListener("submit", function(event){
    event.preventDefault()
    const loginData = {
            email : event.target.querySelector("[name = email]").value,  
            password : event.target.querySelector("[name = password]").value
        }
        console.log(loginData)
    try{
        const response = fetch('http://localhost:5678/api/users/login',{
            method : "POST",
            Headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(loginData)
        })
        if (response.ok){
            const data = response.json()
            sessionStorage.setItem('accessToken', data.token)
            window.location.href = './index.html'
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
    }catch (errorMessage) {
        console.log(errorMessage)
    }         
    })

