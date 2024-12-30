import { useParams, useNavigate } from 'react-router-dom';
import { TaskFormComponent } from './taskFormComponent';
import { useContext } from 'react';
import {TaskContext} from '../context/TaskContext';
import './AddTaskComponent.css'


export const EditTaskComponent = () => {
  const { tasks, editTask } = useContext(TaskContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const taskToEdit = tasks.find((task) => task.id === id);

  const handleEditTask = (updatedTask) => {
    editTask(id, updatedTask);
    navigate('/'); 
  };

  return (
    <div>
      <div className="addTaskContainer">
      <h2 className="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Editar tarea
        </h2>
      {taskToEdit ? (
        <TaskFormComponent onSubmit={handleEditTask} initialData={taskToEdit} isEditing />
      ) : (
        <p>Tarea no encontrada.</p>
      )}
      </div>
      
    </div>
  );
};


