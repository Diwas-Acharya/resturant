import { useState } from "react";
import { Link } from "react-router-dom";
import { configurl } from "../config/serverUrl";

export default () => {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const submit = async(e)=> {
        e.preventDefault();
        if(username == "" || password == ""){
            alert("username and password are required");
            return
        }
        let response = await fetch(configurl + "/admin/signup" , {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({username , password})
        });
        let res = await response.json();

        if(!res.succes){
            alert(res.msg)
            return
        }

        alert("signup success, please login")
    }
    return (
        <>
        <h1>Signup </h1>
        <form>
        <label>User name : </label>
            <input name='username' type = "text" value={username} onChange = {e => setUsername(e.target.value)}/><br />

            <label>password : </label>
            <input name='password' type = "password" value={password} onChange = {e => setPassword(e.target.value)}/><br />

            <button type = "submit" onClick={e => submit(e)}> signup </button>
        </form>
        <br />
        <Link to='/'><button> login </button></Link>
        <Link to='/sign-up'><button> signup </button></Link>
        </>
    )
}