import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") return res.status(404);

  const cookies = Cookies(req, res);
  cookies.set("token");
  res.status(200).send({});
}
