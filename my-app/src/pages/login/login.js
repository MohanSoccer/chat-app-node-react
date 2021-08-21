import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'

const Login = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    return (
        <div className="container w-25 mt-4">
            <div className="logo">
                <p>Logo</p>
            </div>
            <h1 className="login-h1">Login to your Account</h1>
            <form method="post">
                <div className="form-group">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text" placeholder="Username" required className="form-control form-input" />
                </div>
                <div className="form-group">
                    <input
                        onChange={(e) => setRoom(e.target.value)}
                        type="text" placeholder="Room" required className="form-control form-input" />
                </div>
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null}
                    to={`/chat?name=${name}&room=${room}`}>
                    <input type="submit" className="form-submit" value="Log In" />
                </Link>
            </form>
        </div>
    )
}

export default Login;