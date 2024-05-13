
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://klndatptwxaqnzxzyfsr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsbmRhdHB0d3hhcW56eHp5ZnNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM0NjIsImV4cCI6MjAyOTY5OTQ2Mn0.aadCCItKJo0loZdLLMiTMoALOuYq1peV6RraySRwPic'
const supabase = createClient(supabaseUrl, supabaseKey)



//////////////// Add user 
async function add_user(info) {
    try {
        let { data, error } = await supabase
        .from('users')
        .insert(info)
        .select();

        return { data, error };
    } catch (error) {
        return { error: error.message };
    }
}

///////////////  Add task
async function addTask(userID,task,status) {
    try {
        let { data, error } = await supabase
        .from('todolist')
        .insert([
            {id_user: userID,task:task, status:status}
        ])

        return { data, error };
    } catch (error) {
        return { error: error.message };
    }
}

// async function addStatus(task,status,name) {
//     try {
//         // let { data, error } = await supabase
//         // .from('todolist')
//         // .insert([
//         //     {id_user: userID,status: status}
//         // ])
//         let {data:name,error:errorName} = await supabase
//         .from('users')
//         .select('id')
//         .eq('username', name)

//         const id_user= name[0].id;

//         const { data, error } = await supabase
//         .from('todolist')
//         .update({ status: status })
//         .eq('task', task)
//         .eq('id_user', id_user[0].id)
//         .select()
//         console.log(task);

//         return { data, error };
//     } catch (error) {
//         return { error: error.message };
//     }
// }


/////////////// Get username

async function getUsername(username) {
    try {
        let {data,error} = await supabase
        .from('users')
        .select('id')
        .eq('username', username)

        return {data,error};
    } catch (error) {
        return { error: error.message};
    }
}


//////// Add status
async function addStatus(taskStatus, name) {
    try {
        const { data: userData, error: nameError } = await supabase
            .from('users')
            .select('id')
            .eq('username', name);

        if (!userData || userData.length === 0) {
            return { error: 'Utilisateur non trouvé.' };
        }

        const userId = userData[0].id;

        ////////// Make sure the task exists before updating the status
        const { data: taskData, error: taskError } = await supabase
            .from('todolist')
            .select('id')
            .eq('id_user', userId);

        if (!taskData || taskData.length === 0) {
            return { error: 'Aucune tâche trouvée pour cet utilisateur.' };
        }

        ///////// Update status
        const taskId = taskData[0].id;

        const { data, error } = await supabase
            .from('todolist')
            .update({ status: taskStatus })
            .eq('id', taskId);

        return { data, error };
    } catch (error) {
        return { error: error.message };
    }
}


async function loginUser(userData) {
    try {
        // Récupérer les informations des utilisateurs correspondant aux identifiants fournis
        const { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('username', userData.username)
            .eq('password', userData.password)
            .single();

            return {data, error};
    } catch (error) {
        return {error: error.message};
    }
}


//////////// Get rows

// async function getUserTask(username) {
//     try {
//         const { data: userData, error: userError } = await supabase
//         .from('users')
//         .select('id')
//         .eq('username', username)

//         if (!userData) {
//             throw new Error('Utilisateur non trouvé');
//         }

//         const userId = userData.id;

//         const { data: userTasks, error: taskError } = await supabase
//             .from('todolist')
//             .select('task, status')
//             .eq('id_user', userId);

//         return userTasks;
//     } catch (error) {
//         return {error: error.message}
//     }
// }


async function getUserTask(username) {
    try {
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('username', username)
            .single();

        const userId = userData.id;

        const { data: userTasks, error: taskError } = await supabase
            .from('todolist')
            .select('*')
            .eq('id_user', userId);

        return userTasks;
    } catch (error) {
        return {error: error.message}
    }
}

async function updateTask(a,b,c){
    
    const { data, error } = await supabase
    .from('todolist')
    .update({ task: a, status:b  })
    .eq('id', c)
    .select()
    return data;

}
async function deleteT(a){
    
 
    const { error } = await supabase
    .from('todolist')
    .delete()
    .eq('id', a)
    return {error};


}


export {add_user, addTask, addStatus, getUsername, loginUser, getUserTask , updateTask,deleteT};
