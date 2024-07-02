import { createSlice } from "@reduxjs/toolkit";

// Define initial state and create a slice of the Redux store
const todosSlice = createSlice({
  name: "todos", //  slice Name
  initialState: [], // Initial state of the todos slice
  reducers: {
    // Add a new task
    addTask: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    // Delete a task weneed a id for this
    deleteTask: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    // Edit the  taskused Id
    editTask: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
    // Toggle the task if task is complated or not
    toggleTask: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    // used for initializing from local storage
    setTasks: (state, action) => {
      return action.payload;
    },
  },
});

// Export actions createSlice
export const { addTask, deleteTask, editTask, toggleTask, setTasks } =
  todosSlice.actions;

// Export  reducer function
export default todosSlice.reducer;
