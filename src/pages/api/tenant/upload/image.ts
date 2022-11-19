import axios from "axios";
import Cookies from "cookies";
import FormData from "form-data";
import * as fs from "fs";
import multiparty from "multiparty";
import { NextApiRequest, NextApiResponse } from "next";
import { BASE_URL } from "../../../../api";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(404);

  const cookies = Cookies(req, res);
  const token = cookies.get("token");

  let image;

  if (!token)
    return res.status(403).send({
      error: true,
      message: "El usuario no tiene authorización",
    });

  const form = new multiparty.Form();

  await form.parse(req, async function (err, fields, files) {
    if (err) {
      console.log(err);
      return res.status(400).send({ message: "Error al subir imagen" });
    }

    if (files["img"] && files["img"][0]) {
      let file = files["img"][0];

      const fileBuffer = await fs.promises.readFile(file.path);

      const formToSend = new FormData();
      formToSend.append("img", fileBuffer);
      try {
        const response = await axios.post(
          `${BASE_URL}/tenant/upload/image`,
          formToSend,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);

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
  });
}
