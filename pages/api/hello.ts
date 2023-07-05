import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

const cors = Cors({
  methods: ["GET"],
  origin: "*",
});

type Data = {
  ip: string;
  forwardedFor: string;
  forwardedForVercel: string;
};

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors);

  let ip = "";

  const forwardedFor = req.headers["x-forwarded-for"] as string;
  const forwardedForVercel = req.headers["x-vercel-forwarded-for"] as string;

  if (forwardedFor) {
    ip = forwardedFor?.split(",").at(0) ?? "Unknown";
  }

  res.status(200).json({ ip: ip, forwardedFor, forwardedForVercel });
}
