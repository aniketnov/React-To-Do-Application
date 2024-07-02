import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  editTask,
  toggleTask,
  setTasks,
} from "../features/todos/todoslice";
import { HiMiniPencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskList() {
  const todos = useSelector((state) => state.todos); // access todos from Redux store
  const dispatch = useDispatch(); // Hook to dispatch actions
  const [editingTodo, setEditingTodo] = useState(null);
  const [editText, setEditText] = useState("");

  //tasks from local storage when the first component mounts
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (storedTasks.length > 0) {
      dispatch(setTasks(storedTasks));
    }
  }, [dispatch]);

  // added local storage when new todos updated
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todos));
  }, [todos]);

  // handleEvent for the editing of a task
  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
  };

  //  handle save the update edited task
  const handleEditSave = () => {
    if (editText.trim()) {
      dispatch(editTask({ id: editingTodo.id, newText: editText }));
      setEditingTodo(null);
      toast.success("Task Updated successfully!"); // Show success  notification
    } else {
      toast.error("Task text cannot be empty!"); // Show error notification
    }
  };

  //  deleting a task
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    toast.info("Task deleted successfully!");
  };

  // toggling the complated task or not
  const handleToggle = (id) => {
    dispatch(toggleTask(id));
    toast.success("Task status updated!"); // Show success notification
  };

  return (
    <div className="todo-list-container">
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}
          >
            <div className="todo-content">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)} // toggling task
                />
                <span className="checkmark"></span>
                <span className="todo-text">{todo.text}</span>
              </label>
            </div>
            <div className="todo-actions">
              <button className="edit-btn" onClick={() => handleEdit(todo)}>
                <HiMiniPencilSquare />
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(todo.id)} //  deleting a task
              >
                <HiOutlineTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editingTodo && (
        <div className="edit-popup">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="edit-input"
          />
          <div className="edit-actions">
            <button className="save-btn" onClick={handleEditSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={() => setEditingTodo(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default TaskList;
