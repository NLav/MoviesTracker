import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import type { HttpClient, HttpRequest, HttpResponse } from "@/shared/types";

export class HttpClientAdapter implements HttpClient {
  constructor(private api: AxiosInstance) {}

  async request<T>(data: HttpRequest): Promise<HttpResponse<T>> {
    try {
      const axiosResponse: AxiosResponse = await this.api.request({
        url: data.url,
        method: data.method,
        params: data.params,
        headers: data.headers,
        signal: data.signal,
        data: data.body,
      });

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      };
    } catch (error) {
      const currentError = error as AxiosError;

      if (currentError?.response) {
        return {
          statusCode: currentError.response.status,
          body: currentError.response.data as T,
        };
      }

      if (currentError?.request) {
        return {
          statusCode: 0,
          body: {
            message: "No response received from server.",
          } as T,
        };
      }

      return {
        statusCode: 500,
        body: {
          message: currentError?.message ?? "Unexpected error occurred.",
        } as T,
      };
    }
  }
}
