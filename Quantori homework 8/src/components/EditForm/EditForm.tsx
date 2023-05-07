import Task from "../../models/Task";
import { RootState } from "../../store";
import FormComponent from "../UI/FormComponent/FormComponent";
import { useSelector } from "react-redux";

const EditForm: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const taskId = useSelector((state: RootState) => state.form.editTaskId);

  const [task] = tasks.filter((task: Task) => task.id === taskId);

  return <FormComponent text="Edit Task" functionType="UPDATE" task={task} />;
};

export default EditForm;
