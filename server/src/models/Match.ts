import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  scheme_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Scheme",
  },

  match_score: Number,

  rule_matched: [String],

  explanation_text: String,

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

matchSchema.index({
  user_id: 1,
  timestamp: -1,
});

export default mongoose.model("Match", matchSchema);