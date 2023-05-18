import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import TasksList from "./components/TasksList/TasksList";
import AppHeader from "./components/AppHeader/AppHeader";
import AddForm from "./components/AddForm/AddForm";
import CompletedTasks from "./components/CompletedTasks/CompletedTasks";
import Task from "./models/Task";
import { DBurl } from "./config";

const App: React.FC = (props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formVisible, setFormVisible] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch(`${DBurl}tasks`);
      const data = await response.json();
      setTasks(data);
    })();
  }, []);

  function addTask(task: Task) {
    setTasks((tasks) => tasks.concat(task));
    fetch(`${DBurl}tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  }

  const deleteTask = useCallback((selectedTask: Task) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== selectedTask.id));
    fetch(`${DBurl}tasks/${selectedTask.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  const updateTask = useCallback((selectedTask: Task) => {
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id === selectedTask.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
    fetch(`${DBurl}tasks/${selectedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...selectedTask,
        completed: !selectedTask.completed,
      }),
    });
  }, []);

  return (
    <div className="App">
      <AppHeader setFormVisible={setFormVisible} setSearch={setSearch} />
      <TasksList
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        search={search}
      />
      <CompletedTasks
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        search={search}
      />
      {formVisible && (
        <AddForm setFormVisible={setFormVisible} addTask={addTask} />
      )}
    </div>
  );
};

export default App;
