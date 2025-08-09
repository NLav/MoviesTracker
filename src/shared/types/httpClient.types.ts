type HttpMethod = "GET";

export type HttpRequest = {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string | number>;
  params?: Record<string, string | number>;
  body?: unknown;
  signal: AbortSignal;
};

export type HttpResponse<T> = {
  statusCode: number;
  body: T;
};

export type HttpClient = {
  request<T>(data: HttpRequest): Promise<HttpResponse<T>>;
};
