import React from "react";

const Connected = (props) => {
    return (
        <div className="connected-container">
            <h1 className="connected-header">Подключен к Metamask</h1>
            <p className="connected-account">Metamask Account: {props.account}</p>
            <p className="connected-account">Оставшееся время голосования: {props.remainingTime}</p>
            { props.showButton ? (
                <p className="connected-account">Вы уже проголосовали</p>
            ) : (
                <div>
                    <input type="number" placeholder="Выбрать № кандидата" value={props.number} onChange={props.handleNumberChange}></input>
            
                    <button className="login-button" onClick={props.voteFunction}>Голосовать</button>

                </div>
            )}
            
            <table id="myTable" className="candidates-table">
                <thead>
                <tr>
                    <th>№</th>
                    <th style={{textAlign:"center"}}>Имя кандидата</th>
                    <th style={{textAlign:"center"}}>Голосов за кандидатов</th>
                </tr>
                </thead>
                <tbody >
                {props.candidates.map((candidate, index) => (
                    <tr key={index}>
                    <td>{(candidate.index + 1)}</td>
                    <td style={{textAlign:"center"}}>{candidate.name}</td>
                    <td style={{textAlign:"center"}}>{candidate.voteCount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            
        </div>
    )
}

export default Connected;
