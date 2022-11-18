import Cookies from "cookies";
import formidable from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(404);

  const cookies = Cookies(req, res);
  const token = cookies.get("token");

  if (!token)
    return res.status(403).send({
      error: true,
      message: "El usuario no tiene authorización",
    });

  try {
    const form = new formidable.IncomingForm();

    console.log("Antes de parsear");
    form.parse(req, async (err, fields, files) => {
      console.log(files.file);
      console.log(err);
    });
    console.log("Despues de parsear");

    res.status(200).send({});
  } catch (err: any) {
    console.log(err);
    if (err?.response?.data)
      return res.status(err.response.status).send(err.response.data);

    res.status(500).send({
      message: "Server error",
    });
  }
}
