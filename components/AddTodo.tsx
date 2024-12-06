import { useState } from "react";
import { useTodoStore } from "../store/todo";
import { Plus } from "lucide-react";

interface AddTodoProps {
  selectedDate: string;
}

export function AddTodo({ selectedDate }: AddTodoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      addTodo(title.trim(), description.trim(), selectedDate);
      setTitle("");
      setDescription("");
      setIsOpen(false);
    }
  };

  return (
    <div className="mb-8 flex items-center justify-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-4 border-none rounded-full bg-white text-black transition-colors shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
        >
          <Plus className="w-6 h-6" />
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-gray-50 p-6 rounded-lg"
        >
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-black/50 text-white rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
