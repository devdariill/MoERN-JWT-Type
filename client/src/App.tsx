import React, { useState } from 'react'
import axios from "axios";

function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
    const res = await axios.post("http://localhost:3000/api/auth/register", {
      email,
      password,
    });
    console.log(res);
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <input type="email" onChange={(e)=> setEmail(e.target.value)}/>
        <input type="password" onChange={(e)=> setPassword(e.target.value)}/>
        <button>Register</button>
      </form>
    </div>
  );
}

export default App