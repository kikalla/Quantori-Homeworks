import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import TasksList from "./components/TasksList/TasksList";
import AppHeader from "./components/AppHeader/AppHeader";
import AddForm from "./components/AddForm/AddForm";
import CompletedTasks from "./components/CompletedTasks/CompletedTasks";
import { getTasksData } from "./store/tasks-actions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import TasksState from "./models/TasksStore";
import EditForm from "./components/EditForm/EditForm";

const App: React.FC = (props) => {
  const [search, setSearch] = useState("");

  const dispatch: ThunkDispatch<TasksState, unknown, AnyAction> = useDispatch();
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const addFormVisible = useSelector((state: any) => state.form.addFormVisible);
  const updateFormVisible = useSelector(
    (state: any) => state.form.updateFormVisible
  );

  useEffect(() => {
    dispatch(getTasksData());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader setSearch={setSearch} />
      <TasksList tasks={tasks} search={search} />
      <CompletedTasks tasks={tasks} search={search} />
      {addFormVisible && <AddForm />}
      {updateFormVisible && <EditForm />}
    </div>
  );
};

export default App;
