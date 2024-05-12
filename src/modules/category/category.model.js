import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    icon: {
      type: String,
      required: false,
      trim: true,
    },
    parents: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
    id: false,
    toJSON: {
      virtuals: true,
    },
  }
);

categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

function autoPopulate(next) {
  this.populate([{ path: "children" }]);
  next();
}
CategorySchema.pre("find", autoPopulate).pre("findOne", autoPopulate);

const Category = model("Category", categorySchema);
export default Category;
