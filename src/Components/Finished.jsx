import React from "react";

const Finished = (props) => {
  return (
      <div className="login-container">
        <h1 className="welcome-message">Голосование завершено</h1>
        <br/>
        <h1 className="welcome-message">Результаты голосования</h1>
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
  );
};

export default Finished;
