import "express-session";

declare module "express-session" {
  interface SessionData {
    ID: number;
    Role_ID: number;
    username: string;
  }
}
