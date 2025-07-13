import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let tasks = [
    {id:1,
    title:'primera tarea',
    completed:false},
];

app.listen(PORT,()=>{
    console.log(`servidor corriendo en puerto ${PORT}` );
    
app.get('/api/tasks',(req,res)=>{
        res.json(tasks);
    })
})

app.post('/api/tasks',(req,res)=>{
    const {title} =req.body;

    if (!title){
        return res.status(400).json({error: 'El titulo es obligatorio'});
    }

    const newTask ={
        id: Date.now(),
        title,
        completed:false
    }

    tasks.push(newTask);

    res.status(201).json(newTask);
})

app.put('/api/tasks/:id',(req,res)=>{
    const {id} = req.params;
    const {title, completed} =req.body;

    const task = tasks.find(t =>t.id === Number(id));

    if (!task){
        return res.status(404).json({error :'tarea no encontrada'})
    }

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.json(task);

})

app.delete('/api/tasks/:id',(req,res)=>{
    const {id} =req.params;

    const taskIndex = tasks.findIndex(t =>t.id === Number(id));

    if (!taskIndex){
        return res.status(404).json({error:'tarea no encontrada'})
    }

    const deletedTask = tasks.splice(taskIndex, 1);

    res.json({message: 'Tarea eliminada', task :deletedTask[0]})

})