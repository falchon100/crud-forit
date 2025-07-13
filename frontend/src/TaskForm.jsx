import { useState } from 'react';

const TaskForm = ({ onAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await fetch("http://localhost:3001/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const newTask = await res.json();
      onAdd(newTask);
      setTitle("");
    } catch (error) {
      console.error("Error al agregar tarea:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Nueva Tarea'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type='submit'>Agregar</button>
    </form>
  );
};

export default TaskForm;
