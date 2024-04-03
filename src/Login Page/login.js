import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        if (username === 'Student' && password === 'umassd') {
            // Perform login logic here
            console.log('Login successful');
            const history = useHistory();

            // ...

            const handleLoginSuccess = () => {
                if (username === 'Student' && password === 'umassd') {
                    // Perform login logic here
                    console.log('Login successful');
                    const history = useHistory();
                    history.push('/loginsuccess');
                } else {
                    setErrorMessage('Wrong credentials. Please try again.');
                }
            };

            // ...
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
            <p>{errorMessage}</p>
            <button>Forgot Password</button>
        </div>
    );
};

export default Login;