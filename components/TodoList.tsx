import React, { useState, useEffect } from "react";
import { Pencil, Trash2, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Todo } from "../types/todo";
import { useTodoStore } from "../store/todo";

interface TodoListProps {
  selectedDate: string;
}

interface EditingState {
  id: string;
  title: string;
  description: string;
}

export function TodoList({ selectedDate }: TodoListProps) {
  const [mounted, setMounted] = useState(false);
  const [editing, setEditing] = useState<EditingState | null>(null);
  const { getTodosByDate, toggleTodo, deleteTodo, editTodo } =
    useTodoStore();
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const updateTodos = () => {
      if (mounted) {
        setTodos(getTodosByDate(selectedDate));
      }
    };

    updateTodos();
    const interval = setInterval(updateTodos, 100);
    return () => clearInterval(interval);
  }, [selectedDate, mounted, getTodosByDate]);

  if (!mounted) return null;

  const handleToggleTodo = (id: string) => {
    toggleTodo(id);
    setTodos(getTodosByDate(selectedDate));
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
    setTodos(getTodosByDate(selectedDate));
  };

  const startEdit = (todo: Todo) => {
    setEditing({
      id: todo.id,
      title: todo.title,
      description: todo.description,
    });
  };

  const saveEdit = (id: string) => {
    if (
      editing &&
      editing.title.trim() &&
      editing.description.trim()
    ) {
      editTodo(id, editing.title.trim(), editing.description.trim());
      setTodos(getTodosByDate(selectedDate));
      setEditing(null);
    }
  };

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="p-3 bg-white rounded-2xl group transition-colors shadow-xl"
        >
          <div className="flex items-start gap-4">
            <div className="mt-1">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => handleToggleTodo(todo.id)}
                className="w-7 h-7 border-2 rounded-full"
              />
            </div>

            {editing?.id === todo.id ? (
              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <textarea
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditing(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => saveEdit(todo.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <h3
                  className={cn(
                    "text-2xl font-bold",
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900"
                  )}
                >
                  {todo.title}
                </h3>
                <p
                  className={cn(
                    "mt-1 text-lg",
                    todo.completed
                      ? "line-through text-gray-400"
                      : "text-gray-600"
                  )}
                >
                  {todo.description}
                </p>
              </div>
            )}

            {!editing && (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => startEdit(todo)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}

      {todos.length === 0 && mounted && (
        <p className="text-center text-gray-500 py-8">
          No tasks for this day. Add one to get started!
        </p>
      )}
    </div>
  );
}
