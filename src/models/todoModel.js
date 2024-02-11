import mongoose, { Schema } from "mongoose";

const todoModel = new Schema({
  note: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.models.todos || mongoose.model("todos", todoModel);

export default Todo;
