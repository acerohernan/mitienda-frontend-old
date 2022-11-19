import axios from "axios";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../../../../api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(404);

  try {
    const response = await axios.post(
      `${BASE_URL}/tenant/auth/login`,
      req.body
    );

    if (response.data?.token) {
      const cookies = Cookies(req, res);
      cookies.set("token", response.data?.token, {
        httpOnly: false,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) /* 7 days */,
      });
    }

    res.status(200).send(response.data);
  } catch (err: any) {
    if (err?.response?.data)
      return res.status(err.response.status).send(err.response.data);

    res.status(500).send({
      message: "Server error",
    });
  }
}
