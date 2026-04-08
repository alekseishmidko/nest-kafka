import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthResponse, SERVICES_PORTS, UserProfileResponse } from '@app/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly authServiceUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.authServiceUrl =
      this.configService.getOrThrow<string>('AUTH_SERVICE_URL');
  }

  async register(data: {
    email: string;
    password: string;
    name: string;
  }): Promise<UserProfileResponse> {
    try {
      const url = `${this.authServiceUrl}/auth/register`;

      const response = await firstValueFrom(
        this.httpService.post<UserProfileResponse>(url, data),
      );

      return response.data;
    } catch (error) {
      console.log(error);
      this.handleError(error);
    }
  }

  async login(data: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const url = `${this.authServiceUrl}/auth/login`;

      const response = await firstValueFrom(
        this.httpService.post<AuthResponse>(url, data, { timeout: 5000 }),
      );

      return response.data;
    } catch (error) {
      console.log(error);
      console.error('[Gateway -> AuthService] request failed', {
        message: error?.message,
        code: error?.code,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      this.handleError(error);
    }
  }

  async getProfile(token: string): Promise<UserProfileResponse> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<UserProfileResponse>(
          `${this.authServiceUrl}/auth/profile`,
          {
            headers: { Authorization: token },
          },
        ),
      );

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }
  async healths() {
    try {
      const response = await firstValueFrom(
        this.httpService.get<UserProfileResponse>(
          `${this.authServiceUrl}/auth/health`,
        ),
      );

      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  ф;

  private handleError(error: unknown): never {
    const err = error as {
      response?: { data: string | object; status: number };
    };
    if (err.response) {
      throw new HttpException(err.response.data, err.response.status);
    }
    throw new HttpException('Something went wrong', 503);
  }
}
