class Task {
  text: string;
  info: string;
  date: string;
  id: number;
  completed: boolean;

  constructor(
    text: string,
    info: string,
    date: string,
    id: number,
    completed: boolean
  ) {
    this.text = text;
    this.info = info;
    this.date = date;
    this.id = id;
    this.completed = completed;
  }
}

export default Task;
