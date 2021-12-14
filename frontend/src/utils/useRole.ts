import { useMeQuery } from "../generated/graphql";

export const useRole = () => {
  const { data, loading } = useMeQuery();

  return {
    isOperator: !loading && data && data.me && data.me.role === "operator",
    isObserver: !loading && data && data.me && data.me.role === "observer",
  };
};
