interface Subtask {
    title: string;
    isCompleted: boolean;
  }
  
  interface Task {
    title: string;
    description: string;
    status: string;
    subtasks: Subtask[];
  }
  
  export interface Column {
    name: string;
    tasks: Task[];
  }
  
  interface Board {
    name: string;
    isActive: boolean;
    columns: Column[];
  }
  
  interface Boards {
    boards: Board[];
  }

export default Boards;