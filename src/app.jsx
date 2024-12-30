import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskComponent } from './components/TaskComponent'
import { TaskProvider } from './context/TaskProvider';
import { AddTaskComponent } from './components/addTaskComponent';
import { EditTaskComponent } from './components/EditTaskComponent';



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

