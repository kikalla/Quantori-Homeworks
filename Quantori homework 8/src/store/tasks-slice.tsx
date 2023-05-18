import { createSlice } from "@reduxjs/toolkit";
import TasksState from "../models/TasksStore";

const initialState: TasksState = {
  tasks: [],
  search: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    replaceTasks(state, action) {
      state.tasks = action.payload.tasks;
    },
    addTask(state, action) {
      state.tasks.push(action.payload.task);
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload.task.id
      );
    },
    markTask(state, action) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.task.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    },
    updateTask(state, action) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.task.id) {
          return { ...action.payload.task };
        }
        return task;
      });
    },
    updateSearch(state, action) {
      state.search = action.payload.search;
    },
  },
});

export const tasksActions = tasksSlice.actions;

export default tasksSlice;
