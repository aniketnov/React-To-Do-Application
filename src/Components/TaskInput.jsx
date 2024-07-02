import { useState } from "react";
import { useDispatch } from "react-redux";
import { HiMiniPlus } from "react-icons/hi2";
import { addTask } from "../features/todos/todoslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskInput() {
  const [task, setTask] = useState(""); // State to hold the input task
  const dispatch = useDispatch(); // Hook to dispatch actions

  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent default behavior of html form submission
    if (!task) return; // if not any input in the task input return it
    dispatch(addTask(task)); // add new task
    toast.success("Task added successfully!");
    setTask(""); // after submination reset input area.
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="add-todo-form">
        <div className="input-container">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)} // state update when input added.
            placeholder="Enter New Task"
            required
          />
        </div>
        <button type="submit">
          <HiMiniPlus /> {/* react icon Icon for the submit button */}
        </button>
      </form>
      <ToastContainer /> {/*  toaster notifications */}
    </>
  );
}

export default TaskInput;
