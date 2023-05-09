import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import TaskList from '../src/components/ListTasks';
import { AddTaskForm } from './components/addForm';

function App() {

  return (
    <div className="App " >
      <div className='d-flex justify-content-around align-items-center bg-secondary mb-2 '>
        <h1>App</h1>
        <AddTaskForm />
      </div>
     <TaskList/>
    </div>
  );
}

export default App;
