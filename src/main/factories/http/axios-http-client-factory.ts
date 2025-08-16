import { AxiosHttpCLient } from "@/infrastructure/http";

function makeAxiosHttpClient(): AxiosHttpCLient {
  return new AxiosHttpCLient();
}

export { makeAxiosHttpClient };
