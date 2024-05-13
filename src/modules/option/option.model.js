import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    key: { type: String, required: true, trim: true },
    type: { type: String, enum: ["number", "string", "array", "boolean"] },
    enum: { type: Array, default: [] },
    guide: { type: String, required: false, default: "", trim: true },
    required: { type: Boolean, required: false, default: false },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Option = mongoose.model("Option", optionSchema);
export default Option;
