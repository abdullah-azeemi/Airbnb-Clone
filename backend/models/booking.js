const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {type:mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  property: {type:mongoose.Schema.Types.ObjectId, ref: "Property", required: true},
  checkInDate: {type:Date, required: true},
  checkOutDate: {type:Date, required: true},
  totalCost: {type:Number, required: true},
});

module.exports = mongoose.model("Booking", bookingSchema);