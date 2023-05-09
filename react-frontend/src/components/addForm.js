import React,{ useState } from 'react';
import { useDispatch } from 'react-redux';
import {addTaskToDB } from '../features/tasks/taskSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const AddTaskForm = () => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const imput = description.trim()
    if(imput.length < 5){
      setShow(true)
    }else{
    const newTask = { description };
    dispatch(addTaskToDB(newTask));
    setDescription('');
    setShow(false)
    }
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" onClick={handleShow} className="mb-2">
        Create Task
      </Button>

      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header  >
          <Modal.Title className="mx-auto">New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form  >
            <Form.Control type="text" value={description} onChange={e => setDescription(e.target.value)} />
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" type='submit' onClick={handleSubmit}>
            Add Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};