import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { configurl } from "../config/serverUrl";

export default () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        let userData = localStorage.getItem("userData");
      
        if (userData) {
            return navigate("/dashboad").then(()=> {
                window.location.reload();
            });
        }
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (username == "" || password == "") {
            alert("username and password are required");
            return
        }
        let response = await fetch(configurl + "/admin/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });
        let res = await response.json();

        if (!res.success) {
            alert(res.msg)
            return
        }
        localStorage.setItem("userData", JSON.stringify(res.data))
        navigate("/dashboard");
        alert("login success")
    }


    return (
        <>
            <h1>Login </h1>
            <form method="post">
                <label>User name : </label>
                <input name='username' type="text" value={username} onChange={e => setUsername(e.target.value)} /><br />

                <label>password : </label>
                <input name='password' type="password" value={password} onChange={e => setPassword(e.target.value)} /><br />

                <button type="submit" onClick={e => submit(e)}> Login </button>
            </form><br></br>
            <Link to='/'><button> login </button></Link>
            <Link to='/sign-up'><button> signup </button></Link>
        </>
    )
}