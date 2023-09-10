import React, { useEffect } from 'react'
const API_URL = import.meta.env.VITE_API_URL;

function Home() {
    useEffect(() => {
        const getUsers = async () => {
            const response = await axios.get(`${API_URL}/users`)
            console.log(response)
        }
        getUsers()
    }, [])
    return (
        <div>Home</div>
    )
}

export default Home