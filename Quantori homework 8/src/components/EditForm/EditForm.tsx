import Task from "../../models/Task";
import FormComponent from "../UI/FormComponent/FormComponent";
import { useSelector } from "react-redux";

const EditForm: React.FC = () => {
  const tasks = useSelector((state: any) => state.tasks.tasks);
  const taskId = useSelector((state: any) => state.form.editTaskId);

  const [task] = tasks.filter((task: Task) => task.id === taskId);

  return <FormComponent text="Edit Task" functionType="UPDATE" task={task} />;
};

export default EditForm;
