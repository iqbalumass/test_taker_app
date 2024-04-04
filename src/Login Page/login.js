import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); 
    
    const navigate = useNavigate(); 

    const handleLogin = () => {
        if (username === 'Student' && password === 'umassd') {
            // Perform login logic here 
            console.log('Login successful');
            setSuccessMessage('Login successful');
            setTimeout(() => {
                navigate('/subjectList'); 
            }, 2000); // Redirect after 2 seconds
        } else {
            setErrorMessage('Wrong credentials. Please try again.');
        }
    };


    return (
        <div>
            <h1>Login Page</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button onClick={handleLogin}>Login</button>
            <br />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <div style={{ color: 'green', fontSize: '18px', marginTop: '10px' }}>{successMessage}</div>}
            <button>Forgot Password</button>
        </div>
    );
};

export default Login;
