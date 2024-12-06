import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Todo, TodoState } from "../types/todo";
import { format, startOfDay } from "date-fns";

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (
        title: string,
        description: string,
        dateString: string
      ) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          title,
          description,
          completed: false,
          createdAt: format(
            startOfDay(new Date(dateString)),
            "yyyy-MM-dd"
          ),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },
      toggleTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  completed: !todo.completed,
                  updatedAt: new Date().toISOString(),
                }
              : todo
          ),
        }));
      },
      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      editTodo: (id: string, title: string, description: string) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? {
                  ...todo,
                  title,
                  description,
                  updatedAt: new Date().toISOString(),
                }
              : todo
          ),
        }));
      },
      getTodosByDate: (dateString: string) => {
        const state = get();
        const targetDate = format(
          startOfDay(new Date(dateString)),
          "yyyy-MM-dd"
        );
        return state.todos.filter(
          (todo) => todo.createdAt === targetDate
        );
      },
    }),
    {
      name: "todo-storage",
    }
  )
);
