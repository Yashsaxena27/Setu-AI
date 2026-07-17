import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    scheme_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scheme",
    },
    
    schemeName: String,
    
    reminder_date: Date,

    notification_channel: String,

    status: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Reminder", reminderSchema);