import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: "all",
  isAddingTodo: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setIsAddingTodo: (state, action) => {
      state.isAddingTodo = action.payload;
    },

    addTodo: (state, action) => {
      const newTodo = {
        id: crypto.randomUUID(),
        text: action.payload.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      state.items.unshift(newTodo);
      state.isAddingTodo = false;
    },

    toggleTodo: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
        todo.updatedAt = new Date().toISOString();
      }
    },

    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },

    updateTodo: (state, action) => {
      const { id, updates } = action.payload;
      const todo = state.items.find((todo) => todo.id === id);

      if (todo) {
        Object.assign(todo, updates, { updatedAt: new Date().toISOString() });
      }
    },
  },
});

export const { setIsAddingTodo, addTodo, toggleTodo, deleteTodo, updateTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
