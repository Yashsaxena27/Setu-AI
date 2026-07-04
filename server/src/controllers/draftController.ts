import { Request, Response } from "express";

export const generateDraft = (
  req: Request,
  res: Response
) => {

  res.json({

    scheme:req.body.scheme,

    applicant:req.body.user,

    draft:

`Application Draft

Applicant:
${req.body.user}

Scheme:
${req.body.scheme}

This draft has been generated successfully.`

  });

};