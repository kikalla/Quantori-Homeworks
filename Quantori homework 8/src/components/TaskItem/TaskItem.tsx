import React from "react";
import Task from "../../models/Task";
import DeleteIcon from "../../assets/DeleteIcon";
import MarkIcon from "../../assets/MarkIcon";
import "./taskItem.css";
import { convertDate } from "../../heplers";

interface props {
  task: Task;
  completed: boolean;
  updateTask: Function;
  deleteTask: Function;
}

const TaskItem: React.FC<props> = (props) => {
  const { task } = props;
  const completeClass = props.completed ? "completed-" : "";
  const convertedDate = convertDate(task.date);

  return (
    <li className={`${completeClass}tasks__list flex`} id={`${task.id}`}>
      <div className="flex">
        <span onClick={props.updateTask.bind(null, task)}>
          <MarkIcon active={props.completed} />
        </span>

        <div className={`${completeClass}tasks__containter flex`}>
          <h2 className={`${completeClass}tasks__text`}>{task.text}</h2>
          <div className={`${completeClass}tasks__info flex`}>
            <p
              className={`${completeClass}tasks__info--${
                props.completed ? "type" : task.info
              }`}>
              {task.info}
            </p>
            <p className={`${completeClass}tasks__info--time`}>
              {convertedDate}
            </p>
          </div>
        </div>
      </div>
      <span onClick={props.deleteTask.bind(null, task)}>
        <DeleteIcon />
      </span>
    </li>
  );
};

export default React.memo(TaskItem);
