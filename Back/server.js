import express, { urlencoded } from 'express'
import cors from 'cors'
import { add_user, addTask, addStatus, getUsername, loginUser, getUserTask, updateTask,deleteT} from './model/supabase.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}));


////////// Post 

app.post('/user', async (req, res) => {
    try {
        // const existingUser = await getUsername(req.body.username);
        // if (existingUser.data) {
        //     res.status(400).json({error: `Utilisateur existe déjà`})
        // }
        const { data, error } = await add_user(req.body);
        res.json(data)
    } catch (error) {
        res.status(500).json({error : `Erreur lors de l'ajout d'utlisateur`})
    }
});


//////////// Login

app.post('/login', async (req, res) => {
    try {
        const { data, error } = await loginUser (req.body);
        res.json(data)
    } catch (error) {
        res.status(500).json({error : `Erreur lors de la connexion`})
    }
});

//////////// Post task

app.post('/task', async (req, res) => {
    try {
        const username = req.body.name;
        const task = req.body.taskName;
        const status = req.body.status;

        const { data: users,error:errorName } = await getUsername(username);
        
        const id = users[0].id;
        const { data, error } = await addTask(id, task, status);
    
        res.status(200).json('ajout ok.');
    } catch (error) {
        console.error('Error ajout', error.message);
        res.status(500).json({ error: error.message });
    }
});


//////////// Post status
app.post('/status', async (req, res) => {
    try {
        const status = req.body.taskStatus;
        const name = req.body.name;
        
        const { data, error } = await addStatus(status,name);
    
        res.status(200).json('ajout ok.');
    } catch (error) {
        console.error('Error ajout', error.message);
        res.status(500).json({ error: error.message });
    }
});


///////////// Get Tasks

app.get('/tasks', async (req, res) => {
    const username = req.query.username;
    try {
      const tasks = await getUserTask(username);
      res.send(tasks);

    } catch (error) {
      console.error('Erreur lors de la récupération des tâches :', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
    }
  });

app.post('/set', async function(req,res){
    const id=req.body.id;
    const task=req.body.task;
    const status=req.body.status;
    try {
        const tasks = await updateTask(task,status,id);
  
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
      }
})
app.post('/delete', async function(req,res){
    const id=req.body.id;
   
    try {
        const tasks = await deleteT(id);
  
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des tâches' });
      }
})

app.listen(port, () => {
    console.log(`Hello I'm here ${port}`);
});

  