import { showPasswordError } from "@/components/alerts";
import { axiosApiBase } from "@/lib/axios.config";
import { ErrorResponse, TypeLoginFormInputs, LoginResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import qs from "qs";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: TypeLoginFormInputs) =>
      axiosApiBase.post<LoginResponse>(`/login`, qs.stringify(data)),
    onError: (error: AxiosError<ErrorResponse>) => {
       const message = error.response?.data?.detail 
        || error.response?.data?.message 
        || error.message 
        || "Some error occurred";
      showPasswordError(message);
    },
  });
};
