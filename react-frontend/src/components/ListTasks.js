import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/taskSlice';
import { Task } from './Task';

import Table from 'react-bootstrap/Table';

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="col-md-10 mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover  >
          <thead>
            <tr>
              <th >Description</th>
              <th>Date</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {tasks.map((task) => (
              <tr key={task.id} >
                <Task task={task} />
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default TaskList;
