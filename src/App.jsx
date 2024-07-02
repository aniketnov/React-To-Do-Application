import React from "react";
import TaskInput from "./Components/TaskInput";
import TaskList from "./Components/TaskList";

function App() {
  return (
    <div className="App">
      <h1>Todo App</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
}

export default App;
