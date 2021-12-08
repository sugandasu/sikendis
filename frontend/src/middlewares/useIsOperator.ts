import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";

export const useIsOperator = () => {
  const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!data?.me) {
        router.back();
      }
      if (data?.me && data?.me?.role !== "operator") {
        router.back();
      }
    }
  }, [loading, data, router]);
};
