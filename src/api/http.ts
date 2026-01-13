import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - adiciona JWT
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - trata 401
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  get<T>(url: string, config?: any) {
    return this.instance.get<T>(url, config);
  }

  post<T>(url: string, data?: any, config?: any) {
    return this.instance.post<T>(url, data, config);
  }

  put<T>(url: string, data?: any, config?: any) {
    return this.instance.put<T>(url, data, config);
  }

  delete<T>(url: string, config?: any) {
    return this.instance.delete<T>(url, config);
  }
}

export const http = new HttpClient();
