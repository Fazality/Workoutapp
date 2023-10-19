import "express-session";

declare module "express-session" {
  interface SessionData {
    ID: number;
    RoleID: number;
    username: string;
  }
}
