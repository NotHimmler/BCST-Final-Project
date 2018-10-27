import React from 'react';
const moment = require('moment');

export function generateCheckupHistoryRows(data) {
    let rows = data.map(item => {
        return (<div className="checkup-box" style={{border: "1px solid #73879C", borderRadius: "5px", margin: "5px 0"}}>
            <div className="note-subsection" style={{backgroundColor: "#73879C", color: "white", padding: "5px"}}><h4 style={{display: "inline-block"}}>{moment(Number(item.date)).format("dddd, MMM Do YYYY")}</h4> by <h5 style={{display: "inline-block"}}>{item.user}</h5><br/></div>
            <div className="note-subsection" style={{padding: "5px"}}>{item.note}</div>
            </div>)
    })
    return rows;
}