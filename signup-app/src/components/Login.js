// src/components/Login.js
import React, { useState } from 'react';

const Login = ({setRoute}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/user/v1/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.status === 201) {
        // Handle successful login (if needed)
        setMessage('Login successful.');
        
        const body=await response.json();
        localStorage.setItem('accessToken', body.access_token);
        // console.log();
        if (body.user_type === 'admin') {
            // console.log("hello");
            setRoute('/addfaq');
          }
          else{
            setRoute('/userdashboard');
          }
      } else {
        setMessage('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
