import mongoose from "mongoose";

const employee = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    cellPhone: {
      type: String,
      required: true,
    },
  },
  { collection: "employee-data" }
);

const model = mongoose.model("MyModel", employee);
export default model;
