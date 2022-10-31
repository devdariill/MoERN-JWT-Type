import { Request,Response } from "express";

export const login = (req: Request, res: Response) => {
    res.send("Login");
}
export const register = (req: Request, res: Response) => {
    console.log(req.body);
    res.send("Register");
};