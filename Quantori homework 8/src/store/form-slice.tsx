import { createSlice } from "@reduxjs/toolkit";
import FormState from "../models/FormStore";

const initialState: FormState = {
  addFormVisible: false,
  updateFormVisible: false,
  editTaskId: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    toggleAddFormVisibility(state, action) {
      state.addFormVisible = !state.addFormVisible;
    },
    toggleUpdateFormVisibility(state, action) {
      state.updateFormVisible = !state.updateFormVisible;
      state.editTaskId = action.payload.id;
    },
  },
});

export const formActions = formSlice.actions;

export default formSlice;
