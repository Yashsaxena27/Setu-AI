import mongoose from "mongoose";

const schemeSchema = new mongoose.Schema(
  {
    scheme_name: String,

    category: String,

    level: String,

   state_applicability: [String],

    eligibility_rules: Object,

    benefits: [String],

    required_documents: [String],

    application_steps: [String],

    official_link: String,

    source_link: String,

    last_verified_date: Date,

    summary_text: String,

    embedding: [Number],

    version_history: [String],

    tags: [String],
  },
  {
    timestamps: true,
  }
);

schemeSchema.index({
  state_applicability: 1,
  category: 1,
  level: 1,
});

export default mongoose.model("Scheme", schemeSchema);