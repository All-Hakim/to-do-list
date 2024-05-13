import { deleteTask } from "./fetch.js";


const url = new URLSearchParams(window.location.search);
const id = url.get("id");
const nom = url.get("username");
const task={
    id:id
}
if(deleteTask(task)){
    window.location.href = './task.html?username=' + nom;
}