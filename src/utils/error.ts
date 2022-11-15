export function getHttpError(error: any): string {
  let message = "Ha ocurrido un error en el servidor";
  let errMsg = error?.response?.data?.message;

  if (errMsg) {
    /* If the error is a string */
    if (typeof errMsg === "string") {
      message = errMsg;
    }

    console.log(errMsg, errMsg.lenght);
    /* If the errors are in array */
    if (Array.isArray(errMsg)) {
      message = errMsg[0];
    }
  }

  return message;
}
