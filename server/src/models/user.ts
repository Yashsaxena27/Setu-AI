import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
    },

    password: String,

    demographics: {
      age: Number,

      state: String,

      district: String,

      income_bracket: String,
    },

    occupation: String,

    disability_status: Boolean,

    education_level: String,

    language_preference: String,

    phone_whatsapp: String,

    consent_given: Boolean,

    consent_timestamp: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.index({
  "demographics.age": 1,
  "demographics.state": 1,
  "demographics.income_bracket": 1,
});

export default mongoose.model("User", userSchema);