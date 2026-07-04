import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Scheme from "../models/Scheme";
import { generateEmbedding } from "../services/embeddingService";

async function main() {
  await mongoose.connect(process.env.MONGO_URI!);

  console.log("Mongo Connected");

  const schemes = await Scheme.find();

  for (const scheme of schemes) {
    const text = `
${scheme.scheme_name}

${scheme.category}

${scheme.summary_text}

${scheme.tags?.join(", ")}
`;

    console.log("Embedding:", scheme.scheme_name);

    const embedding = await generateEmbedding(text);

    scheme.embedding = embedding;

    await scheme.save();
  }

  console.log("Done");

  process.exit(0);
}

main();