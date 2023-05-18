import { ThunkAction, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { DBurl } from "../config";
import Task from "../models/Task";
import TasksState from "../models/TasksStore";
import { tasksActions } from "./tasks-slice";

export const getTasksData = (): ThunkAction<
  Promise<void>,
  TasksState,
  unknown,
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<TasksState, unknown, AnyAction>) => {
    const fetchData = async () => {
      const response = await fetch(`${DBurl}tasks`);
      const data = await response.json();

      if (!response.ok) {
        throw Error("something wrong");
      }
      return data;
    };

    try {
      const tasksData = await fetchData();
      dispatch(
        tasksActions.replaceTasks({ tasks: tasksData, type: "REPLACE" })
      );
    } catch {
      throw Error("something wrong");
    }
  };
};

export const addTask = (
  task: Task
): ThunkAction<Promise<void>, TasksState, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<TasksState, unknown, AnyAction>) => {
    const sendTask = async (task: Task) => {
      fetch(`${DBurl}tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
    };

    try {
      sendTask(task);
      dispatch(tasksActions.addTask({ task: task }));
    } catch {
      throw Error("something wrong");
    }
  };
};

export const deleteTask = (
  task: Task
): ThunkAction<Promise<void>, TasksState, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<TasksState, unknown, AnyAction>) => {
    const removeTask = async (task: Task) => {
      fetch(`${DBurl}tasks/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    };

    try {
      removeTask(task);
      dispatch(tasksActions.deleteTask({ task: task }));
    } catch {
      throw Error("something wrong");
    }
  };
};

export const markTask = (
  task: Task
): ThunkAction<Promise<void>, TasksState, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<TasksState, unknown, AnyAction>) => {
    const checkTask = async (task: Task) => {
      fetch(`${DBurl}tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...task,
          completed: !task.completed,
        }),
      });
    };

    try {
      checkTask(task);
      dispatch(tasksActions.markTask({ task: task }));
    } catch {
      throw Error("something wrong");
    }
  };
};

export const updateTask = (
  task: Task
): ThunkAction<Promise<void>, TasksState, unknown, AnyAction> => {
  return async (dispatch: ThunkDispatch<TasksState, unknown, AnyAction>) => {
    const editTask = async (task: Task) => {
      fetch(`${DBurl}tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...task,
        }),
      });
    };

    try {
      editTask(task);

      dispatch(tasksActions.updateTask({ task: task }));
    } catch {
      throw Error("something wrong");
    }
  };
};
