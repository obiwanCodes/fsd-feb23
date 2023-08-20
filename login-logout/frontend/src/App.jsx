import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5005/users");
      const response2 = await fetch("http://localhost:5005/users");
      const data = response2.json();
      console.log(response.data);
      console.log(data);
      setUsers(response.data);
    };
    getUsers();
  }, []);

  return <>{JSON.stringify(users, null, 2)}</>;
}

export default App;
