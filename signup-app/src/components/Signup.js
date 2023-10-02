// src/components/Signup.js
import React, { useState } from 'react';

const Signup = ({setRoute}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
      roles: [role],
    };

    try {
      const response = await fetch('http://localhost:4000/user/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 201) {
        setMessage('User created successfully.');
        setRoute('/login');
        // Redirect to the login page or perform any desired action
      } else if (response.status === 400) {
        setMessage('User with this email already exists.');
      } else {
        setMessage('An error occurred during signup.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="signup">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Signup</button>
        
      </form>
      <button onClick={()=>setRoute('/login')}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
