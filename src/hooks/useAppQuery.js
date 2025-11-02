// hooks/useAppQuery.ts
import { useQuery } from "@tanstack/react-query";
import { publicAxios, privateAxios } from "../utils/axios";

export function useAppQuery({
  queryKey,
  url,
  params,
  isPrivate = false,
  ...options
}) {
  const client = isPrivate ? privateAxios : publicAxios;

  return useQuery({
    queryKey: [...queryKey, params],
    queryFn: async () => {
      const { data } = await client.get(url, { params });
      return data;
    },
    ...options,
  });
}
