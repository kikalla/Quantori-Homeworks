import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import "./form.css";
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import TasksState from "../../../models/TasksStore";
import { formActions } from "../../../store/form-slice";
import { addTask, updateTask } from "../../../store/tasks-actions";
import Task from "../../../models/Task";

interface Props {
  functionType: string;
  text: string;
  task?: Task;
}

const AddForm: React.FC<Props> = (props) => {
  const dispatch: ThunkDispatch<TasksState, unknown, AnyAction> = useDispatch();

  const changeFormVisibility = () => {
    if (props.functionType === "ADD") {
      dispatch(formActions.toggleAddFormVisibility({}));
    }
    if (props.functionType === "UPDATE") {
      dispatch(formActions.toggleUpdateFormVisibility({}));
    }
  };

  interface Dispatch {
    type: string;
    value: string;
  }

  interface Form {
    radioValue: string;
    textValue: string;
    dateValue: string;
  }

  const formReducer = (state: Form, action: Dispatch) => {
    switch (action.type) {
      case "INPUT":
        return { ...state, radioValue: action.value };

      case "TEXT":
        return { ...state, textValue: action.value };

      case "DATE":
        return { ...state, dateValue: action.value };

      default:
        return state;
    }
  };

  const [formState, dispatchForm] = useReducer(formReducer, {
    radioValue: props.task?.info ? props.task?.info : "",
    textValue: props.task?.text ? props.task?.text : "",
    dateValue: props.task?.date ? props.task?.date : "",
  });

  const formIsValid =
    formState.radioValue !== "" &&
    formState.dateValue !== "" &&
    formState.textValue !== ""
      ? true
      : false;

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ type: "INPUT", value: event.target.value });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ type: "TEXT", value: event.target.value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatchForm({ type: "DATE", value: event.target.value });
  };

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formIsValid) {
      const task = {
        text: formState.textValue,
        info: formState.radioValue,
        date: formState.dateValue,
        id: props.task?.id ? props.task.id : Math.random(),
        completed: props.task?.completed ? props.task.completed : false,
      };
      if (props.functionType === "ADD") {
        dispatch(addTask(task));
      }
      if (props.functionType === "UPDATE") {
        dispatch(updateTask(task));
      }
      changeFormVisibility();
    }
  }

  const buttonClass = `form__add-button ${
    formIsValid ? "form__add-button--active pointer" : ""
  }`;

  return (
    <div>
      <form className="form flex" onSubmit={submitHandler}>
        <h2 className="form__h2">Add New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          maxLength={35}
          className="form__input"
          onChange={handleTextChange}
          value={formState.textValue}
        />

        <div className="form__radio-date flex">
          <div className="form__radios flex">
            <input
              type="radio"
              name="task"
              value="health"
              id="health"
              className="form__radio"
              onChange={handleRadioChange}
              checked={formState.radioValue === "health" ? true : false}
            />
            <label htmlFor="health" className="form__radio--health">
              health
            </label>
            <input
              type="radio"
              name="task"
              value="work"
              id="work"
              className="form__radio"
              onChange={handleRadioChange}
              checked={formState.radioValue === "work" ? true : false}
            />
            <label htmlFor="work" className="form__radio--work">
              work
            </label>
            <input
              type="radio"
              name="task"
              value="home"
              id="home"
              className="form__radio"
              onChange={handleRadioChange}
              checked={formState.radioValue === "home" ? true : false}
            />
            <label htmlFor="home" className="form__radio--home">
              home
            </label>
            <input
              type="radio"
              name="task"
              value="other"
              id="other"
              className="form__radio"
              onChange={handleRadioChange}
              checked={formState.radioValue === "other" ? true : false}
            />
            <label htmlFor="other" className="form__radio--other">
              other
            </label>
          </div>
          <input
            type="date"
            className="form__date"
            onChange={handleDateChange}
            value={formState.dateValue}
          />
        </div>
        <div className="form__buttons flex">
          <div className="form__cancel-button" onClick={changeFormVisibility}>
            Cancel
          </div>
          <button type="submit" className={buttonClass}>
            {props.text}
          </button>
        </div>
      </form>
      <div className="background" onClick={changeFormVisibility}></div>
    </div>
  );
};

export default AddForm;
