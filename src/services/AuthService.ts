import { http } from "./axios";
import { BaseService } from "./BaseService";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    email: string;
  };
}
export class AuthService extends BaseService {
  constructor() {
    super(http);
  }

  async login(payload: LoginRequest): Promise<LoginResponse> {
    return this.post<LoginResponse>("/auth/login", payload);
  }
}
