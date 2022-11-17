import axios from "axios";
import Cookies from "cookies";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../../../../api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") return res.status(404);

  const cookies = Cookies(req, res);
  const token = cookies.get("token");

  if (!token)
    return res.status(403).send({
      error: true,
      message: "El usuario no tiene authorización",
    });

  try {
    const response = await axios.put(
      `${BASE_URL}/tenant/store/information`,
      req.body,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).send(response.data);
  } catch (err: any) {
    if (err?.response?.data)
      return res.status(err.response.status).send(err.response.data);

    res.status(500).send({
      message: "Server error",
    });
  }
}
