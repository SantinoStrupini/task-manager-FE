import { useContext } from "react";
import { TaskFormComponent } from "./taskFormComponent";
import { TaskContext } from "../context/TaskContext";
import { useNavigate } from "react-router-dom";
import './AddTaskComponent.css'

export const AddTaskComponent = () => {
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();


  const handleAddTask = (task) => {
    addTask(task); 
    navigate('/');
  };

  return (
    <div>
    <div className="addTaskContainer">
        <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">Crear tarea</h2>
        <TaskFormComponent onSubmit={handleAddTask} />
    </div>
      
    </div>
  );
};