// types/todo.ts
export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TodoState {
  todos: Todo[];
  addTodo: (
    title: string,
    description: string,
    dateString: string
  ) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, title: string, description: string) => void;
  getTodosByDate: (dateString: string) => Todo[];
}
