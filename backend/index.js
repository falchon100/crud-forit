import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let task = [
    {id:1,title:'primera tarea',completed:false},
];

app.get('/api/task',(req,res)=>{
    res.json(task);
})

app.listen(PORT,()=>{
    console.log(`servidor corriendo en puerto ${PORT}` );
    
})

app.post('/api/task',(req,res)=>{
    
})