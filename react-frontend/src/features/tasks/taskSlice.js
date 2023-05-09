import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await axios.get('http://localhost:4000/task');
  return response.data;
});

const deleteTaskFromDB = async (taskId) => {
  try {
    await axios.delete(`http://localhost:4000/task/${taskId}`);
  } catch (error) {
    console.error(error);
  }
};

export const addTaskToDB = createAsyncThunk('tasks/addTaskToDB', async (task) => {
  try {
    await axios.post('http://localhost:4000/task', task);
    const response = await axios.get('http://localhost:4000/task');
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const updateTaskInDB = async (task) => {
  try {
    await axios.put(`http://localhost:4000/task/${task.id}`, task);
  } catch (error) {
    console.error(error);
  }
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], loading: false, error: null },
  reducers: {
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter(task => task.id !== taskId);
      deleteTaskFromDB(taskId);
    },
    addTask: (state, action) => {
      const task = action.payload;
      addTaskToDB(task);
      state.tasks.push(task);
    },
    updateTask: (state, action) => {
      const updatedTask = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
        updateTaskInDB(updatedTask);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
    })
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    builder.addCase(addTaskToDB.fulfilled, (state, action) => {
      state.tasks = action.payload;
    })
  },
});


export const { deleteTask, updateTask, } = tasksSlice.actions;
export default tasksSlice.reducer;