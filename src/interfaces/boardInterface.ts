export interface Subtask {
    title: string;
    isCompleted: boolean;
  }
  
  export interface Task {
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
  }
  
  export interface Column {
    name: string;
    tasks: Task[];
    id : string
  }
  
  export interface Board {
    name: string;
    isActive: boolean;
    columns: Column[];
  }
  
  interface Boards {
    boards: Board[];
  }

export default Boards;