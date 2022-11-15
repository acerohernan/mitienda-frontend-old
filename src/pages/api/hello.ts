import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookies = new Cookies(req, res);

  console.log(cookies.get("example"));

  cookies.set("example", "example", {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 days
  });

  res.status(200).json({ message: "Hello from Next.js!" });
}
