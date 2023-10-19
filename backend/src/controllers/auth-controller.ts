import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/user-service';

export const loginUserController =
  (table: string) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = UserService.loginUser(table, req.body);
      req.session.ID = user.ID;
      req.session.Role_ID = user.Role_ID;
      req.session.username = user.username;

      res.json({
        "status": 200,
        "message": "Login successful", 
        "role": user.Role_ID
      });

    } catch (error) { next(error); }
  };

  export const registerUserController =
    (table: string) => (req: Request, res: Response, next: NextFunction) => {
        try {
            const entity = UserService.registerUser(table, req.body);
            res.json(entity);
        }
        catch (error) { next(error); }
    };

    export const checkUserController =
    (table: string) => (req: Request, res: Response, next: NextFunction) => {
      if (req.session && req.session.ID) {
        res.json({
          authenticated: true,
          ID: req.session.ID,
          Role_ID: req.session.Role_ID,
          username: req.session.username
        });
      } else { res.json({ authenticated: false }); }
    };


export const logoutUserController =
  (table: string) => (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.clearCookie('sid');
      res.json({ authenticated: false });
    });
  };
