import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";

export const useIsOperator = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    console.log(data);
    if ((!loading && !data?.me) || data?.me.role !== "operator") {
      router.back();
    }
  }, [loading, data, router]);
};
