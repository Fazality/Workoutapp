import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    console.log("AUTHENTICATION");
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({message: "Not authenticated"});
    }
}