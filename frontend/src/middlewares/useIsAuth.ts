import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();
  useEffect(() => {
    if (!loading) {
      if (!data?.me) {
        router.replace("/?next=" + router.pathname);
      }
    }
  }, [loading, data, router]);
};
