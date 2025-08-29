export interface LoginRespons {
      message: string;
  token: string;
  user: {
    name: string;
    email: string;
    role: string;
  };
}


