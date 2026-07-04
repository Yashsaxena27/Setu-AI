import { Request, Response } from "express";

export const matchSchemes = async (
  req: Request,
  res: Response
) => {

  res.json({
    message: "Matching API Ready",
    profile: req.body
  });

};