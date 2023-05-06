import React from "react";
import Task from "../../models/Task";
import DeleteIcon from "../../assets/DeleteIcon";
import MarkIcon from "../../assets/MarkIcon";
import "./taskItem.css";
import { convertDate } from "../../heplers";
import { useDispatch } from "react-redux";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import TasksState from "../../models/TasksStore";
import { deleteTask, markTask } from "../../store/tasks-actions";
import { formActions } from "../../store/form-slice";

interface Props {
  task: Task;
  completed: boolean;
}

const TaskItem: React.FC<Props> = (props) => {
  const { task } = props;
  const completeClass = props.completed ? "completed-" : "";
  const convertedDate = convertDate(task.date);
  const dispatch: ThunkDispatch<TasksState, unknown, AnyAction> = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteTask(task));
  };
  const editHandler = () => {
    dispatch(formActions.toggleUpdateFormVisibility({ id: task.id }));
  };
  const markHandler = () => {
    dispatch(markTask(task));
  };

  return (
    <li className={`${completeClass}tasks__list flex`} id={`${task.id}`}>
      <div className="flex">
        <span onClick={markHandler}>
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
      <span onClick={deleteHandler}>
        <DeleteIcon />
      </span>
      <span onClick={editHandler}>
        <DeleteIcon />
      </span>
    </li>
  );
};

export default React.memo(TaskItem);
