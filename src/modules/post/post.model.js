import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    province: {
      type: String,
      maxLength: 255,
      trim: true,
      required: false,
    },
    city: {
      type: String,
      maxLength: 255,
      trim: true,
      required: false,
    },
    district: {
      type: String,
      required: true,
    },
    coordinate: {
      type: [Number], // [lat, lan]
      default: [0, 0],
    },
    images: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
