import { useState, useEffect } from 'react';



export const TaskFormComponent = ({ onSubmit, initialData = {}, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    state: false,
    createdDate: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        ...initialData,
        createdDate: new Date(initialData.createdDate).toISOString().slice(0, 10),
      });
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
              Título:
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
            Descripción
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required

              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"

            />
          </div>

        </div>

        <label htmlFor="state">Estado:</label>
        <div>
          <span>{formData.state ? 'Completo' : 'Incompleto'}</span>
          <div className="mt-6 space-y-6">
            <div className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input

                    type="checkbox"
                    id="state"
                    name="state"
                    checked={formData.state}
                    onChange={handleChange}
                    aria-describedby="comments-description"
                    className="col-start-1 row-start-1 appearance-none rounded border border-gray-600 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                  />
                  <svg
                    fill="none"
                    viewBox="0 0 14 14"
                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                  >
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
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="createdDate">Fecha de Creación:</label>
          <input
            type="date"
            id="createdDate"
            name="createdDate"
            value={formData.createdDate}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {isEditing ? 'Editar Tarea' : 'Crear Tarea'}
        </button>
      </form>
    </>

  );
};