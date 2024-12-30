import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskContext } from '../context/TaskContext';
import './TaskComponent.css';
import './AddTaskComponent.css';

export const TaskComponent = () => {
  const { tasks, removeTask, editTask } = useContext(TaskContext);

  const [filter, setFilter] = useState('all');

  const toggleTaskState = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      editTask(id, { ...task, state: !task.state });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.state;
    if (filter === 'incomplete') return !task.state;
    return true;
  });

  return (
    <>
      <div className="taskContainer">
        <div className="listContainer">
          <h2 className="text-2xl font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight mb-6">Lista de tareas</h2>
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            <Link to="/add">Añadir Tarea</Link>
          </button>
        </div>
        
        <div className="filter-buttons mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 text-sm font-semibold ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}>
            Todas
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-2 text-sm font-semibold ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}>
            Completadas
          </button>
          <button
            onClick={() => setFilter('incomplete')}
            className={`px-3 py-2 text-sm font-semibold ${filter === 'incomplete' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} rounded-md`}>
            Incompletas
          </button>
        </div>

        <ul role="list" className="divide-y divide-gray-500">
          {filteredTasks.map((task) => (
            <li key={task.id} className="flex flex-col sm:flex-row justify-between gap-x-6 py-5 sm:py-4">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <p className="mt-1 truncate text-base text-gray-500">{task.description}</p>
                </div>
              </div>
              <div className="flex flex-col items-center sm:items-end space-y-2 mt-4 sm:mt-0">
                <h4 className="text-base text-gray-900">{task.state ? 'Tarea completada' : 'Tarea incompleta'}</h4>
                <div className="group grid size-4 grid-cols-1">
                  <input
                    type="checkbox"
                    id={`state-${task.id}`}
                    name="state"
                    checked={task.state}
                    onChange={() => toggleTaskState(task.id)}
                    aria-describedby="comments-description"
                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-600 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                  />
                  <svg
                    fill="none"
                    viewBox="0 0 14 14"
                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                    <path
                      d="M3 8L6 11L11 3.5"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:checked]:opacity-100"
                    />
                    <path
                      d="M3 7H11"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="opacity-0 group-has-[:indeterminate]:opacity-100"
                    />
                  </svg>
                </div>
                <p className="text-base text-gray-900">Tarea creada el: {new Date(task.createdDate).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</p>

                <button onClick={() => removeTask(task.id)}
                  type="submit"
                  className="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Eliminar
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <Link to={`/edit/${task.id}`}>Editar</Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
