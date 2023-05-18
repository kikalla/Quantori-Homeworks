import React from "react";
import Task from "../../models/Task";
import TaskItem from "../TaskItem/TaskItem";
import "./complete-tasks.css";
import { filterTasks } from "../../heplers";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface Props {
  tasks: Task[];
}

const CompletedTasks: React.FC<Props> = (props) => {
  const search = useSelector((state: RootState) => state.tasks.search);
  const tasks = filterTasks(props.tasks, true, search);

  return (
    <div className="completed-tasks">
      <h2 className="completed-tasks__title">All Tasks</h2>
      <ul className="completed-tasks__ul flex">
        {tasks.map((task) => (
          <TaskItem task={task} key={task.id} completed={true} />
        ))}
      </ul>
    </div>
  );
};

export default React.memo(CompletedTasks);
