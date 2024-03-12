import React, { useEffect, useState } from 'react';
import './additem.css';

const AddItem = ({open, onClose}) => {
    const [rows, setRows] = useState([
        { id: 1, name: '', boughtPrice: '', quantity: '', link: '', checked: false }
      ]);
    
      const addRow = () => {
        setRows(prevRows => [
          ...prevRows,
          { id: prevRows.length + 1, name: '', boughtPrice: '', quantity: '', link: '', checked: false }
        ]);
      };

      const deleteRow = () => {
        const updatedRows = rows.filter((row, index) => index === 0 || !row.checked);
        setRows(updatedRows);
      };
    
      const handleCheckAll = (event) => {
        const checked = event.target.checked;
        const updatedRows = rows.map(row => ({ ...row, checked }));
        setRows(updatedRows);
      };
    
      const handleCheckSingle = (index) => {
        const updatedRows = [...rows];
        updatedRows[index].checked = !updatedRows[index].checked;
        setRows(updatedRows);

        const allChecked = updatedRows.every(row => row.checked);
        const anyUnchecked = updatedRows.some(row => !row.checked);

        if (allChecked) {
            document.getElementById("checkAll").checked = true;
        } 
        else if (anyUnchecked) {
            document.getElementById("checkAll").checked = false;
        }
      };

    if (!open) {
        return null;
    }
    return (
        <div className="overlay">
            <div className="modal-container">
                <p onClick={onClose} className="close-modal">X</p>
                <div className="modal-content">
                    <h1>Add items to track</h1>
                    <table id="add-table" className="add-table-container">
                        <thead>
                            <tr>
                                <th><input id="checkAll" type="checkbox" onChange={handleCheckAll} title="Select all rows"></input></th>
                                <th>Name</th>
                                <th>Bought price</th>
                                <th>Quantity</th>
                                <th>Link to Steam Market</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                            <tr key={row.id}>
                                <td><input type="checkbox" checked={row.checked} onChange={() => handleCheckSingle(index)}></input></td>
                                <td><input type="text" placeholder="iBUYPOWER Katowice 2014"></input></td>
                                <td><input type="number" placeholder="0.50zł"></input></td>
                                <td><input type="number" placeholder="10"></input></td>
                                <td><input type="text" placeholder="https://steamcommunity.com/market/listings/730/"></input></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="add-row" title="Add new row" id="addRow" onClick={addRow}>Add</button>
                    <button className="delete-row" title="Delete selected row" id="deleteRow" onClick={deleteRow}>Delete</button>
                    <div className="button-container">
                    <button className="submit-button">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem;