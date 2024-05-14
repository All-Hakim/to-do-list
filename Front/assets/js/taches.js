import { addTask, addStatus,setTask } from "./fetch.js";

const url = new URLSearchParams(window.location.search);
const nom = url.get("username");
console.log(nom);
async function afficherFilms() {
    const body = document.querySelector("body");
    const reponse =  await fetch("http://localhost:3000/tasks?username=" + encodeURIComponent(nom));
    const films = await reponse.json();
    const taches = document.querySelector('.taches')

    films.forEach(element => {
        const card = document.createElement('div');
        card.className = "card"

        const h=document.createElement('h1');
        h.innerHTML = element.task;
        card.appendChild(h);
        const p = document.createElement('p')
        p.innerHTML = element.status;
        if(element.status == 'en cours'){
            p.style.backgroundColor = '#f77500'
        }else if (element.status == 'fait'){
            p.style.backgroundColor = '#01d601'
        }else{
            p.style.backgroundColor = '#df122d'
        }

        card.appendChild(p);
        const id = document.createElement('h6')
        id.innerHTML = element.id;
        // id.style.display = 'none'
        card.appendChild(id);
        const a=document.createElement('a');
        a.href='./supprimer.html?id='+ element.id + '&username=' + nom
        a.textContent = "Supprimer";
        card.appendChild(a);

        taches.appendChild(card)

    });
}
const page = document.getElementById('page')
function recupererID(){
    const ai = document.getElementById('ai')

    const cartes=document.querySelectorAll('.card')
    cartes.forEach(element => {
        const boton=document.createElement('button')
        boton.innerHTML='<i class="fa-solid fa-pen"></i>'
        element.appendChild(boton)
        boton.addEventListener('click',function(){
            const h6=element.querySelector('h6').innerHTML
            console.log(h6);
            page.style.display = 'block'
            ai.value = h6
            
        })
    });
}
afficherFilms();
setTimeout(recupererID,500);

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
    if(setTask(taskData,nom)){
        window.location.href= 'task.html?username=' + nom;
    }

})



