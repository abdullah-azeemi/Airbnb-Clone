const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "admin" },
  listings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property' 
  }],
});

module.exports = mongoose.model("User", userSchema);
