import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  scheme_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scheme",
  },

  reminder_date: Date,

  notification_channel: String,

  status: String,
});

export default mongoose.model("Reminder", reminderSchema);