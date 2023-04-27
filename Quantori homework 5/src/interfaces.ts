export interface Task {
  task: string;
  info: string;
  date: string;
  id: number;
  completed: boolean;
}
export interface weatherResponse {
  location: {
    name: string;
  };
  current: {
    temp_c: number;
    condition: {
      icon: string;
    };
  };
}

export interface navigationPosition {
  coords: {
    latitude: number;
    longitude: number;
  };
}
