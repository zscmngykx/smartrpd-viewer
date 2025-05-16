// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    if (!username || !password) {
      setError('Username and password cannot be empty!');
      return;
    }

    try {
      const requestBody = [
        { machine_id: '3a0df9c37b50873c63cebecd7bed73152a5ef616' },
        { username, password },
      ];

      const response = await fetch(
        'https://live.api.smartrpdai.com/api/smartrpd/user/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      if (response.ok && data.successful) {
        const userInfo = {
          uuid: data.uuid,
          email: data.email,
          isAdmin: data.isAdmin,
        };
        localStorage.setItem('loggedInUser', JSON.stringify(userInfo));
        navigate('/cases');
      } else {
        setError('Login failed. Please check your username and password.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="login_face">
      <div className="login_box">
        <div className="img_box" />
        <div className="login_msg">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Log In</button>
          <p id="error-message">{error}</p>
        </div>
      </div>
    </div>
  );
}
