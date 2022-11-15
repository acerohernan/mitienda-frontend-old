import { useRouter } from "next/router";

function Store() {
  const { query } = useRouter();

  return <div>{query.store}</div>;
}

export default Store;
