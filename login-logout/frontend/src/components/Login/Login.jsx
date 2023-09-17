import { useRef, useState } from "react";
import "./Login.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from '../../App';

const Login = () => {
    const loginRef = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginRef.current.elements
        const userObj = {
            email: email.value,
            password: password.value
        }
        try {
            const response = await axios.post(`${API_URL}/login`, userObj, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            // document.cookie = `xpress-a-token=${response.data.accessToken}; expires: ${new Date(Date.now() + 900000)}; httpOnly: true; SameSite=None; Secure;`
            // document.cookie = `xpress-r-token=${response.data.refreshToken}; expires: ${new Date(Date.now() + 3600000)}; httpOnly: true; SameSite=None; Secure;`
            sessionStorage.setItem('access-token', response.data.accessToken);
            sessionStorage.setItem('refresh-token', response.data.refreshToken);
            navigate('/')
        } catch (error) {
            console.log("error in login")
        }
    }

    return <>
        <form ref={loginRef} onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="row">
                <label htmlFor="email" className="label">Email</label>
                <TextField id="email" required name="email" label="jdoe@gmail.com" variant="outlined" />
            </div>
            <div className="row">
                <label htmlFor="password" className="label">Password</label>
                <TextField id="password" required name="password" type="password" label="********" variant="outlined" />
            </div>
            <div className="btn-row">
                <Button type="submit" variant="contained">Log in</Button>
            </div>
            <div className="btn-row">
                <p>Don't have an account? Signup <Link to="/signup">here</Link></p>
            </div>
        </form>
    </>;
}

export default Login;
