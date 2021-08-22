import React, { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
   const [name, setName] = useState("");
   const [room, setRoom] = useState("");
   return (
      <div className="container ">
         <div className="d-flex justify-content-center">
            <div className="card mt-5" style={{ width: "500px" }}>
               <div className="card-header">
                  <div className="logo">
                     <p>Logo</p>
                  </div>
               </div>
               <div className="card-body">
                  <h1 className="login-h1">Login to your room</h1>
                  <form method="post">
                     <div className="form-group">
                        <input
                           onChange={(e) => setName(e.target.value)}
                           type="text"
                           placeholder="Username"
                           required
                           className="form-control form-input"
                        />
                     </div>
                     <div className="form-group">
                        <input
                           onChange={(e) => setRoom(e.target.value)}
                           type="text"
                           placeholder="Room"
                           required
                           className="form-control form-input"
                        />
                     </div>
                  </form>
               </div>
               <div className="card-footer">
                  <Link
                     onClick={(e) =>
                        !name || !room ? e.preventDefault() : null
                     }
                     to={`/chat?name=${name}&room=${room}`}
                  >
                     <input
                        type="submit"
                        className="form-submit"
                        value="Log In"
                     />
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
