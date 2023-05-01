import React from "react";
import Task from "../../models/Task";
import TaskItem from "../TaskItem/TaskItem";
import "./complete-tasks.css";
import { filterTasks } from "../../heplers";

interface props {
  tasks: Task[];
  updateTask: Function;
  deleteTask: Function;
  search: string;
}

const CompletedTasks: React.FC<props> = (props) => {
  const tasks = filterTasks(props.tasks, true, props.search);

  return (
    <div className="completed-tasks">
      <h2 className="completed-tasks__title">All Tasks</h2>
      <ul className="completed-tasks__ul flex">
        {tasks.map((task) => (
          <TaskItem
            task={task}
            key={task.id}
            completed={true}
            updateTask={props.updateTask}
            deleteTask={props.deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(CompletedTasks);
