import { useState, useEffect } from 'react';
import {TaskContext} from './TaskContext';

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('https://task-manager-be-amy0.onrender.com/api/getAll');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      } 
    };

    fetchTasks();
  }, []); 
  
  const addTask = async (task) => {
    try {
      const response = await fetch('https://task-manager-be-amy0.onrender.com/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        const newTask = await response.json();
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    } catch (error) {
      console.error('Error al añadir tarea:', error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`https://task-manager-be-amy0.onrender.com/api/edit/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
        );  
      }

    } catch (error) {
      console.error('Error al editar tarea:', error);
    }
  };

  const removeTask = async (id) => {
    try {
      const response = await fetch(`https://task-manager-be-amy0.onrender.com/api/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, editTask, removeTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}