import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

import type {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from "@/data/protocols/http";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export class AxiosHttpCLient implements HttpClient {
  async request(requestData: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;

    try {
      axiosResponse = await api.request({
        url: requestData.url,
        method: requestData.method,
        data: requestData.body,
        headers: requestData.headers,
      });
    } catch (error) {
      axiosResponse = (error as AxiosError).response!;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
