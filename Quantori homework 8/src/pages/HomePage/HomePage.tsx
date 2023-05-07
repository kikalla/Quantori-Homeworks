import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./HomePage.css";
import TasksList from "../../components/TasksList/TasksList";
import AppHeader from "../../components/AppHeader/AppHeader";
import AddForm from "../../components/AddForm/AddForm";
import CompletedTasks from "../../components/CompletedTasks/CompletedTasks";
import { getTasksData } from "../../store/tasks-actions";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import TasksState from "../../models/TasksStore";
import EditForm from "../../components/EditForm/EditForm";
import Task from "../../models/Task";
import { useParams } from "react-router-dom";
import { RootState } from "../../store/index";

const App: React.FC = (props) => {
  const dispatch: ThunkDispatch<TasksState, unknown, AnyAction> = useDispatch();
  const params = useParams();
  const tasks: Task[] = useSelector((state: RootState) => state.tasks.tasks);
  const addFormVisible = useSelector(
    (state: RootState) => state.form.addFormVisible
  );
  const updateFormVisible = useSelector(
    (state: RootState) => state.form.updateFormVisible
  );

  const sort = params.info;
  const sortedTasks = tasks.filter((task) => task.info === sort);

  useEffect(() => {
    dispatch(getTasksData());
  }, [dispatch]);

  return (
    <div className="App">
      <AppHeader />
      <TasksList tasks={sort !== undefined ? sortedTasks : tasks} />
      <CompletedTasks tasks={sort !== undefined ? sortedTasks : tasks} />
      {addFormVisible && <AddForm />}
      {updateFormVisible && <EditForm />}
    </div>
  );
};

export default App;
