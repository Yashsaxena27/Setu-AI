import { Request, Response } from "express";
import Scheme from "../models/Scheme";
import { generateEmbedding } from "../services/embeddingService";

export const vectorSearch = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;

    const embedding = await generateEmbedding(query);

    const results = await Scheme.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: embedding,
          numCandidates: 10,
          limit: 5,
        },
      },
      {
        $project: {
          scheme_name: 1,
          category: 1,
          summary_text: 1,
          score: {
            $meta: "vectorSearchScore",
          },
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Vector search failed" });
  }
};