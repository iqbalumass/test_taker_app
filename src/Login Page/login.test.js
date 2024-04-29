import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './login'; // Ensure this imports your component where handleLogin is used

describe('Login Functionality', () => {
    test('successful login redirects to subject list', async () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        // Get input elements and button
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: /login/i });

        // Simulate user typing into the input fields
        fireEvent.change(usernameInput, { target: { value: 'Student' } });
        fireEvent.change(passwordInput, { target: { value: 'umassd' } });

        // Simulate user clicking the login button
        fireEvent.click(loginButton);

        // Wait for expected outcome
        await waitFor(() => {
            expect(screen.getByText('Login successful')).toBeInTheDocument();
            // Additional checks for navigation could be here if needed
        });
    });

    test('failed login shows an error message', async () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        // Get input elements and button
        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByRole('button', { name: /login/i });

        // Simulate user typing into the input fields
        fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });

        // Simulate user clicking the login button
        fireEvent.click(loginButton);

        // Expect error message to show up
        await waitFor(() => {
            expect(screen.getByText('Wrong credentials. Please try again.')).toBeInTheDocument();
        });
    });
});
