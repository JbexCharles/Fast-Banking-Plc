const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Ensure that there's only one admin.
AdminSchema.statics.createAdmin = async function (email, password) {
  const adminCount = await this.countDocuments();
  if (adminCount > 0) {
    throw new Error("Admin already exists. Only one admin is allowed.");
  }

  const newAdmin = new this({ email, password });
  await newAdmin.save();
  return newAdmin;
};

module.exports = mongoose.model("Admin", AdminSchema);
