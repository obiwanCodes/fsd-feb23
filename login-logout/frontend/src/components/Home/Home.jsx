import React, { useEffect } from 'react'
import axios from 'axios';
import UserCard from '../UserCard/UserCard';
import { API_URL } from '../../App';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [users, setUsers] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const getToken = async () => {
        try {
            const response = await axios.get(`${API_URL}/token`, { withCredentials: true });
            document.cookie = `xpress-a-token=${response.data.accessToken}; expires: ${new Date(Date.now() + 900000)}; httpOnly: true`;
            setToken(response.data.accessToken);
        } catch (error) {
            navigate('/login');
        }
    }

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/users`, { withCredentials: true })
                setUsers(response?.data)
            } catch (error) {
                if (error?.response?.status === 403) {
                    await getToken()
                }
            }
        }
        getUsers()
    }, [token])

    return (
        <>
            <div className='users-container'>
                {users.map(user => <UserCard name={user.name} email={user.email} key={user.id} />)}
            </div>
        </>
    )
}

export default Home