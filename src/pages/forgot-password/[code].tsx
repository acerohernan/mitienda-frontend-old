import { InferGetServerSidePropsType } from "next";
import { API } from "../../api";
import { withoutAuthentication } from "../../utils/server/ssr";
import RestorePasswordView from "../../views/auth/restore";

function RestorePassword({
  validCode,
  code,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <RestorePasswordView validCode={validCode} code={code} />;
}

export const getServerSideProps = withoutAuthentication<{
  validCode: boolean;
  code: string;
}>(async function ({ req, res, query }) {
  const { code } = query;

  if (!code || Array.isArray(code))
    return {
      props: {
        validCode: false,
        code: "",
      },
    };

  try {
    await API.tenant.checkForgotPasswordCode(code);
    return {
      props: {
        validCode: true,
        code,
      },
    };
  } catch (err) {
    return {
      props: {
        validCode: false,
        code,
      },
    };
  }
});

export default RestorePassword;
