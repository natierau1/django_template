import axios from 'axios';

interface LoginResponse {
  access: string;
  refresh: string;
}

interface AuthTokens {
  accessToken: string | null;
  refreshToken: string | null;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

class AuthService {
  private static readonly ACCESS_TOKEN_KEY = 'accessToken';
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken';

  static async login(username: string, password: string): Promise<boolean> {
    try {
      const response = await axios.post<LoginResponse>(`${API_URL}/api/token/`, {
        username,
        password,
      });

      if (response.data.access && response.data.refresh) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, response.data.access);
        localStorage.setItem(this.REFRESH_TOKEN_KEY, response.data.refresh);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  static async refreshToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await axios.post<{ access: string }>(`${API_URL}/api/token/refresh/`, {
        refresh: refreshToken,
      });

      if (response.data.access) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, response.data.access);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  }

  static logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Setup axios interceptor for automatic token refresh
  static setupAxiosInterceptors(): void {
    axios.interceptors.request.use(
      async (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          const refreshed = await this.refreshToken();
          if (refreshed) {
            const token = this.getAccessToken();
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axios(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

export default AuthService; 