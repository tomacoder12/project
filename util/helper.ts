import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

type AcceptedMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const apiCaller = async <T = any>(
  url: string,
  method: AcceptedMethods,
  data?: any,
  extraConfig?: Partial<AxiosRequestConfig>,
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method: method.toUpperCase() as Method,
      ...extraConfig,
    };

    if (method.toUpperCase() === "GET") {
      config.params = data;
    } else {
      config.data = data;
    }

    const res: AxiosResponse<T> = await axios(config);
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || error.message || "api error";
    console.log(`api call failed [${method}] ${url}:`, message);
    throw error;
  }
};