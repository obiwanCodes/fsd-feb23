import { useRef, useState } from "react";
import "./Signup.css";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { emailRegex, passwordRegex } from "../../config.js"
import { useNavigate, Link } from "react-router-dom";

import { API_URL } from '../../App';

const Signup = () => {
    const signupRef = useRef(null);
    const navigate = useNavigate()
    const [isFormError, setIsFormError] = useState({
        email: false,
        password: false
    });

    const validateEmail = email => emailRegex.test(email)
    const validatePassword = password => passwordRegex.test(password)

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, password } = signupRef.current.elements
        const userObj = {
            name: name.value,
            email: email.value,
            password: password.value
        }
        if (!validateEmail(userObj.email)) {
            setIsFormError({ ...isFormError, email: true })
            return;
        }
        if (!validatePassword(userObj.password)) {
            setIsFormError({ ...isFormError, password: true })
            return;
        }
        try {
            axios.post(`${API_URL}/signup`, userObj, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            navigate('/login')
        } catch (error) {
            console.log("error in signup")
        }
    }

    return <>
        <form ref={signupRef} onSubmit={handleSubmit}>
            <h1>Sign up</h1>
            <div className="row">
                <label htmlFor="name" className="label">Name</label>
                <TextField id="name" required name="name" label="john doe" variant="outlined" />
            </div>
            <div className="row">
                <label htmlFor="email" className="label">Email</label>
                <TextField id="email" required name="email" label="jdoe@gmail.com" variant="outlined" />
            </div>
            {isFormError.email && <div className="row error">Email doesn't look right!</div>}
            <div className="row">
                <label htmlFor="password" className="label">Password</label>
                <TextField id="password" required name="password" type="password" label="********" variant="outlined" />
            </div>
            {isFormError.password && <div className="row error">Password must be between 8-16 letters and have at least 1 lower, 1 upper and 1 special character.</div>}
            <div className="btn-row">
                <Button type="submit" variant="contained">Sign up</Button>
            </div>
            <div className="btn-row">
                <p>Already signed up? Login <Link to="/login">here</Link></p>
            </div>
        </form>
    </>;
}

export default Signup;
