import React, { useEffect } from 'react'
import axios from 'axios';
import UserCard from '../UserCard/UserCard';
import { API_URL } from '../../App';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home() {
    const [users, setUsers] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate();

    const getToken = async () => {
        try {
            //const response = await axios.get(`${API_URL}/token`, { withCredentials: true });
            //document.cookie = `xpress-a-token=${response.data.accessToken}; expires: ${new Date(Date.now() + 900000)}; httpOnly: true; SameSite=None; Secure;`;
            const response = await axios.get(`${API_URL}/token`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('refresh-token')}`
                }
            });
            sessionStorage.setItem('access-token', response.data.accessToken);
            setIsLoggedIn(true);
        } catch (error) {
            navigate('/login');
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/users`, {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('access-token')}`
                    }
                })
                setUsers(response?.data)
                setIsLoggedIn(true)
            } catch (error) {
                if (error?.response?.status === 403) {
                    await getToken()
                }
            }
        }
        getUsers()
    }, [isLoggedIn])

    const logout = () => {
        sessionStorage.removeItem('access-token')
        sessionStorage.removeItem('refresh-token')
        setIsLoggedIn(false)
    }

    return (
        <>
            {isLoggedIn && <Button variant="contained" onClick={logout}>Log out</Button>}
            <div className='users-container'>
                {users.map(user => <UserCard name={user.name} email={user.email} key={user.id} />)}
            </div>
        </>
    )
}

export default Home