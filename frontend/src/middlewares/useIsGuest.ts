import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";

export const useIsGuest = () => {
  const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (data?.me) {
        if (typeof router.query.next === "string") {
          router.push(router.query.next);
        } else {
          router.push("/dashboard");
        }
      }
    }
  }, [loading, data, router]);
};
