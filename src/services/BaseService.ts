import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export class BaseService {
  protected http: AxiosInstance;

  constructor(http: AxiosInstance) {
    this.http = http;
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.http.get(url, config);
    return response.data;
  }

  protected async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.http.post(url, data, config);
    return response.data;
  }
  protected async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.http.put(url, data, config);
    return response.data;
  }

  protected async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.http.delete(url, config);
    return response.data;
  }
}
