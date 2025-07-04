import type { User, UserInfo } from "@/type/User";
import axiosInstance from "./axios";
import { useMutation } from "@tanstack/react-query";
import { accessTokenStore } from "@/store/accessTokenStore";
import { AxiosError } from "axios";

const login = async (credentials: Pick<User, "email" | "password">) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data as { access_token: string, user: UserInfo };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || { error: "로그인 중 오류가 발생했습니다." };
    }
    throw error;
  }
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      accessTokenStore.getState().setAccessToken(data.access_token);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
      console.log('로그인', `Bearer ${data.access_token}`, data);
    },
  });
};