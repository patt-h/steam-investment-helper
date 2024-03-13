import React, { useState } from 'react';
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

      const handleInputChange = (event, rowIndex, fieldName) => {
        const { value } = event.target;
        const updatedRows = [...rows];
        updatedRows[rowIndex] = {
          ...updatedRows[rowIndex],
          [fieldName]: value
        };
        setRows(updatedRows);
      };

      const handleSubmit = async () => {
        const formData = rows.map(row => ({
          name: row.name,
          marketHashName: decodeURIComponent(row.link.split('/').pop().replace(/%20/g, ' ').replace(/%7C/g, '|')),
          boughtPrice: row.boughtPrice,
          quantity: row.quantity
        }));

        try {
          const response = await fetch('http://localhost:8080/api/addItem', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });

            if (response.ok) {
                window.location.reload();
            } 
            else {
                console.error('Error while sending data:', response.statusText);
            }
        } 
        catch (error) {
          console.error('Error while sending data:', error);
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
                                <td><input type="text" placeholder="iBUYPOWER Katowice 2014" value={row.name} onChange={(e) => handleInputChange(e, index, 'name')}></input></td>
                                <td><input type="number" placeholder="0.50zł" value={row.boughtPrice} onChange={(e) => handleInputChange(e, index, 'boughtPrice')}></input></td>
                                <td><input type="number" placeholder="10" value={row.quantity} onChange={(e) => handleInputChange(e, index, 'quantity')}></input></td>
                                <td><input type="text" placeholder="https://steamcommunity.com/market/listings/730/" value={row.link} onChange={(e) => handleInputChange(e, index, 'link')}></input></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="add-row" title="Add new row" id="addRow" onClick={addRow}>Add new row</button>
                    <button className="delete-row" title="Delete selected row" id="deleteRow" onClick={deleteRow}>Delete selected rows</button>
                    <div className="button-container">
                    <button className="submit-button" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItem;