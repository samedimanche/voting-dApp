import React from "react";

const ListVotes = (props) => {
  return (
    <div className="connected-container">
            <h1 className="connected-header">Добавить кандидата</h1>
            <p className="connected-account">Оставшееся время действия умного контракта: {props.remainingTime}</p>
        <div>
        <input
          type="text" // Change input type to text for candidate name
          placeholder="Имя нового кандидата"
          value={props.newCandidateName}
          onChange={(e) => props.setNewCandidateName(e.target.value)}
        />
        <br/>
        <button className="login-button" onClick={props.addCandidate}>
        Добавить
        </button>
                </div>

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

export default ListVotes;
