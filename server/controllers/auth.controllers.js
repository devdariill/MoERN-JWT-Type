import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
// import bcrypt from "argon2"; // mas seguro que bcrypt
// import bcrypt from "bcryptjs";
import { pool } from "../db.js";

//check if user exist
export const login = async (req, res) => {
  const { nitter, tokusu } = req.body;
  const [result] = await pool.query(
    "SELECT nomusu, nitter, nivusu, estusu, codcos, cosfij, codbod, bodfij, bodtra, agefij, empcod FROM usuarios WHERE nitter = ? AND tokusu = ?",
    [nitter, tokusu]
  );
  if (result.length === 0)
      return res.status(404).json({ DBmessage: "User not found" });
  // const userFound = await User.findOne({ email: req.body.email });
  // if (!userFound) return res.status(400).json({ message: "User not found" });
  // const passwordMatch = await bcrypt.compare(password, userFound.password); // TODO : DOIT
  // if (!passwordMatch)
  //   return res.status(400).json({ message: "Invalid password" });
  jwt.sign({ id: nitter }, JWT_SECRET, {}, (err, token) => {
    if (err) res.status(404).json({ DBmessage: "Error Token" });
    if (err) throw err;
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.json({ token, nitter: nitter, message: "login successfully" });
  });
  //TODO negar entrada a tokens viejos etc...
};
// jwt.io

// export const register = async (req, res) => {
//   const { email, password } = req.body;

//   const newUser = new User({
//     email,
//     password: await bcrypt.hashSync(password, 10), //10-12 encriptacion normal
//   });
//   const savedUser = await newUser.save();
//   //{}: time
//   jwt.sign({ id: savedUser.id }, JWT_SECRET, {}, (err, token) => {
//     if (err) throw err;
//     // res.setHeader("x-auth-token", token as string); // v0.1envio el token como cookie  sin instalaciones
//     // res.setHeader("Set-Cookie",`token=${token}; path=/  `); // v0.2
//     // res.setHeader("Set-Cookie",`token=${token}; path=/; httpOnly  `); // v1 not access from client side
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       // axpires: new Date(Date.now() + 900000), //temporizador
//       // maxAge: 1000*60*60*24*7, // tiempo limite de la cookie // ERROR necesita func para refrescar
//     }); // v1.1 con autocompletado
//     console.log(savedUser)
//     res.json({ token, email: savedUser.email, message: "create successfully" });
//   });
// };
