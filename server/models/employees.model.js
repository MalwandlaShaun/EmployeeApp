const mongoose = require("mongoose");

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
      required: true,
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
    currentEmployee: {
      type: Object,
      required: true,
    },
    employees: {
      type: Array,
      required: true,
    },
    editID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    selectedImage: {
      type: String,
      required: true,
    },
  },
  { collection: "employee-data" }
);

const model = mongoose.model("MyModel", employee);
module.exports = model;
