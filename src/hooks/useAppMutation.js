import { useMutation } from "@tanstack/react-query";
import { privateAxios } from "../utils/axios";

export function useAppMutation({ url, method = "post", ...options }) {
  return useMutation({
    mutationFn: async (variables) => {
      const { data } = await privateAxios.request({
        url,
        method,
        data: variables,
      });
      return data;
    },
    ...options,
  });
}
