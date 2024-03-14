import React, { useState, useEffect } from 'react';
import './itemhistory.css'

const ItemHistory = ({open, onClose, itemMarketHashName, itemId, data}) => {
    const [dataHistory, setDataHistory] = useState([]);

    useEffect(() => {
        if (open) {
            fetchHistory();
        }
    }, [open]);


    const fetchHistory = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/history/${itemId}`);
            const jsonData = await response.json();
            setDataHistory(jsonData);
        }
        catch (error) {
            console.error("Error fetching data: ", error);
            setDataHistory([]);
        }
    };


    if (!open) {
        return null;
    }

    return (
        <div className="overlay">
        <div className="history-modal-container">
            <div className="history-modal-content">
                <h1 className="history-header">Price history</h1>
                <h2 className="item-header">{itemMarketHashName}</h2>
                <table className="history-table-container">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataHistory.map(item => (
                        <tr key={item.historyID}>
                            <td>{item.date}</td>
                            <td>{item.price}zł</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className="exit-button-container">
                    <button className="exit-button" onClick={onClose}>Exit</button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ItemHistory;