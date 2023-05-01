import React, { useReducer } from "react";
import "./form.css";

interface props {
  setFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  addTask: Function;
}

const AddForm: React.FC<props> = (props) => {
  const changeFormVisibility = () => {
    props.setFormVisible((formVisible) => !formVisible);
  };

  interface dispatch {
    type: string;
    value: string;
  }

  interface form {
    radioValue: string;
    textValue: string;
    dateValue: string;
  }

  const formReducer = (state: form, action: dispatch) => {
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
    radioValue: "",
    textValue: "",
    dateValue: "",
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
        id: Math.random(),
        completed: false,
      };
      props.addTask(task);
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
          maxLength={40}
          className="form__input"
          onChange={handleTextChange}
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
            />
            <label htmlFor="other" className="form__radio--other">
              other
            </label>
          </div>
          <input
            type="date"
            className="form__date"
            onChange={handleDateChange}
          />
        </div>
        <div className="form__buttons flex">
          <button
            className="form__cancel-button"
            onClick={changeFormVisibility}>
            Cancel
          </button>
          <button type="submit" className={buttonClass}>
            Add task
          </button>
        </div>
      </form>
      <div className="background" onClick={changeFormVisibility}></div>
    </div>
  );
};

export default AddForm;
