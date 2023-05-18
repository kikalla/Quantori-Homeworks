import React from "react";
import "./tasksList.css";
import Task from "../../models/Task";
import TaskItem from "../TaskItem/TaskItem";
import { filterTasks } from "../../heplers";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
  tasks: Task[];
}

const TasksList: React.FC<Props> = (props) => {
  const search = useSelector((state: RootState) => state.tasks.search);
  const tasks = filterTasks(props.tasks, false, search);

  return (
    <div className="tasks">
      <h2 className="tasks__title">All Tasks</h2>
      <ul className="tasks__ul flex">
        {tasks.map((task) => (
          <TaskItem task={task} key={task.id} completed={false} />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(TasksList);
