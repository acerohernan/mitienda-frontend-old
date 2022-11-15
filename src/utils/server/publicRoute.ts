import Cookies from "cookies";
import { NextPageContext } from "next";

export function publicRoute({ req, res }: NextPageContext) {
  const cookies = Cookies(req!, res!);

  const token = cookies.get("token");

  if (token)
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
}
