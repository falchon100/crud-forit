import { useEffect } from "react";
import { useState } from "react";
import TaskForm from "./TaskForm";


function App(){
  const [tasks,setTasks] =useState([]);


useEffect(()=>{
  fetch('http://localhost:3001/api/tasks')
  .then(res => res.json())
  .then(data => setTasks(data))
  .catch(err => console.error('error al obtener tareas:',err)
  )
},[]);

const addTask = (task)=>{
  setTasks((prev) => [...prev,task]);
}

const deleteTask = async (id) =>{
  try {
    await fetch(`http://localhost:3001/api/tasks/${id}`,{
      method:"DELETE",
    })
    
    setTasks((prev)=> prev.filter((task)=> task.id !== id))
  } catch (error) {
    console.error("Error al eliminar tarea",error);
  }
}

const toggleComplete = async (task) =>{
  try{
    const updatedTask = {...task , completed: !task.completed };
    const res = await fetch(`http://localhost:3001/api/tasks/${task.id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(updatedTask),
    })
    const data = await res.json();
    setTasks((prev)=>
    prev.map((t)=>(t.id=== data.id ? data : t)))
  }
  catch (error){
    console.error("Error al actualizar tarea:",error);
  }
}

return(
  <div>
    <h1>Lista de tareas</h1>
    <TaskForm onAdd={addTask}/>
   <ul>
    {tasks.map(task =>(
      <li key={task.id}>
        <span
        style={{textDecoration: task.completed ? " line-through": "none",
          cursor:"pointer"
        }}
        onClick={()=> toggleComplete(task)}>
          {task.title} {task.completed ? '✅' : '❌' }
        </span>
          <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
    🗑️
  </button>
      </li>
   ))}
   </ul>
  </div>
)}

export default App;