import Cookies from "cookies";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export function withoutAuthentication<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return async function nextGetServerSidePropsHandler(
    context: GetServerSidePropsContext
  ) {
    const cookies = Cookies(context.req, context.res);
    const token = cookies.get("token");

    if (token) {
      return {
        redirect: {
          destination: "/admin",
          permanent: false,
        },
      };
    }

    return handler(context);
  };
}

export function withAuthentication<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return async function nextGetServerSidePropsHandler(
    context: GetServerSidePropsContext
  ) {
    const cookies = Cookies(context.req, context.res);
    const token = cookies.get("token");

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return handler(context);
  };
}

export function getTokenInServerSide(ctx: GetServerSidePropsContext): string {
  const cookies = Cookies(ctx.req, ctx.res);
  const token = cookies.get("token");

  if (!token) throw new Error("The token is not provided");

  return token;
}

export function removeTokenInServerSide(ctx: GetServerSidePropsContext): void {
  const cookies = Cookies(ctx.req, ctx.res);
  cookies.set("token");
}
