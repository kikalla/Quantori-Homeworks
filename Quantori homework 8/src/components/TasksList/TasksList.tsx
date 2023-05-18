import React from "react";
import "./tasksList.css";
import Task from "../../models/Task";
import TaskItem from "../TaskItem/TaskItem";
import { filterTasks } from "../../heplers";

interface Props {
  tasks: Task[];
  updateTask: Function;
  deleteTask: Function;
  search: string;
}

const TasksList: React.FC<Props> = (props) => {
  const tasks = filterTasks(props.tasks, false, props.search);

  return (
    <div className="tasks">
      <h2 className="tasks__title">All Tasks</h2>
      <ul className="tasks__ul flex">
        {tasks.map((task) => (
          <TaskItem
            task={task}
            key={task.id}
            completed={false}
            updateTask={props.updateTask}
            deleteTask={props.deleteTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(TasksList);
