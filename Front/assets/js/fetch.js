/////////// Add user to db

    async function register_user(userData) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        };

        try {
            const response = await fetch('http://localhost:3000/user', requestOptions);
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Erreur lors de l\'inscription :', error);
        }
    }

    

/////////// Connect user 

async function connectUser(userData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    try {
        const response = await fetch('http://localhost:3000/login', requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
    }
}
////////// Add task

async function addTask(taskData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(taskData)
    };

    try {
        const response = await fetch('http://localhost:3000/task', requestOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors de l\'ajout de tâche :', error);
    }
}

///////// Add status

async function addStatus(statusData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(statusData)
    };

    try {
        const response = await fetch('http://localhost:3000/status', requestOptions);
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Erreur lors de l\'ajout de status :', error);
    }
}



async function setTask(a) {
    const requestOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(a)
    };
    
    try {
        const response = await fetch('http://localhost:3000/set', requestOptions);
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Erreur lors de l\'ajout de status :', error);
    }
}    

async function deleteTask(a){
    const requestOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(a)
    };
    
    try {
        const response = await fetch('http://localhost:3000/delete', requestOptions);
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error('Erreur lors de l\'ajout de status :', error);
    }
}

export { register_user, addTask, addStatus, connectUser,setTask,deleteTask }