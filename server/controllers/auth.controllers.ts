import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
// import bcrypt from "argon2"; // mas seguro que bcrypt
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const newUser = new User({
    email,
    password: await bcrypt.hashSync(password, 10), //10-12 encriptacion normal
  });
  const savedUser = await newUser.save();
  //{}: time
  jwt.sign({ id: savedUser.id }, JWT_SECRET, {}, (err, token) => {
    if (err) throw err;
    // res.setHeader("x-auth-token", token as string); // v0.1envio el token como cookie  sin instalaciones
    // res.setHeader("Set-Cookie",`token=${token}; path=/  `); // v0.2
    // res.setHeader("Set-Cookie",`token=${token}; path=/; httpOnly  `); // v1 not access from client side
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // axpires: new Date(Date.now() + 900000), //temporizador
      // maxAge: 1000*60*60*24*7, // tiempo limite de la cookie // ERROR necesita func para refrescar
    }); // v1.1 con autocompletado
    console.log(savedUser)
    res.json({ token, email: savedUser.email, message: "create successfully" });
  });
};

//check if user exist
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email: req.body.email });
  if (!userFound) return res.status(400).json({ message: "User not found" });
  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return res.status(400).json({ message: "Invalid password" });
  jwt.sign({ id: userFound.id }, JWT_SECRET, {}, (err, token) => {
    if(err) throw err;
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ token, email: userFound.email, message: "login successfully" });
  });  
  //TODO negar entrada a tokens viejos etc...
};
// jwt.io
