import { PrefixNumber } from "../constants";

export const getPrefixFromNumber = (phone: string): PrefixNumber => {
  if (phone.startsWith("1")) return PrefixNumber.US;
  if (phone.startsWith("51")) return PrefixNumber.PE;
  if (phone.startsWith("54")) return PrefixNumber.AR;

  return PrefixNumber.PE;
};
