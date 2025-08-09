type HttpMethod = "GET";

export interface HttpRequest {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: unknown;
  signal: AbortSignal;
}

export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpClient {
  request<T>(data: HttpRequest): Promise<HttpResponse<T>>;
}
