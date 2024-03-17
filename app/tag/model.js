const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const tagSchema = Schema({
  // _id: {
  //   type: String,
  //   required: true,
  // }, //tak kek i iki baru iso metu tapi [] array korong
  name: {
    type: String,
    minLength: [3, "name must be a minimum length of 3 characters"],
    maxLength: [20, "name must be a maximum length of 20 characters"],
    required: [true, "name is required"],
  },
});

module.exports = model("Tag", tagSchema);
