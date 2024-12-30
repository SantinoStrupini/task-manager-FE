import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskComponent } from './components/TaskComponent'
import { TaskProvider } from './context/TaskProvider';

import { EditTaskComponent } from './components/EditTaskComponent';
import { AddTaskComponent } from './components/AddTaskComponent';



export const App = () => {
    return (
        <TaskProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<TaskComponent />} />
                    <Route path="/add" element={<AddTaskComponent />} />
                    <Route path="/edit/:id" element={<EditTaskComponent />} /> 
                </Routes>
            </Router>
        </TaskProvider>

    );
};

