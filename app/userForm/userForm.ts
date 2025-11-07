import {UserFormData} from "../models/userFormData.model";
import {UserService} from "../services/users.service"

const userService = new UserService 

function initializeForm(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    if (id) {
        userService.getById(id)
            .then(user => {
                (document.querySelector('#userName') as HTMLInputElement).value = user.userName;
                (document.querySelector('#name') as HTMLInputElement).value = user.name;
                (document.querySelector('#lastName') as HTMLInputElement).value = user.surname;
                (document.querySelector('#birthday') as HTMLInputElement).value = user.birthDate
                    ? new Date(user.birthDate).toISOString().split('T')[0]
                    : '';
            }).catch(error => {
                console.error(error.status, error.text)
            })
    }
    const button = document.querySelector("#submit")
    if (button) {
        button.addEventListener("click", submit)
    }
    
}
function showSpinner(): void {
    (document.querySelector("#loadingSpinner") as HTMLElement).style.display = "block";
}

function hideSpinner(): void {
    (document.querySelector("#loadingSpinner") as HTMLElement).style.display = "none";
}

function handleError(): void {
    hideSpinner();
    const button = document.querySelector("#submit") as HTMLButtonElement;
    button.disabled = false;

    const message = document.querySelector("#message") as HTMLElement;
    message.textContent = "Došlo je do greške. Pokušajte ponovo!";
}

function submit(): void {

    const button = document.querySelector("#submit") as HTMLButtonElement;
    const message = document.querySelector("#message") as HTMLElement;

    const userName = (document.querySelector('#userName') as HTMLInputElement).value;
    const name = (document.querySelector('#name') as HTMLInputElement).value;
    const surname = (document.querySelector('#surname') as HTMLInputElement).value;
    const date = (document.querySelector('#birthDate') as HTMLInputElement).value;
    const birthDate = new Date(date);

    if (!userName || !name || !surname || !date) {
        alert("All fields are required!");
        return;
    }

    message.textContent = "Kreiranje korisnika...";
    button.disabled = true;
    showSpinner();

    setTimeout(() => { 
        const formData: UserFormData = { userName, name, surname, birthDate };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    if (id) {
            userService.update(id, formData)
                .then(() => window.location.href = '../index.html')
                .catch(handleError);
        } else {
            userService.add(formData)
                .then(() => window.location.href = '../index.html')
                .catch(handleError);
        }
}, 2000);
}

document.addEventListener("DOMContentLoaded", initializeForm)