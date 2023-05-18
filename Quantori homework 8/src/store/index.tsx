import { configureStore } from "@reduxjs/toolkit";

import tasksSlice from "./tasks-slice";
import formSlice from "./form-slice";

const store = configureStore({
  reducer: { tasks: tasksSlice.reducer, form: formSlice.reducer },
});

export default store;
export type RootState = ReturnType<any>;
// export type RootState = ReturnType<typeof store>;
