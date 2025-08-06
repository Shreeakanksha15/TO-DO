import { Calendar, Check, Edit3, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../store/todoSlice";
import TodoForm from "./TodoForm";

function TodoItem({ todo, index }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDelete] = useState(false);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    setIsDelete(true);
    setTimeout(() => {
      dispatch(deleteTodo(todo.id));
    }, 200);
  };

  const handleUpdate = (text) => {
    dispatch(updateTodo({ id: todo.id, updates: { text: text.trim() } }));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
        <TodoForm
          initialValue={todo.text}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
          placeholder="Update your task"
        />
      </div>
    );
  }

  return (
    <div
      className={`group bg-white rounded-lg shadow-sm hover:shadow-md border border-gray-200 p-4 transition-all duration-200 ${
        isDeleting ? "opacity-0 scale-95" : "opacity-100 scale-100"
      } ${todo.completed ? "opacity-75" : ""}`}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      {/* Top section */}
      <div className="flex items-start gap-4">
        {/* Toggle Button */}
        <button
          className={`w-6 h-6 rounded-full border-2 grid place-items-center transition-all duration-200 mt-1 ${
            todo.completed
              ? "bg-green-500 border-green-500 hover:bg-green-600 text-white"
              : "border-gray-400 hover:border-green-500 hover:bg-green-50"
          }`}
          onClick={handleToggle}
          title="Toggle Completion"
        >
          {todo.completed && <Check size={14} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-gray-800 text-sm font-medium">{todo.text}</div>

          {/* Priority Tag (Optional) */}
          {todo.priority && (
            <span
              className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1 ${
                todo.priority === "high"
                  ? "bg-red-100 text-red-700"
                  : todo.priority === "medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
            </span>
          )}

          {/* Dates */}
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>Created: {formatDate(todo.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Edit3 size={12} />
              <span>Updated: {formatDate(todo.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            className="p-2 text-gray-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
            onClick={() => setIsEditing(true)}
            title="Edit Task"
          >
            <Edit3 size={16} />
          </button>

          <button
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
            onClick={handleDelete}
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
