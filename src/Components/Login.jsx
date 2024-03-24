import React from "react";

const Login = (props) => {
    return (
        <div className="login-container">
            <h1 className="welcome-message">Добро пожаловать в приложение для децентрализованного голосования</h1>
            <button className="login-button" onClick = {props.connectWallet}>Авторизоваться Metamask</button>
        </div>
    )
}

export default Login;
