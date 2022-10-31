import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    const res = await axios.post<{ token: string }>(
      "http://localhost:3000/api/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true
      }
      );
    console.log(res.data)
    // localStorage.setItem("token", res.data.token); // vulnerabilidad localstore acces by anywhere
    // console.log(res.data.token);
  };

  return (
    <div>
        <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
