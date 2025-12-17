export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  avatar: string | null;
}

export interface AuthResponse {
  access: string;
  refresh: string;
}
