import React from "react";

const Login = (props) => {
    return (
        <div className="login-container">
            <h1 className="welcome-message">Unauthorized access. Please log in with the allowed account.</h1>
            <a className="login-button" href="/">
              На главную страницу</a>
        </div>
    )
}

export default Login;
