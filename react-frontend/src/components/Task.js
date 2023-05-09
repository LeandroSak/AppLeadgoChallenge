import { useDispatch } from 'react-redux';
import { deleteTask } from '../features/tasks/taskSlice';
import EditButton from './EditButton';
import Button from 'react-bootstrap/Button';
import React from 'react';

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  return (
    <React.Fragment> 
      <th >{task.description}</th>
      <th>{task.date}</th>
      <th><Button variant="danger" onClick={handleDelete}>Delete</Button></th>
      <th><EditButton task={task}/></th>
    </React.Fragment> 
  );
};