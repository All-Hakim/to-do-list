import { addTask, addStatus,setTask } from "./fetch.js";

const url = new URLSearchParams(window.location.search);
const nom = url.get("username");
console.log(nom);
async function afficherFilms() {
    const body = document.querySelector("body");
    const reponse =  await fetch("http://localhost:3000/tasks?username=" + encodeURIComponent(nom));
    const films = await reponse.json();
    console.log(films);
    films.forEach(element => {
        const card = document.createElement('div');
        card.className = "card"

        const h=document.createElement('h1');
        h.innerHTML = element.task;
        card.appendChild(h);
        const p = document.createElement('p')
        p.innerHTML = element.status;
        card.appendChild(p);
        const id = document.createElement('h6')
        id.innerHTML = element.id;
        // id.style.display = 'none'
        card.appendChild(id);
        const a=document.createElement('a');
        a.href='./supprimer.html?id='+ element.id + '&username=' + nom
        a.textContent = "Supprimer";
        card.appendChild(a);

        body.appendChild(card)

    });
}
function recupererID(){
    const modif = document.getElementById('modif')
    const ai = document.getElementById('ai')

    const cartes=document.querySelectorAll('.card')
    cartes.forEach(element => {
        element.addEventListener('click',function(){
            const h6=element.querySelector('h6').innerHTML
            console.log(h6);
            modif.style.display = 'block'
            ai.value = h6
            
        })
    });
}
afficherFilms();
setTimeout(recupererID,5000);

const newForm = document.getElementById('new');
newForm.addEventListener('submit',async function(e){
    e.preventDefault()

    const taskupdate= document.querySelector("#newTask").value;
    var ia = document.getElementById('ai').value;
    var status = document.querySelector("#newStatus").value;
    const taskData = {
        id:ia,
        task:taskupdate ,
        status: status,
    }
    console.log(taskData);
    const response = await setTask(taskData);
})


