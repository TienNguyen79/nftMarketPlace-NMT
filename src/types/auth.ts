export type TRegister = { name?: string; email?: string; password?: string; user?: string };

export type TLogin = {
  email?: string;
  password?: string;
};

export type TLogout = {
  refreshToken: string;
};
