import { Request, Response } from "express";
import { generateDraft } from "../services/draftService";

export async function createDraft(
  req: Request,
  res: Response
) {
  try {
    const draft = await generateDraft(
      req.body.profile,
      req.body.scheme
    );

    res.json({
      success: true,
      draft,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}